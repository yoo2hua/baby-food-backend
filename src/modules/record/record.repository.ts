import prisma from "../../lib/prisma";
import { redis } from "../../lib/redis";

export class RecordRepository {
  async create(
    babyId: string,
    foodName: string,
    type: string,
    reaction?: string
  ) {
    const record = await prisma.feedingRecord.create({
      data: {
        babyId,
        foodName,
        type,
        reaction,
      },
    });

    // 删除对应缓存（缓存失效）
    try {
      const today = new Date().toISOString().split('T')[0];
      const cacheKey = `record:list:${babyId}:${today}`;
      await redis.del(cacheKey);
    } catch (error) {
      console.warn('Redis cache delete error:', error);
      // 缓存删除失败不影响主流程
    }

    return record;
  }

  async findMany(babyId: string) {
    // 生成基于日期的缓存key: record:list:{babyId}:{date}
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const cacheKey = `record:list:${babyId}:${today}`;

    // 1. 先查 Redis 缓存
    try {
      const cached = await redis.get(cacheKey);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (error) {
      console.warn('Redis cache read error:', error);
      // 缓存读取失败，继续查询数据库
    }

    // 2. 缓存未命中，查询数据库
    const records = await prisma.feedingRecord.findMany({
      where: { babyId },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 3. 写入 Redis 缓存（TTL 5分钟 = 300秒）
    try {
      await redis.setex(cacheKey, 300, JSON.stringify(records));
    } catch (error) {
      console.warn('Redis cache write error:', error);
      // 缓存写入失败不影响主流程
    }

    return records;
  }

  async findManyByBabyId(babyId: string) {
    return prisma.feedingRecord.findMany({
      where: { babyId },
    });
  }

  async findManyByBabyIdAndReaction(babyId: string, reaction: string) {
    return prisma.feedingRecord.findMany({
      where: {
        babyId,
        reaction,
      },
    });
  }

  async update(id: string, data: {
    foodName?: string;
    type?: string;
    reaction?: string;
  }) {
    const record = await prisma.feedingRecord.update({
      where: { id },
      data,
    });

    // 删除对应缓存（缓存失效）
    try {
      const today = new Date().toISOString().split('T')[0];
      const cacheKey = `record:list:${record.babyId}:${today}`;
      await redis.del(cacheKey);
    } catch (error) {
      console.warn('Redis cache delete error:', error);
      // 缓存删除失败不影响主流程
    }

    return record;
  }

  async delete(id: string) {
    const record = await prisma.feedingRecord.delete({
      where: { id },
    });

    // 删除对应缓存（缓存失效）
    try {
      const today = new Date().toISOString().split('T')[0];
      const cacheKey = `record:list:${record.babyId}:${today}`;
      await redis.del(cacheKey);
    } catch (error) {
      console.warn('Redis cache delete error:', error);
      // 缓存删除失败不影响主流程
    }

    return record;
  }
}

export const recordRepository = new RecordRepository();