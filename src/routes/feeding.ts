import { Router } from 'express'
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware'
import { createRecord, getRecords } from '../services/feeding.service'
import { response } from '../common/utils/response'
import { createRecordSchema } from '../schemas/record.schema'
import type { CreateRecordBody } from '../types/api'

const router: Router = Router()

router.post('/', authMiddleware, async (req: AuthRequest<CreateRecordBody>, res) => {
  const { body } = createRecordSchema.parse(req.body)

  const record = await createRecord(body)

  return res.json(response.success(record))
})

router.get('/:babyId', authMiddleware, async (req, res) => {
  const babyId = String(req.params.babyId ?? '')

  const records = await getRecords(babyId)

  return res.json(response.success(records))
})

export default router
