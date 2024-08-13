import type { MetadataRoute } from 'next'

import { APP_URL } from '@/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    host: APP_URL,
    sitemap: `${APP_URL}/sitemap.xml`
  }
}
