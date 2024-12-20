import { vi } from 'vitest';
import { InventoryItem } from '../store/slices/inventorySlice';
import { User } from '../store/slices/userSlice';

// Mock data
export const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: '清洁剂',
    category: '清洁用品',
    quantity: 100,
    unit: '瓶',
    minStock: 20,
    maxStock: 200,
    location: 'A-1-1',
    lastUpdated: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: '抹布',
    category: '清洁用品',
    quantity: 500,
    unit: '块',
    minStock: 100,
    maxStock: 1000,
    location: 'A-1-2',
    lastUpdated: new Date('2024-01-01'),
  },
];

export const mockUser: User = {
  id: '1',
  name: '张三',
  email: 'zhangsan@example.com',
  role: 'admin',
  department: '后勤部',
  avatar: 'https://example.com/avatar.jpg',
};

// Mock API responses
export const mockApi = {
  inventory: {
    getAll: vi.fn().mockResolvedValue(mockInventoryItems),
    getById: vi.fn().mockImplementation((id: string) =>
      Promise.resolve(mockInventoryItems.find((item) => item.id === id))
    ),
    create: vi.fn().mockImplementation((item: Omit<InventoryItem, 'id' | 'lastUpdated'>) =>
      Promise.resolve({
        id: String(Date.now()),
        lastUpdated: new Date(),
        ...item,
      })
    ),
    update: vi.fn().mockImplementation((id: string, updates: Partial<InventoryItem>) =>
      Promise.resolve({
        ...mockInventoryItems.find((item) => item.id === id),
        ...updates,
        lastUpdated: new Date(),
      })
    ),
    delete: vi.fn().mockResolvedValue(true),
  },
  auth: {
    login: vi.fn().mockResolvedValue({ user: mockUser, token: 'mock-token' }),
    logout: vi.fn().mockResolvedValue(true),
    getCurrentUser: vi.fn().mockResolvedValue(mockUser),
  },
};

// Mock fetch implementation
export const setupMockApi = () => {
  const originalFetch = global.fetch;

  beforeAll(() => {
    global.fetch = vi.fn().mockImplementation((url: string, options?: RequestInit) => {
      const path = new URL(url, 'http://localhost').pathname;
      const method = options?.method || 'GET';

      switch (`${method} ${path}`) {
        case 'GET /api/inventory':
          return Promise.resolve(new Response(JSON.stringify(mockInventoryItems)));
        case 'POST /api/inventory':
          return Promise.resolve(
            new Response(
              JSON.stringify({
                id: String(Date.now()),
                lastUpdated: new Date(),
                ...JSON.parse(options?.body as string),
              })
            )
          );
        case 'POST /api/auth/login':
          return Promise.resolve(
            new Response(JSON.stringify({ user: mockUser, token: 'mock-token' }))
          );
        default:
          return Promise.reject(new Error(`Unhandled request: ${method} ${path}`));
      }
    });
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });
};

// Helper function to wait for async operations
export const waitForAsync = () => new Promise((resolve) => setTimeout(resolve, 0)); 