export class AppError extends Error {
  public code: number;
  public status: number;

  constructor(message: string, code: number = 1, status: number = 400) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.status = status;

    // 保持原型链
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static badRequest(message: string, code: number = 1): AppError {
    return new AppError(message, code, 400);
  }

  static unauthorized(message: string = '未授权访问', code: number = 401): AppError {
    return new AppError(message, code, 401);
  }

  static forbidden(message: string = '禁止访问', code: number = 403): AppError {
    return new AppError(message, code, 403);
  }

  static notFound(message: string = '资源不存在', code: number = 404): AppError {
    return new AppError(message, code, 404);
  }

  static internal(message: string = '服务器内部错误', code: number = 500): AppError {
    return new AppError(message, code, 500);
  }
}