import prisma from "../lib/prisma";

export async function createBaby(
  userId: string,
  name: string,
  birthday: string,
  gender?: string
) {
  const baby = await prisma.baby.create({
    data: {
      name,
      birthday: new Date(birthday),
      gender,
      userId,
    },
  });

  return baby;
}

export async function getBabies(userId: string) {
  return prisma.baby.findMany({
    where: { userId },
  });
}