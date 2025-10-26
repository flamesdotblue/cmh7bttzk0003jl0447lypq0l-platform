import React from 'react'
import { motion } from 'framer-motion'
import { User, BarChart3, Brain } from 'lucide-react'

export default function FloatingUI() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Holographic cards group */}
      <Card x="12%" y="22%" delay={0.2} icon={<Brain className="w-4 h-4 text-cyan-300" />} title="Adaptive Path" subtitle="AI-curated modules" metric="97% match" hue="cyan" />
      <Card x="72%" y="28%" delay={0.6} icon={<BarChart3 className="w-4 h-4 text-violet-300" />} title="Skills Uplift" subtitle="Team insights" metric="+24%" hue="violet" />
      <Card x="24%" y="66%" delay={1.0} icon={<User className="w-4 h-4 text-amber-200" />} title="Mentor Link" subtitle="Peer collaboration" metric="Live" hue="amber" />

      {/* Connection energy lines */}
      <EnergyLinks />
    </div>
  )
}

function Card({ x, y, delay, icon, title, subtitle, metric, hue }) {
  const hueMap = {
    cyan: 'from-cyan-400/30 to-cyan-300/10 border-cyan-300/30 shadow-cyan-400/30',
    violet: 'from-violet-400/30 to-violet-300/10 border-violet-300/30 shadow-violet-400/30',
    amber: 'from-amber-400/30 to-amber-300/10 border-amber-300/30 shadow-amber-400/30',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: [20, -6, 0], scale: 1 }}
      transition={{ delay, duration: 1.2, ease: [0.22,0.61,0.36,1] }}
      className="absolute"
      style={{ left: x, top: y }}
    >
      <motion.div
        className={`pointer-events-auto backdrop-blur-xl bg-gradient-to-br ${hueMap[hue]} border rounded-xl px-4 py-3 shadow-lg`}
        style={{ boxShadow: '0 10px 40px -8px rgba(6,182,212,0.25)' }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-2">
          <div className="shrink-0">{icon}</div>
          <div className="text-xs text-white/80">{subtitle}</div>
        </div>
        <div className="mt-1 text-sm font-semibold tracking-wide">{title}</div>
        <div className="mt-1 text-[11px] text-white/70">{metric}</div>
      </motion.div>
    </motion.div>
  )
}

function EnergyLinks() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="energy" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <filter id="glowLine" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* flowing connections */}
      {[
        'M240 280 C 520 220, 740 300, 920 240 C 1120 180, 1320 220, 1640 260',
        'M360 740 C 620 640, 980 700, 1280 520 C 1440 430, 1680 420, 1800 480',
        'M220 520 C 580 520, 880 420, 1220 520 C 1380 580, 1560 620, 1760 560',
      ].map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="url(#energy)" strokeWidth="1.8" opacity="0.5" filter="url(#glowLine)" strokeDasharray="6 12">
            <animate attributeName="stroke-dashoffset" from="0" to="-200" dur={`${6 + i*1.2}s`} repeatCount="indefinite" />
          </path>
        </g>
      ))}
    </svg>
  )
}
