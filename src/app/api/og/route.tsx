import { ImageResponse } from 'next/og'

import { APP_URL } from '@/constants'

export async function GET(request: Request) {
  const size = {
    width: 1200,
    height: 630
  }

  const { searchParams } = new URL(request.url)
  const hasQuery = searchParams.has('query')

  if (!hasQuery) {
    return new ImageResponse(
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#151313'
        }}
      >
        <img
          src={`${APP_URL}/assets/banner.jpg`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
          alt='logo'
        />
      </div>
    )
  }

  const query = searchParams.get('query')

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
        <p
          style={{
            color: '#fde047',
            fontSize: '3rem',
            display: 'block',
            lineClamp: 4
          }}
        >
          [🔍] {query}
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
