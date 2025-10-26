import React from 'react'
import GradientBackground from './components/GradientBackground'
import HeroScene from './components/HeroScene'
import FloatingUI from './components/FloatingUI'
import Tagline from './components/Tagline'

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#060817] text-white antialiased">
      <div className="relative mx-auto max-w-[3840px] w-full px-4 sm:px-6 lg:px-10 py-6">
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
          <GradientBackground />
          <HeroScene />
          <FloatingUI />
          <Tagline />
        </div>
      </div>
    </div>
  )
}
