import Redis from 'ioredis'
import { env } from '../config/env'

export const redis = new Redis(env.REDIS_URL!, {
  maxRetriesPerRequest: 1,

  tls: {},
  reconnectOnError() {
    return false
  },
})

redis.on('connect', () => {
  console.log('✅ Redis connected')
})

redis.on('error', (err) => {
  console.warn('⚠️ Redis error:', err.message)
})
