import { z } from 'zod';

// 创建部门验证
export const createDepartmentSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Department name must be at least 2 characters long'),
    description: z.string().optional(),
    manager: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});

// 更新部门验证
export const updateDepartmentSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid department ID'),
  }),
  body: z.object({
    name: z.string().min(2, 'Department name must be at least 2 characters long').optional(),
    description: z.string().optional(),
    manager: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});

// 获取部门验证
export const getDepartmentSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid department ID'),
  }),
});

// 删除部门验证
export const deleteDepartmentSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid department ID'),
  }),
}); 