import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { authRepository } from '../modules/auth/auth.repository'
import { env } from '../config/env'
import { AppError } from '../common/exceptions/AppError'

export async function register(email: string, password: string) {
  const exist = await authRepository.findUnique({ email })

  if (exist) {
    throw AppError.badRequest('用户已存在', 1001)
  }

  const hashed = await bcrypt.hash(password, 10)

  const user = await authRepository.create({
    email,
    password: hashed,
  })

  return {
    id: user.id,
    email: user.email,
  }
}

export async function login(email: string, password: string) {
  const user = await authRepository.findUnique({ email })

  if (!user) {
    throw AppError.badRequest('用户不存在', 1002)
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    throw AppError.badRequest('密码错误', 1003)
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    env.JWT_SECRET,
    { expiresIn: '7d' },
  )

  return {
    token,
  }
}
