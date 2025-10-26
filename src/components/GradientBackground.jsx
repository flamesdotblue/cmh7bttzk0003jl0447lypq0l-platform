import React, { useEffect } from 'react'

export default function GradientBackground() {
  useEffect(() => {
    const root = document.documentElement
    // Enable GPU acceleration
    root.style.setProperty('--bg1', '#0a0f2a')
    root.style.setProperty('--bg2', '#0b1236')
    root.style.setProperty('--bg3', '#0a163f')
    root.style.setProperty('--neon1', '#06b6d4') // cyan
    root.style.setProperty('--neon2', '#7c3aed') // violet
    root.style.setProperty('--neonWarm', '#f59e0b') // amber
  }, [])

  return (
    <div className="absolute inset-0">
      {/* Animated radial gradients for cinematic depth */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(1200px 800px at 20% 20%, rgba(124,58,237,0.25), transparent 60%),
                     radial-gradient(1000px 700px at 80% 30%, rgba(6,182,212,0.25), transparent 60%),
                     radial-gradient(1200px 900px at 50% 80%, rgba(245,158,11,0.12), transparent 65%),
                     linear-gradient(160deg, var(--bg1), var(--bg2) 40%, var(--bg3))`
      }} />

      {/* Slowly shifting gradient overlay */}
      <div className="absolute inset-0 mix-blend-screen opacity-70 animate-[gradientShift_18s_ease-in-out_infinite]" style={{
        background: 'conic-gradient(from 180deg at 50% 50%, rgba(6,182,212,0.18), rgba(124,58,237,0.18), rgba(6,182,212,0.18))'
      }} />

      {/* Soft vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(120% 100% at 50% 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.45) 100%)'
      }} />

      {/* Subtle star/particle backdrop */}
      <NoiseStars />

      <style>{`
        @keyframes gradientShift {
          0% { transform: rotate(0deg) scale(1); filter: hue-rotate(0deg); }
          50% { transform: rotate(6deg) scale(1.02); filter: hue-rotate(10deg); }
          100% { transform: rotate(0deg) scale(1); filter: hue-rotate(0deg); }
        }
      `}</style>
    </div>
  )
}

function NoiseStars() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none">
      <defs>
        <radialGradient id="g" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[...Array(80)].map((_, i) => (
        <circle key={i} cx={`${Math.random()*100}%`} cy={`${Math.random()*100}%`} r={Math.random()*1.5+0.2} fill="url(#g)">
          <animate attributeName="opacity" values="0;1;0" dur={`${6 + Math.random()*6}s`} repeatCount="indefinite" begin={`${Math.random()*5}s`} />
        </circle>
      ))}
    </svg>
  )
}
