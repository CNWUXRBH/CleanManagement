import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';
import { AppError } from '../types/error';
import { AuthRequest } from '../types/express';


const router = Router();
const prisma = new PrismaClient();

// 获取所有采购订单
router.get('/', auth, async (_req: AuthRequest, res, next) => {
  try {
    const orders = await prisma.procurementOrder.findMany({
      include: {
        supplier: true,
        items: {
          include: {
            item: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// 创建新采购订单
router.post('/', auth, async (req: AuthRequest, res, next) => {
  try {
    const { supplierId, items } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError(401, 'fail', 'User not authenticated');
    }

    // 计算总金额
    const totalAmount = items.reduce(
      (sum: number, item: { quantity: number; unitPrice: number }) =>
        sum + item.quantity * item.unitPrice,
      0
    );

    const order = await prisma.procurementOrder.create({
      data: {
        supplier: {
          connect: {
            id: supplierId,
          },
        },
        creator: {
          connect: {
            id: userId,
          },
        },
        totalAmount,
        items: {
          create: items.map((item: {
            itemId: string;
            quantity: number;
            unitPrice: number;
          }) => ({
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.quantity * item.unitPrice,
            item: {
              connect: {
                id: item.itemId,
              },
            },
          })),
        },
      },
      include: {
        supplier: true,
        items: {
          include: {
            item: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

// 获取特定采购订单
router.get('/:id', auth, async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;

    const order = await prisma.procurementOrder.findUnique({
      where: { id },
      include: {
        supplier: true,
        items: {
          include: {
            item: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!order) {
      throw new AppError(404, 'fail', 'Procurement order not found');
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
});

// 更新采购订单状态
router.put('/:id/status', auth, async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // 检查订单是否存在
    const existingOrder = await prisma.procurementOrder.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!existingOrder) {
      throw new AppError(404, 'fail', 'Procurement order not found');
    }

    // 如果订单状态变更为完成，更新库存
    if (status === 'COMPLETED' && existingOrder.status !== 'COMPLETED') {
      // 使用事务确保数据一致性
      await prisma.$transaction(async (tx: PrismaClient) => {
        // 更新订单状态
        const order = await tx.procurementOrder.update({
          where: { id },
          data: { status },
          include: {
            supplier: true,
            items: {
              include: {
                item: true,
              },
            },
            creator: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });

        // 更新每个采购项目对应的库存
        for (const item of order.items) {
          await tx.inventoryItem.update({
            where: { id: item.itemId },
            data: {
              quantity: {
                increment: item.quantity,
              },
            },
          });

          // 创建入库记录
          await tx.inventoryMovement.create({
            data: {
              type: 'IN',
              quantity: item.quantity,
              reason: `采购入库：订单 ${order.id}`,
              item: {
                connect: {
                  id: item.itemId,
                },
              },
              creator: {
                connect: {
                  id: order.creatorId,
                },
              },
            },
          });
        }

        res.json(order);
      });
    } else {
      // 如果不是完成状态，只更新订单状态
      const order = await prisma.procurementOrder.update({
        where: { id },
        data: { status },
        include: {
          supplier: true,
          items: {
            include: {
              item: true,
            },
          },
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      res.json(order);
    }
  } catch (error) {
    next(error);
  }
});

// 删除采购订单
router.delete('/:id', auth, async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;

    // 检查订单是否存在
    const order = await prisma.procurementOrder.findUnique({
      where: { id },
    });

    if (!order) {
      throw new AppError(404, 'fail', 'Procurement order not found');
    }

    // 只能删除待处理或已取消的订单
    if (order.status !== 'PENDING' && order.status !== 'CANCELLED') {
      throw new AppError(400, 'fail', 'Can only delete pending or cancelled orders');
    }

    // 使用事务确保数据一致性
    await prisma.$transaction(async (tx: PrismaClient) => {
      // 先删除订单项目
      await tx.procurementItem.deleteMany({
        where: {
          orderId: id,
        },
      });

      // 再删除订单
      await tx.procurementOrder.delete({
        where: { id },
      });
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// 获取���购统计
router.get('/stats/overview', auth, async (_req: AuthRequest, res, next) => {
  try {
    const totalOrders = await prisma.procurementOrder.count();
    const pendingOrders = await prisma.procurementOrder.count({
      where: {
        status: 'PENDING',
      },
    });
    const completedOrders = await prisma.procurementOrder.count({
      where: {
        status: 'COMPLETED',
      },
    });

    const totalAmount = await prisma.procurementOrder.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        status: 'COMPLETED',
      },
    });

    const monthlyStats = await prisma.procurementOrder.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
      _sum: {
        totalAmount: true,
      },
      where: {
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    });

    res.json({
      totalOrders,
      pendingOrders,
      completedOrders,
      totalAmount: totalAmount._sum.totalAmount || 0,
      monthlyStats,
    });
  } catch (error) {
    next(error);
  }
});

export default router; 