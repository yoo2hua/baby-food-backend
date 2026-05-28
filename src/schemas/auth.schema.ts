import { z } from 'zod'

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'email 不能为空')
    .email('email 格式不正确'),
  password: z
    .string()
    .min(6, 'password 不能少于 6 个字符')
    .max(100, 'password 不能超过 100 个字符'),
})

export const loginSchema = registerSchema

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
