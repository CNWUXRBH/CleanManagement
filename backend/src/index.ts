import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error';
import { AppError } from './types/error';
import { requestLogger, errorLogger } from './utils/logger';
import { apiLimiter } from './middleware/rateLimit';
// 导入路由
import authRoutes from './routes/auth';
import inventoryRoutes from './routes/inventory';
import supplierRoutes from './routes/supplier';
import procurementRoutes from './routes/procurement';
import drainageRoutes from './routes/drainage';
import departmentRoutes from './routes/department';
import requisitionRoutes from './routes/requisition';

const app = express();

// 基本中间件
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// 全局速率限制
app.use(apiLimiter);

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/procurement', procurementRoutes);
app.use('/api/drainage', drainageRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/requisitions', requisitionRoutes);

// 处理未找��的路由
app.all('*', (req, _res, next) => {
  next(new AppError(404, 'fail', `Can't find ${req.originalUrl} on this server!`));
});

// 错误日志中间件
app.use(errorLogger);

// 错误处理中间件
app.use(errorHandler as ErrorRequestHandler);

// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 