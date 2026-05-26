import { Router } from 'express'
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware'
import { getFoodStats, getAllergyStats } from '../services/analysis.service'

const router: Router = Router()

router.get<{ babyId: string }>(
  '/:babyId/food-stats',
  authMiddleware,
  async (req, res) => {
    const babyId = req.params.babyId

    const stats = await getFoodStats(babyId)

    res.json(stats)
  },
)

router.get<{ babyId: string }>(
  '/:babyId/allergy-stats',
  authMiddleware,
  async (req, res) => {
    const babyId = req.params.babyId

    const result = await getAllergyStats(babyId)

    res.json(result)
  },
)

export default router
