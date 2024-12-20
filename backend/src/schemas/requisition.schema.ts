import { z } from 'zod';


// 申请单项目验证模式
const requisitionItemSchema = z.object({
  itemId: z.string().uuid('Invalid item ID'),
  quantity: z.number().positive('Quantity must be positive'),
});

export const createRequisitionSchema = z.object({
  body: z.object({
    department: z.string().min(1, 'Department is required'),
    items: z.array(requisitionItemSchema).min(1, 'At least one item is required'),
  }),
});

export const updateRequisitionStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid requisition ID'),
  }),
  body: z.object({
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']),
  }),
});

export const getRequisitionSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid requisition ID'),
  }),
});

export const deleteRequisitionSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid requisition ID'),
  }),
}); 