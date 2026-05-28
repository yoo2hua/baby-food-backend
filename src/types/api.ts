// ── Request body types ──

export interface RegisterBody {
  email: string
  password: string
}

export interface LoginBody {
  email: string
  password: string
}

export interface CreateBabyBody {
  name: string
  birthday: string
  gender?: string
}

export interface CreateRecordBody {
  babyId: string
  foodName: string
  type: string
  reaction?: string
}

// ── Request param types ──

export interface BabyIdParams {
  babyId: string
}

// ── Service-level param types ──

export type CreateBabyServiceParams = { userId: string } & CreateBabyBody
export type CreateRecordServiceParams = CreateRecordBody
