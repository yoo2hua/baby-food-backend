import { Router } from 'express'
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware'
import { createRecord, getRecords } from '../services/feeding.service'

const router: Router = Router()

// 添加记录
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  const { babyId, foodName, type, reaction } = req.body

  const record = await createRecord(babyId, foodName, type, reaction)

  res.json(record)
})

// 查询记录
router.get<{ babyId: string }>('/:babyId', authMiddleware, async (req, res) => {
  const babyId = req.params.babyId

  const records = await getRecords(babyId)

  res.json(records)
})

export default router
