import { recordRepository } from '../modules/record/record.repository'
import type { CreateRecordServiceParams } from '../types/api'

export async function createRecord(params: CreateRecordServiceParams) {
  return recordRepository.create(
    params.babyId,
    params.foodName,
    params.type,
    params.reaction ?? undefined,
  )
}

export async function getRecords(babyId: string) {
  return recordRepository.findMany(babyId)
}
