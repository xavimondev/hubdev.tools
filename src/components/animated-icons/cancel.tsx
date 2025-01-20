'use client'

import { PropsWithChildren } from 'react'
import { motion, useAnimation, type Variants } from 'motion/react'

const pathVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1]
  }
}

export function CancelIcon({ children }: PropsWithChildren) {
  const controls = useAnimation()

  return (
    <div
      className='flex items-center size-full'
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
    >
      <div className='cursor-pointer select-none hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='size-4 mr-[9px]'
        >
          <motion.path variants={pathVariants} animate={controls} d='M18 6 6 18' />
          <motion.path
            transition={{ delay: 0.2 }}
            variants={pathVariants}
            animate={controls}
            d='m6 6 12 12'
          />
        </svg>
      </div>
      {children}
    </div>
  )
}
