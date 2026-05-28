import type { UserUncheckedCreateInput } from '../../generated/prisma/models'

export type RegisterBody = Pick<UserUncheckedCreateInput, 'email' | 'password'>
