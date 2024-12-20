import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { AppError } from '../types/error';
import { AuthRequest } from '../types/express';
import {
  createDrainageSchema,
  updateDrainageSchema,
  getDrainageSchema,
  deleteDrainageSchema,
} from '../schemas/drainage.schema';

const router = Router();
const prisma = new PrismaClient();

// 获取所有排水记录
router.get('/', auth, async (_req: AuthRequest, res, next) => {
  try {
    const records = await prisma.drainageRecord.findMany({
      include: {
        location: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(records);
  } catch (error) {
    next(error);
  }
});

// 创建新排水记录
router.post('/', auth, validate(createDrainageSchema), async (req: AuthRequest, res, next) => {
  try {
    const { locationId, amount, description, date } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError(401, 'fail', 'User not authenticated');
    }

    const record = await prisma.drainageRecord.create({
      data: {
        location: {
          connect: {
            id: locationId,
          },
        },
        amount,
        description,
        date: new Date(date),
        creator: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        location: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
});

// 获取特定排水记录
router.get('/:id', auth, validate(getDrainageSchema), async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;

    const record = await prisma.drainageRecord.findUnique({
      where: { id },
      include: {
        location: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!record) {
      throw new AppError(404, 'fail', 'Drainage record not found');
    }

    res.json(record);
  } catch (error) {
    next(error);
  }
});

// 更新排水记录
router.put('/:id', auth, validate(updateDrainageSchema), async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;
    const { locationId, amount, description, date } = req.body;

    const record = await prisma.drainageRecord.update({
      where: { id },
      data: {
        location: locationId ? {
          connect: {
            id: locationId,
          },
        } : undefined,
        amount,
        description,
        date: date ? new Date(date) : undefined,
      },
      include: {
        location: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(record);
  } catch (error) {
    next(error);
  }
});

// 删除排水记录
router.delete('/:id', auth, validate(deleteDrainageSchema), async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;

    await prisma.drainageRecord.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// 获取排水统计
router.get('/stats/overview', auth, async (_req: AuthRequest, res, next) => {
  try {
    const totalRecords = await prisma.drainageRecord.count();

    const totalAmount = await prisma.drainageRecord.aggregate({
      _sum: {
        amount: true,
      },
    });

    const monthlyStats = await prisma.drainageRecord.groupBy({
      by: ['locationId'],
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
      where: {
        date: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    });

    res.json({
      totalRecords,
      totalAmount: totalAmount._sum.amount || 0,
      monthlyStats,
    });
  } catch (error) {
    next(error);
  }
});

export default router; 