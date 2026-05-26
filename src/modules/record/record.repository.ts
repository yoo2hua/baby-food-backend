import prisma from "../../lib/prisma";

export class RecordRepository {
  async create(
    babyId: string,
    foodName: string,
    type: string,
    reaction?: string
  ) {
    return prisma.feedingRecord.create({
      data: {
        babyId,
        foodName,
        type,
        reaction,
      },
    });
  }

  async findMany(babyId: string) {
    return prisma.feedingRecord.findMany({
      where: { babyId },
      orderBy: {
        createdAt: "desc",
      },
    });
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
}

export const recordRepository = new RecordRepository();