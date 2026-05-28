import { z } from 'zod'

export const createRecordSchema = z.object({
  body: z.object({
    babyId: z.string(),
    foodName: z
      .string()
      .min(1, 'foodName 不能为空')
      .max(50, 'foodName 不能超过 50 个字符'),
    type: z.string().min(1, 'type 不能为空').max(50, 'type 不能超过 50 个字符'),
    reaction: z.string().max(200, 'reaction 不能超过 200 个字符').optional(),
  }),
})

export type CreateRecordInput = z.infer<typeof createRecordSchema>
