import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth, adminAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { RequestHandler } from '../types/express';
import {
  createDepartmentSchema,
  updateDepartmentSchema,
  getDepartmentSchema,
  deleteDepartmentSchema,
} from '../schemas/department.schema';

const router = express.Router();
const prisma = new PrismaClient();


// 获取所有部门
const getAllDepartments: RequestHandler = async (_req, res) => {
  try {
    const departments = await prisma.department.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments' });
  }
};

// 创建新部门（仅管理员）
const createDepartment: RequestHandler = async (req, res) => {
  try {
    const { name, description } = req.body;

    const department = await prisma.department.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json(department);
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(400).json({ message: 'Department name already exists' });
      return;
    }
    res.status(500).json({ message: 'Error creating department' });
  }
};

// 获取单个部门
const getDepartment: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await prisma.department.findUnique({
      where: { id },
    });

    if (!department) {
      res.status(404).json({ message: 'Department not found' });
      return;
    }

    res.json(department);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching department' });
  }
};

// 更新部门（仅管理员）
const updateDepartment: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const department = await prisma.department.update({
      where: { id },
      data: updateData,
    });

    res.json(department);
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(400).json({ message: 'Department name already exists' });
      return;
    }
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Department not found' });
      return;
    }
    res.status(500).json({ message: 'Error updating department' });
  }
};

// 删除部门（仅管理员）
const deleteDepartment: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.department.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Department not found' });
      return;
    }
    res.status(500).json({ message: 'Error deleting department' });
  }
};

// 获取部门统计信息
const getDepartmentStats: RequestHandler = async (_req, res) => {
  try {
    const totalDepartments = await prisma.department.count();

    // 获取相关的申请单统计
    const requisitionsByDepartment = await prisma.requisition.groupBy({
      by: ['departmentId'],
      _count: {
        _all: true,
      },
    });

    const stats = {
      total: totalDepartments,
      requisitionStats: requisitionsByDepartment,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching department statistics' });
  }
};

// 路由配置
router.get('/', auth, getAllDepartments);
router.post('/', auth, adminAuth, validate(createDepartmentSchema), createDepartment);
router.get('/:id', auth, validate(getDepartmentSchema), getDepartment);
router.put('/:id', auth, adminAuth, validate(updateDepartmentSchema), updateDepartment);
router.delete('/:id', auth, adminAuth, validate(deleteDepartmentSchema), deleteDepartment);
router.get('/stats/overview', auth, getDepartmentStats);

export default router; 