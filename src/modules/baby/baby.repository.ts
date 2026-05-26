import prisma from "../../lib/prisma";

export class BabyRepository {
  async create(data: {
    name: string;
    birthday: Date;
    gender?: string;
    userId: string;
  }) {
    return prisma.baby.create({ data });
  }

  async findMany(where: { userId: string }) {
    return prisma.baby.findMany({ where });
  }
}

export const babyRepository = new BabyRepository();