import React, { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function HeroScene() {
  const ref = useRef(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 12 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 12 })
  const tiltX = useTransform(springY, [0, 1], [6, -6])
  const tiltY = useTransform(springX, [0, 1], [-8, 8])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      mouseX.set(x)
      mouseY.set(y)
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [mouseX, mouseY])

  return (
    <div ref={ref} className="absolute inset-0">
      {/* Parallax layers */}
      <ParallaxLayer depth={0.02}>
        <NetworkCanvas />
      </ParallaxLayer>

      <ParallaxLayer depth={0.06}>
        <SilhouetteMorph />
      </ParallaxLayer>

      {/* Overall cinematic tilt */}
      <motion.div className="absolute inset-0" style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }} />
    </div>
  )
}

function ParallaxLayer({ depth, children }) {
  // subtle drift based on time
  const t = useMotionValue(0)
  useEffect(() => {
    let raf
    const start = performance.now()
    const loop = (now) => {
      const s = (now - start) / 1000
      t.set(s)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [t])
  const x = useTransform(t, (v) => Math.sin(v * 0.2 + depth * 10) * depth * 20)
  const y = useTransform(t, (v) => Math.cos(v * 0.16 + depth * 8) * depth * 14)
  return (
    <motion.div className="absolute inset-0" style={{ x, y, transform: 'translateZ(0)' }}>
      {children}
    </motion.div>
  )
}

function NetworkCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w, h, dpr
    const nodes = []
    const edges = []

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.parentElement.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      nodes.length = 0
      edges.length = 0
      const density = Math.max(60, Math.floor((w * h) / 42000))
      for (let i = 0; i < density; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r: Math.random() * 2 + 0.8,
        })
      }
      // Precompute neighbor edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.random() < 0.03) edges.push([i, j])
        }
      }
    }

    const gradientStroke = (alpha1=0.35, alpha2=0.18) => {
      const g = ctx.createLinearGradient(0, 0, w, h)
      g.addColorStop(0, `rgba(124,58,237,${alpha1})`)
      g.addColorStop(0.5, `rgba(6,182,212,${alpha2})`)
      g.addColorStop(1, `rgba(245,158,11,${alpha2*0.8})`)
      return g
    }

    let raf
    let last = performance.now()

    const step = (now) => {
      const dt = Math.min(0.033, (now - last) / 1000)
      last = now
      ctx.clearRect(0, 0, w, h)

      // soft background glow
      const bgGrad = ctx.createRadialGradient(w*0.5,h*0.55,10, w*0.5,h*0.55, Math.max(w,h)*0.7)
      bgGrad.addColorStop(0, 'rgba(6,182,212,0.06)')
      bgGrad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0,0,w,h)

      // update nodes
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }

      // draw edges with pulse
      const pulse = (Math.sin(now/1000)*0.5+0.5)
      ctx.lineWidth = 1.2
      ctx.strokeStyle = gradientStroke(0.28+0.1*pulse, 0.12+0.05*pulse)
      ctx.shadowColor = 'rgba(6,182,212,0.25)'
      ctx.shadowBlur = 12
      ctx.beginPath()
      for (const [i,j] of edges) {
        const a = nodes[i], b = nodes[j]
        const dx = a.x-b.x, dy=a.y-b.y
        const dist2 = dx*dx+dy*dy
        if (dist2 < 240*240) {
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
        }
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      // draw nodes
      for (const n of nodes) {
        const r = n.r + 0.5*Math.sin((now/600)+(n.x+n.y)*0.01)
        const grad = ctx.createRadialGradient(n.x,n.y,0, n.x,n.y, r*3)
        grad.addColorStop(0, 'rgba(255,255,255,0.75)')
        grad.addColorStop(1, 'rgba(6,182,212,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI*2)
        ctx.fill()
      }

      raf = requestAnimationFrame(step)
    }

    const onResize = () => init()
    init()
    raf = requestAnimationFrame(step)
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0" />
}

function SilhouetteMorph() {
  // Abstract human silhouettes via path morph between net-like shape and grouped silhouettes
  const variants = {
    net: {
      d: 'M50 200 C 220 40, 420 360, 620 180 C 780 60, 920 300, 1120 220 C 1360 80, 1600 400, 1820 200',
    },
    silhouettes: {
      d: 'M180 520 C200 380, 260 360, 300 520 C320 600, 220 640, 180 520 Z M540 520 C560 380, 620 360, 660 520 C680 600, 580 640, 540 520 Z M900 520 C920 380, 980 360, 1020 520 C1040 600, 940 640, 900 520 Z M1260 520 C1280 380, 1340 360, 1380 520 C1400 600, 1300 640, 1260 520 Z',
    }
  }

  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="silg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          initial={{ d: variants.net.d, opacity: 0.8 }}
          animate={{ d: variants.silhouettes.d, opacity: 0.85 }}
          transition={{ duration: 6, ease: [0.22,0.61,0.36,1], repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
          fill="url(#silg)"
          filter="url(#glow)"
          opacity="0.5"
        />
        {/* subtle highlight stroke */}
        <motion.path
          initial={{ d: variants.net.d, pathLength: 0 }}
          animate={{ d: variants.silhouettes.d, pathLength: 1 }}
          transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
          fill="none"
          stroke="url(#silg)"
          strokeOpacity="0.9"
          strokeWidth="1.2"
          strokeDasharray="4 10"
        />
      </svg>
    </div>
  )
}
