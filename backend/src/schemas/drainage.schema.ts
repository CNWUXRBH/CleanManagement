import { z } from 'zod';

// 创建排水记录验证
export const createDrainageSchema = z.object({
  body: z.object({
    locationId: z.string().uuid('Invalid location ID'),
    amount: z.number().positive('Amount must be positive'),
    description: z.string().min(1, 'Description is required'),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
  }),
});

// 更新排水记录验证
export const updateDrainageSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid drainage record ID'),
  }),
  body: z.object({
    locationId: z.string().uuid('Invalid location ID').optional(),
    amount: z.number().positive('Amount must be positive').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
      })
      .optional(),
  }),
});

// 获取排水记录验证
export const getDrainageSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid drainage record ID'),
  }),
});

// 删除排���记录验证
export const deleteDrainageSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid drainage record ID'),
  }),
}); 