import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { response } from "../common/utils/response";

// 扩展 req 类型（后面你会经常用）
export interface AuthRequest extends Request {
  user?: any;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // 1. 获取 token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json(response.error("未携带 token", 401));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json(response.error("token 格式错误", 401));
    }

    // 2. 解析 token
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // 3. 挂载用户信息
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json(response.error("token 无效或已过期", 401));
  }
}
