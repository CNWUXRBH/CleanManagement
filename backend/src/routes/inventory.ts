import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';
import { AppError } from '../types/error';
import { AuthRequest } from '../types/express';


const router = Router();
const prisma = new PrismaClient();

// 获取所有库存项
router.get('/', auth, async (_req: AuthRequest, res, next) => {
  try {
    const items = await prisma.inventoryItem.findMany({
      include: {
        movements: true,
        adjustments: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// 创建新的库存项
router.post('/', auth, async (req: AuthRequest, res, next) => {
  try {
    const { name, description, quantity, unit, category, location } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError(401, 'fail', 'User not authenticated');
    }

    const item = await prisma.inventoryItem.create({
      data: {
        name,
        description,
        quantity,
        unit,
        category,
        location,
        creator: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
});

// 获取特定库存项
router.get('/:id', auth, async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;

    const item = await prisma.inventoryItem.findUnique({
      where: { id },
      include: {
        movements: true,
        adjustments: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!item) {
      throw new AppError(404, 'fail', 'Inventory item not found');
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
});

// 更新库存项
router.put('/:id', auth, async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, quantity, unit, category, location } = req.body;

    const item = await prisma.inventoryItem.update({
      where: { id },
      data: {
        name,
        description,
        quantity,
        unit,
        category,
        location,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(item);
  } catch (error) {
    next(error);
  }
});

// 删除库存项
router.delete('/:id', auth, async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;

    await prisma.inventoryItem.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// 记录库存移动
router.post('/:id/movements', auth, async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;
    const { type, quantity, reason } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError(401, 'fail', 'User not authenticated');
    }

    const movement = await prisma.inventoryMovement.create({
      data: {
        type,
        quantity,
        reason,
        item: {
          connect: {
            id,
          },
        },
        creator: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // 更新库存数量
    await prisma.inventoryItem.update({
      where: { id },
      data: {
        quantity: {
          [type === 'IN' ? 'increment' : 'decrement']: quantity,
        },
      },
    });

    res.status(201).json(movement);
  } catch (error) {
    next(error);
  }
});

// 记录库存调整
router.post('/:id/adjustments', auth, async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;
    const { quantity, reason } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError(401, 'fail', 'User not authenticated');
    }

    const item = await prisma.inventoryItem.findUnique({
      where: { id },
    });

    if (!item) {
      throw new AppError(404, 'fail', 'Inventory item not found');
    }

    const adjustment = await prisma.inventoryAdjustment.create({
      data: {
        previousQuantity: item.quantity,
        newQuantity: quantity,
        reason,
        item: {
          connect: {
            id,
          },
        },
        creator: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // 更新库存数量
    await prisma.inventoryItem.update({
      where: { id },
      data: {
        quantity,
      },
    });

    res.status(201).json(adjustment);
  } catch (error) {
    next(error);
  }
});

// 获取库存统计
router.get('/stats/overview', auth, async (_req: AuthRequest, res, next) => {
  try {
    const totalItems = await prisma.inventoryItem.count();
    const lowStockItems = await prisma.inventoryItem.count({
      where: {
        quantity: {
          lte: 10, // 假设低于 10 的库存被认为是低库存
        },
      },
    });

    const totalValue = await prisma.inventoryItem.aggregate({
      _sum: {
        quantity: true,
      },
    });

    res.json({
      totalItems,
      lowStockItems,
      totalQuantity: totalValue._sum.quantity || 0,
    });
  } catch (error) {
    next(error);
  }
});

export default router; 