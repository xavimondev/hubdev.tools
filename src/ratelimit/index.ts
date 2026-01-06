import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const MAX_REQUESTS = 20

export const uptash = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(MAX_REQUESTS, '1440 m'), // 1 per day
  analytics: true,
  prefix: '@ratelimit/hubtools.dev'
})

export const favoritesRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, '1 m'), // 20 per minute
  analytics: true,
  prefix: '@ratelimit/hubtools.dev-favorites'
})
