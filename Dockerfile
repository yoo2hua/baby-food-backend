FROM node:20-alpine AS base

WORKDIR /app

# 安装 pnpm
RUN corepack enable

# 只复制依赖声明文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖（关键）
RUN pnpm install --frozen-lockfile

# 复制源码
COPY . .

# Prisma generate
RUN pnpm prisma generate

# build
RUN pnpm build

EXPOSE 3000

CMD ["node", "dist/src/server.js"]