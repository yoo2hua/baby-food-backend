import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { authRepository } from '../modules/auth/auth.repository'
import { env } from '../config/env'

export async function register(email: string, password: string) {
  const exist = await authRepository.findUnique({ email })

  if (exist) {
    throw new Error('用户已存在')
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
    throw new Error('用户不存在')
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    throw new Error('密码错误')
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
