import { Router } from 'express'
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware'
import { createBaby, getBabies } from '../services/baby.service'
import { response } from '../common/utils/response'
import { createBabySchema } from '../schemas/baby.schema'
import type { CreateBabyBody } from '../types/api'

const router: Router = Router()

router.post('/', authMiddleware, async (req: AuthRequest<CreateBabyBody>, res) => {
  const body = createBabySchema.parse(req.body)

  const baby = await createBaby({
    userId: req.user!.userId,
    name: body.name,
    birthday: body.birthday,
    gender: body.gender,
  })

  return res.json(response.success(baby))
})

router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  const babies = await getBabies(req.user!.userId)
  return res.json(response.success(babies))
})

export default router
