'use client'

import { motion } from 'framer-motion'
import { PinIcon } from 'lucide-react'

export function PinParticles() {
  return (
    <div className='absolute top-0 left-0 size-full pointer-events-none z-10'>
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute'
          initial={{
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0
          }}
          animate={{
            opacity: 0,
            x: (Math.random() - 0.5) * 180,
            y: (Math.random() - 0.5) * 180,
            rotate: Math.random() * 360
          }}
          transition={{
            duration: 0.7,
            ease: 'easeOut'
          }}
        >
          <PinIcon className='size-3 text-light-800 dark:text-orange-400' />
        </motion.div>
      ))}
    </div>
  )
}
