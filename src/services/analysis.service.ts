import { recordRepository } from "../modules/record/record.repository";

export async function getFoodStats(babyId: string) {
  const records = await recordRepository.findManyByBabyId(babyId);

  const foodCount: Record<string, number> = {};

  for (const record of records) {
    foodCount[record.foodName] =
      (foodCount[record.foodName] || 0) + 1;
  }

  return {
    total: records.length,
    foodCount,
  };
}

export async function getAllergyStats(babyId: string) {
  const records = await recordRepository.findManyByBabyIdAndReaction(babyId, "过敏");

  const allergyFoods: Record<string, number> = {};

  for (const record of records) {
    allergyFoods[record.foodName] =
      (allergyFoods[record.foodName] || 0) + 1;
  }

  return {
    totalAllergy: records.length,
    allergyFoods,
  };
}