import { SVGProps } from 'react'

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='512'
      height='512'
      viewBox='0 0 512 512'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      {...props}
    >
      <rect
        id='r9'
        width='512'
        height='512'
        x='0'
        y='0'
        rx='128'
        fill='url(#ra)'
        stroke='#FFFFFF'
        strokeWidth='0'
        strokeOpacity='100%'
        paintOrder='stroke'
      ></rect>
      <clipPath id='clip'>
        <use xlinkHref='#r9'></use>
      </clipPath>
      <defs>
        <radialGradient
          id='ra'
          cx='50%'
          cy='50%'
          r='100%'
          fx='50%'
          fy='0%'
          gradientUnits='objectBoundingBox'
        >
          <stop stopColor='#4d4d4d'></stop>
          <stop offset='1' stopColor='#000000'></stop>
        </radialGradient>
        <radialGradient
          id='rb'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(256) rotate(90) scale(512)'
        >
          <stop stopColor='white'></stop>
          <stop offset='1' stopColor='white' stopOpacity='0'></stop>
        </radialGradient>
      </defs>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 16 16'
        width='352'
        height='352'
        x='80'
        y='80'
        alignmentBaseline='middle'
        style={{ color: 'rgb(230, 230, 230)' }}
      >
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
          d='M9.093 2.094S10.531 4.083 10.531 8s-1.438 5.906-1.438 5.906M6.907 2.094S5.469 4.083 5.469 8s1.438 5.906 1.438 5.906M1.755 8h12.49m.005 0a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z'
        ></path>
      </svg>
    </svg>
  )
}
