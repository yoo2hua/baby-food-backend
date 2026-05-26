import { recordRepository } from "../modules/record/record.repository";

export async function createRecord(
  babyId: string,
  foodName: string,
  type: string,
  reaction?: string
) {
  return recordRepository.create(babyId, foodName, type, reaction);
}

export async function getRecords(babyId: string) {
  return recordRepository.findMany(babyId);
}