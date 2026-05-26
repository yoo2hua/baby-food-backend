import prisma from "../lib/prisma";

export async function createRecord(
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

export async function getRecords(babyId: string) {
  return prisma.feedingRecord.findMany({
    where: { babyId },
    orderBy: {
      createdAt: "desc",
    },
  });
}