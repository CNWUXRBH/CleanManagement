import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { RequestHandler } from '../types/express';
import {
  createRequisitionSchema,
  updateRequisitionStatusSchema,
  getRequisitionSchema,
  deleteRequisitionSchema,
} from '../schemas/requisition.schema';

const router = express.Router();
const prisma = new PrismaClient();

// 获取所有申请单
const getAllRequisitions: RequestHandler = async (_req, res) => {
  try {
    const requisitions = await prisma.requisition.findMany({
      include: {
        department: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true,
          },
        },
        items: {
          include: {
            item: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(requisitions);
  } catch (error) {
    console.error('Error fetching requisitions:', error);
    res.status(500).json({ message: 'Error fetching requisitions' });
  }
};

// 创建新申请单
const createRequisition: RequestHandler = async (req, res) => {
  try {
    const { department, items } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    // 查找部门ID
    const departmentRecord = await prisma.department.findFirst({
      where: { name: department },
    });

    if (!departmentRecord) {
      res.status(400).json({ message: 'Department not found' });
      return;
    }

    // 验证所有商品是否存在并检查库存
    for (const item of items) {
      const inventoryItem = await prisma.inventoryItem.findUnique({
        where: { id: item.itemId },
      });
      if (!inventoryItem) {
        res.status(400).json({ message: `Item with ID ${item.itemId} not found` });
        return;
      }
      if (inventoryItem.quantity < item.quantity) {
        res.status(400).json({
          message: `Insufficient stock for item ${inventoryItem.name}. Available: ${inventoryItem.quantity}`,
        });
        return;
      }
    }

    // 使用事务创建申请单和申请项目
    const requisition = await prisma.$transaction(async (prismaClient: PrismaClient) => {
      // 创建申请单
      const req = await prismaClient.requisition.create({
        data: {
          department: {
            connect: {
              id: departmentRecord.id,
            },
          },
          creator: {
            connect: {
              id: userId,
            },
          },
          status: 'PENDING',
          items: {
            create: items.map((item: { itemId: string; quantity: number }) => ({
              quantity: item.quantity,
              item: {
                connect: {
                  id: item.itemId,
                },
              },
            })),
          },
        },
        include: {
          department: true,
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
              department: true,
            },
          },
          items: {
            include: {
              item: true,
            },
          },
        },
      });

      return req;
    });

    res.status(201).json(requisition);
  } catch (error) {
    console.error('Error creating requisition:', error);
    res.status(500).json({ message: 'Error creating requisition' });
  }
};

// 获取单个申请单
const getRequisition: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const requisition = await prisma.requisition.findUnique({
      where: { id },
      include: {
        department: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true,
          },
        },
        items: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!requisition) {
      res.status(404).json({ message: 'Requisition not found' });
      return;
    }

    res.json(requisition);
  } catch (error) {
    console.error('Error fetching requisition:', error);
    res.status(500).json({ message: 'Error fetching requisition' });
  }
};

// 更新申请单状态
const updateRequisitionStatus: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    // 使用事务处理状态更新和库存变更
    const requisition = await prisma.$transaction(async (prismaClient: PrismaClient) => {
      // 更新申请单状态
      const req = await prismaClient.requisition.update({
        where: { id },
        data: {
          status,
        },
        include: {
          department: true,
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
              department: true,
            },
          },
          items: {
            include: {
              item: true,
            },
          },
        },
      });

      // 如果申请单被批准，创建相应的库存移动
      if (status === 'APPROVED') {
        for (const reqItem of req.items) {
          // 再次检查库存
          const inventoryItem = await prismaClient.inventoryItem.findUnique({
            where: { id: reqItem.itemId },
          });

          if (!inventoryItem) {
            throw new Error(`Item with ID ${reqItem.itemId} not found`);
          }

          if (inventoryItem.quantity < reqItem.quantity) {
            throw new Error(`Insufficient stock for item ${inventoryItem.name}. Available: ${inventoryItem.quantity}`);
          }

          // 创建出库记录
          await prismaClient.inventoryMovement.create({
            data: {
              type: 'OUT',
              quantity: reqItem.quantity,
              reason: `申请单出库 - 单号: ${req.id}`,
              item: {
                connect: {
                  id: reqItem.itemId,
                },
              },
              creator: {
                connect: {
                  id: userId,
                },
              },
            },
          });

          // 更新库存
          await prismaClient.inventoryItem.update({
            where: { id: reqItem.itemId },
            data: {
              quantity: {
                decrement: reqItem.quantity,
              },
            },
          });
        }
      }

      return req;
    });

    res.json(requisition);
  } catch (error) {
    console.error('Error updating requisition status:', error);
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Requisition not found' });
      return;
    }
    res.status(500).json({ message: error.message || 'Error updating requisition status' });
  }
};

// 删除申请单
const deleteRequisition: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // 检查申请单状态
    const requisition = await prisma.requisition.findUnique({
      where: { id },
    });

    if (!requisition) {
      res.status(404).json({ message: 'Requisition not found' });
      return;
    }

    if (requisition.status !== 'PENDING') {
      res.status(400).json({ message: 'Only pending requisitions can be deleted' });
      return;
    }

    await prisma.requisition.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Requisition not found' });
      return;
    }
    res.status(500).json({ message: 'Error deleting requisition' });
  }
};

// 获取申请单统计信息
const getRequisitionStats: RequestHandler = async (_req, res) => {
  try {
    const totalRequisitions = await prisma.requisition.count();
    const approvedRequisitions = await prisma.requisition.count({
      where: { status: 'APPROVED' },
    });
    const pendingRequisitions = await prisma.requisition.count({
      where: { status: 'PENDING' },
    });
    const rejectedRequisitions = await prisma.requisition.count({
      where: { status: 'REJECTED' },
    });

    // 获取最近的申请单
    const recentRequisitions = await prisma.requisition.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        requestedByUser: {
          select: {
            name: true,
            email: true,
            department: true,
          },
        },
      },
    });

    // 按部门统计申请单
    const requisitionsByDepartment = await prisma.requisition.groupBy({
      by: ['department'],
      _count: true,
      orderBy: {
        _count: {
          department: 'desc',
        },
      },
    });

    const stats = {
      total: totalRequisitions,
      approved: approvedRequisitions,
      pending: pendingRequisitions,
      rejected: rejectedRequisitions,
      approvalRate: totalRequisitions > 0 ? (approvedRequisitions / totalRequisitions) * 100 : 0,
      recentRequisitions,
      departmentStats: requisitionsByDepartment,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requisition statistics' });
  }
};

// 路由配置
router.get('/', auth, getAllRequisitions);
router.post('/', auth, validate(createRequisitionSchema), createRequisition);
router.get('/:id', auth, validate(getRequisitionSchema), getRequisition);
router.put('/:id/status', auth, validate(updateRequisitionStatusSchema), updateRequisitionStatus);
router.delete('/:id', auth, validate(deleteRequisitionSchema), deleteRequisition);
router.get('/stats/overview', auth, getRequisitionStats);

export default router; 