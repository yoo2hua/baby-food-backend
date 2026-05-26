import prisma from "../../lib/prisma";

export class AuthRepository {
  async findUnique(where: { email: string }) {
    return prisma.user.findUnique({ where });
  }

  async create(data: { email: string; password: string }) {
    return prisma.user.create({ data });
  }
}

export const authRepository = new AuthRepository();