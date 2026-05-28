import type {
  UserUncheckedCreateInput,
  BabyUncheckedCreateInput,
  FeedingRecordUncheckedCreateInput,
} from '../../generated/prisma/models'

// ── Request body types (derived from Prisma UncheckedCreateInput) ──

export type RegisterBody = Pick<UserUncheckedCreateInput, 'email' | 'password'>
export type LoginBody = Pick<UserUncheckedCreateInput, 'email' | 'password'>

export type CreateBabyBody = Pick<BabyUncheckedCreateInput, 'name' | 'birthday' | 'gender'>
export type CreateRecordBody = Pick<FeedingRecordUncheckedCreateInput, 'babyId' | 'foodName' | 'type' | 'reaction'>

// ── Request param types ──

export interface BabyIdParams {
  babyId: string
}

// ── Service-level param types (body + server-side fields) ──

export type CreateBabyServiceParams = { userId: string } & CreateBabyBody
export type CreateRecordServiceParams = CreateRecordBody
