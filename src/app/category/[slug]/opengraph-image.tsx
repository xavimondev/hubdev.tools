import { ImageResponse } from 'next/og'
import { SLUG_ICONS } from '@/categories'

import { getCategoryDetails } from '@/services/list'

export const runtime = 'edge'

export const alt = 'Open Graph Image For Category'
export const size = {
  width: 1200,
  height: 630
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const details = await getCategoryDetails({ slug: params.slug })
  if (!details) {
    return new ImageResponse(
      (
        <div
          style={{
            background: '#100E0E',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            color: '#B9B9B9',
            fontSize: '5rem'
          }}
        >
          Category not found
        </div>
      )
    )
  }

  const { name, description } = details[0]
  const data = SLUG_ICONS.find((icon) => icon.slug === params.slug)
  const icon = data?.icon

  return new ImageResponse(
    (
      <div
        style={{
          background: '#100E0E',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '10px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#fde047',
              fontSize: '7rem'
            }}
          >
            {icon}
            <span>{name}</span>
          </div>
          <p style={{ color: '#B9B9B9', fontSize: '3rem' }}>{description}</p>
        </div>
      </div>
    ),
    {
      ...size
    }
  )
}
