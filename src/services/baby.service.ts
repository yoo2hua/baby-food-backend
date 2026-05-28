import { babyRepository } from '../modules/baby/baby.repository'
import type { CreateBabyServiceParams } from '../types/api'

export async function createBaby(params: CreateBabyServiceParams) {
  const baby = await babyRepository.create({
    name: params.name,
    birthday: new Date(params.birthday),
    gender: params.gender ?? undefined,
    userId: params.userId,
  })

  return baby
}

export async function getBabies(userId: string) {
  return babyRepository.findMany({ userId })
}
