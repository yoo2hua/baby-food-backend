import { z } from 'zod'

export const createBabySchema = z.object({
  name: z
    .string()
    .min(1, 'name 不能为空')
    .max(50, 'name 不能超过 50 个字符'),
  birthday: z
    .string()
    .min(1, 'birthday 不能为空')
    .refine((val) => !isNaN(Date.parse(val)), 'birthday 日期格式不正确'),
  gender: z
    .string()
    .max(10, 'gender 不能超过 10 个字符')
    .optional(),
})

export type CreateBabyInput = z.infer<typeof createBabySchema>
