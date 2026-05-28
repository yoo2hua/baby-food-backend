import { Router, Request } from 'express'
import { login, register } from '../services/auth.service'
import { response } from '../common/utils/response'
import { registerSchema, loginSchema } from '../schemas/auth.schema'
import type { RegisterBody } from '../types/api'

const router: Router = Router()

router.post('/register', async (req: Request<{}, {}, RegisterBody>, res) => {
  try {
    const body = registerSchema.parse(req.body)

    const user = await register(body.email, body.password)

    return res.json(response.success(user))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return res.status(400).json(response.error(message, 400))
  }
})

router.post('/login', async (req: Request<{}, {}, RegisterBody>, res) => {
  try {
    const body = loginSchema.parse(req.body)
    const result = await login(body.email, body.password)
    return res.json(response.success(result))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return res.status(400).json(response.error(message, 400))
  }
})

export default router
