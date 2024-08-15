import { ImageResponse } from 'next/og'

import { APP_URL } from '@/constants'

export const runtime = 'edge'

export const alt = 'Open Graph Image'
export const size = {
  width: 1200,
  height: 630
}

export const contentType = 'image/png'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const hasQuery = searchParams.has('query')

  if (!hasQuery) {
    const logoSrc = await fetch(new URL(`${APP_URL}/assets/og.jpg`, import.meta.url)).then((res) =>
      res.arrayBuffer()
    )

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            background: '#151313'
          }}
        >
          {/* @ts-ignore */}
          <img src={logoSrc} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      )
    )
  }

  const query = searchParams.get('query')
  console.log(query)

  const iconSrc = await fetch(new URL(`${APP_URL}/assets/icon.png`, import.meta.url)).then((res) =>
    res.arrayBuffer()
  )

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
            backgroundImage: `linear-gradient(to right,#242424 1px,transparent 1px),linear-gradient(to bottom,#242424 1px,transparent 1px)`,
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
            {/* @ts-ignore */}
            <img src={iconSrc} style={{ width: '40px', height: '40px' }} />
            <p style={{ color: '#B9B9B9', fontSize: '2rem' }}>hubdev</p>
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
            <p style={{ color: '#c5c5c5', fontSize: '1.2rem' }}>Learn more at 👉 {APP_URL}</p>
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  )
}
