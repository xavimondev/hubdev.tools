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
  const ogColor = data?.ogColor

  return new ImageResponse(
    (
      <div
        style={{
          background: '#151313',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            backgroundSize: '70px 70px',
            backgroundImage: `linear-gradient(to right,#1a1a1a 1px,transparent 1px),linear-gradient(to bottom,#1a1a1a 1px,transparent 1px)`,
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        ></div>
        <div
          style={{
            backgroundColor: 'transparent',
            backgroundImage: `radial-gradient(ellipse 80% 35% at 65% -25%,${ogColor}, rgba(255, 255, 255, 0))`,
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '0'
          }}
        ></div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            margin: '35px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#fde047',
              fontSize: '6rem'
            }}
          >
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
