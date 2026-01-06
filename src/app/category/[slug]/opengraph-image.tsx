import { ImageResponse } from 'next/og'

import { APP_URL } from '@/constants'
import { getCategoryDetails } from '@/services/list'

export default async function Image({
  params
}: {
  params: {
    slug: string
  }
}) {
  const size = {
    width: 1200,
    height: 630
  }

  const details = await getCategoryDetails({
    slug: params.slug
  })

  if (!details) {
    return new ImageResponse(
      <div
        style={{
          background: '#171717',
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
  }

  const { name, description } = details[0]

  return new ImageResponse(
    <div
      style={{
        background: '#171717',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          backgroundSize: '70px 70px',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      ></div>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: '0'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            margin: '35px'
          }}
        >
          <img
            src={`${APP_URL}/assets/icon.png`}
            style={{
              width: '40px',
              height: '40px'
            }}
            alt='Icon'
          />
          <p
            style={{
              color: '#B9B9B9',
              fontSize: '2rem'
            }}
          >
            hubdev
          </p>
        </div>
      </div>
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
        <p
          style={{
            color: '#B9B9B9',
            fontSize: '3rem'
          }}
        >
          {description}
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: '0'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            margin: '35px'
          }}
        >
          <p
            style={{
              color: '#c5c5c5',
              fontSize: '1.2rem'
            }}
          >
            Learn more at 👉 {APP_URL}
          </p>
        </div>
      </div>
    </div>,
    {
      ...size
    }
  )
}
