import { Request, Response, NextFunction } from 'express';
import { AppError } from '../common/exceptions/AppError';
import { response } from '../common/utils/response';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // AppError 实例
  if (err instanceof AppError) {
    return res
      .status(err.status)
      .json(response.error(err.message, err.code));
  }

  // Prisma 错误或其他数据库错误
  if (err.name === 'PrismaClientKnownRequestError' || err.name === 'PrismaClientValidationError') {
    return res
      .status(400)
      .json(response.error('数据库操作失败', 1001));
  }

  // JWT 验证错误
  if (err.name === 'JsonWebTokenError') {
    return res
      .status(401)
      .json(response.error('令牌无效', 401));
  }

  // 令牌过期错误
  if (err.name === 'TokenExpiredError') {
    return res
      .status(401)
      .json(response.error('令牌已过期', 4011));
  }

  // 默认服务器错误
  console.error('Unhandled error:', err);
  return res
    .status(500)
    .json(response.error('服务器内部错误', 500));
}