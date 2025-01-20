'use client'

import { PropsWithChildren } from 'react'
import { motion, useAnimation, type Variants } from 'motion/react'

const sparkleVariants: Variants = {
  initial: {
    y: 0,
    fill: 'none'
  },
  hover: {
    y: [0, -1, 0, 0],
    fill: 'currentColor',
    transition: {
      duration: 1,
      bounce: 0.3
    }
  }
}

const starVariants: Variants = {
  initial: {
    opacity: 1,
    x: 0,
    y: 0
  },
  blink: () => ({
    opacity: [0, 1, 0, 0, 0, 0, 1],
    transition: {
      duration: 2,
      type: 'spring',
      stiffness: 70,
      damping: 10,
      mass: 0.4
    }
  })
}

export function SparklesIcon({ children }: PropsWithChildren) {
  const starControls = useAnimation()
  const sparkleControls = useAnimation()

  return (
    <div
      className='flex items-center size-full'
      onMouseEnter={() => {
        sparkleControls.start('hover')
        starControls.start('blink', { delay: 1 })
      }}
      onMouseLeave={() => {
        sparkleControls.start('initial')
        starControls.start('initial')
      }}
    >
      <div className='cursor-pointer select-none hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='28'
          height='28'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='size-4 mr-[9px]'
        >
          <motion.path
            d='M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z'
            variants={sparkleVariants}
            animate={sparkleControls}
          />
          <motion.path d='M20 3v4' variants={starVariants} animate={starControls} />
          <motion.path d='M22 5h-4' variants={starVariants} animate={starControls} />
          <motion.path d='M4 17v2' variants={starVariants} animate={starControls} />
          <motion.path d='M5 18H3' variants={starVariants} animate={starControls} />
        </svg>
      </div>
      {children}
    </div>
  )
}
