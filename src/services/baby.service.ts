import { babyRepository } from "../modules/baby/baby.repository";

export async function createBaby(
  userId: string,
  name: string,
  birthday: string,
  gender?: string
) {
  const baby = await babyRepository.create({
    name,
    birthday: new Date(birthday),
    gender,
    userId,
  });

  return baby;
}

export async function getBabies(userId: string) {
  return babyRepository.findMany({ userId });
}