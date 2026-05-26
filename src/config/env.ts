/**
 * 环境变量配置中心
 * 统一管理和校验所有环境变量
 */

/**
 * 断言环境变量存在，如果不存在则抛出错误
 */
function assertEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`环境变量 ${key} 未定义，请在 .env 文件中配置`);
  }
  return value;
}

/**
 * 环境变量配置对象
 */
export const env = {
  /**
   * JWT 密钥
   */
  JWT_SECRET: assertEnv('JWT_SECRET'),

  /**
   * 数据库连接字符串
   */
  DATABASE_URL: assertEnv('DATABASE_URL'),

  /**
   * 端口号（可选，默认3000）
   */
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
} as const;

/**
 * 环境变量类型定义
 */
export type Env = typeof env;