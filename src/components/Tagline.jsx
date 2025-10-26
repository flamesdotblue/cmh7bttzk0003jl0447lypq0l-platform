import React from 'react'
import { motion } from 'framer-motion'

export default function Tagline() {
  return (
    <div className="absolute inset-x-0 bottom-0 md:bottom-4 lg:bottom-6 px-4 md:px-8">
      <div className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22,0.61,0.36,1], delay: 0.3 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md text-[11px] tracking-wide text-white/80"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
          Cortex LXP • AI-powered learning experience
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22,0.61,0.36,1], delay: 0.6 }}
          className="mt-3 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight"
          style={{
            background: 'linear-gradient(90deg, #dbeafe 0%, #67e8f9 30%, #c4b5fd 70%, #fed7aa 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          Transforming Talent Through Continuous Learning.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22,0.61,0.36,1], delay: 0.9 }}
          className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-white/80 max-w-3xl"
        >
          Personalized learning journeys for every role, at every level.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mt-5 flex flex-wrap gap-3"
        >
          <button className="pointer-events-auto inline-flex items-center gap-2 rounded-lg px-4 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-300/30 text-cyan-200 backdrop-blur-md transition">
            Explore the Platform
          </button>
          <button className="pointer-events-auto inline-flex items-center gap-2 rounded-lg px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white/90 backdrop-blur-md transition">
            Watch Vision Reel
          </button>
        </motion.div>
      </div>
    </div>
  )
}
