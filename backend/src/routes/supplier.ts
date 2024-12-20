import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';
import { AppError } from '../types/error';
import { AuthRequest } from '../types/express';


const router = Router();
const prisma = new PrismaClient();

// 获取所有供应商
router.get('/', auth, async (_req: AuthRequest, res, next) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: {
        procurementOrders: {
          include: {
            items: true,
            creator: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
    res.json(suppliers);
  } catch (error) {
    next(error);
  }
});

// 创建新供应商
router.post('/', auth, async (req: AuthRequest, res, next) => {
  try {
    const { name, contact, phone, email, address } = req.body;

    const supplier = await prisma.supplier.create({
      data: {
        name,
        contact,
        phone,
        email,
        address,
      },
      include: {
        procurementOrders: true,
      },
    });

    res.status(201).json(supplier);
  } catch (error) {
    next(error);
  }
});

// 获取特定供应商
router.get('/:id', auth, async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;

    const supplier = await prisma.supplier.findUnique({
      where: { id },
      include: {
        procurementOrders: {
          include: {
            items: true,
            creator: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!supplier) {
      throw new AppError(404, 'fail', 'Supplier not found');
    }

    res.json(supplier);
  } catch (error) {
    next(error);
  }
});

// 更新供应商
router.put('/:id', auth, async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;
    const { name, contact, phone, email, address } = req.body;

    const supplier = await prisma.supplier.update({
      where: { id },
      data: {
        name,
        contact,
        phone,
        email,
        address,
      },
      include: {
        procurementOrders: true,
      },
    });

    res.json(supplier);
  } catch (error) {
    next(error);
  }
});

// 删除供应商
router.delete('/:id', auth, async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;

    // 检查供应商是否有关联的采购订单
    const supplierWithOrders = await prisma.supplier.findUnique({
      where: { id },
      include: {
        procurementOrders: true,
      },
    });

    if (!supplierWithOrders) {
      throw new AppError(404, 'fail', 'Supplier not found');
    }

    if (supplierWithOrders.procurementOrders.length > 0) {
      throw new AppError(400, 'fail', 'Cannot delete supplier with existing procurement orders');
    }

    await prisma.supplier.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// 获取供应商统计
router.get('/stats/overview', auth, async (_req: AuthRequest, res, next) => {
  try {
    const totalSuppliers = await prisma.supplier.count();
    const activeSuppliers = await prisma.supplier.count({
      where: {
        procurementOrders: {
          some: {
            status: 'IN_PROGRESS',
          },
        },
      },
    });

    const totalOrders = await prisma.procurementOrder.count();
    const totalAmount = await prisma.procurementOrder.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

    res.json({
      totalSuppliers,
      activeSuppliers,
      totalOrders,
      totalAmount: totalAmount._sum.totalAmount || 0,
    });
  } catch (error) {
    next(error);
  }
});

export default router; 