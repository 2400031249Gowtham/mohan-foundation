'use client'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function HeartAnimation() {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [mounted, setMounted] = useState(false)

  const imgRef = useRef<HTMLImageElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    let frame = 0
    const animate = () => {
      frame++

      // Smooth mouse lerp
      current.current.x += (mouse.current.x - current.current.x) * 0.04
      current.current.y += (mouse.current.y - current.current.y) * 0.04

      // Heartbeat pulse via scale (more subtle since it includes the hand now)
      const beat = 1 + Math.pow(Math.sin(frame * 0.045), 8) * 0.02

      if (imgRef.current) {
        const rotY = current.current.x * 20
        const rotX = current.current.y * -15
        const rotZ = current.current.x * current.current.y * 5

        imgRef.current.style.transform = `
          perspective(900px)
          rotateY(${rotY}deg)
          rotateX(${rotX}deg)
          rotateZ(${rotZ}deg)
          scale(${beat})
        `
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  const particlesA = [...Array(30)].map((_, i) => {
    const angle = (i / 30) * Math.PI
    const rx = 300, ry = 250
    const cx = Math.cos(angle) * rx
    const cy = Math.sin(angle) * -ry
    const size = 3 + Math.random() * 2
    const dur = 4 + Math.random() * 3
    const delay = (i * 0.12) % 5
    return { isRed: true, cx, cy, size, dur, delay }
  })

  const particlesB = [...Array(30)].map((_, i) => {
    const angle = Math.PI + (i / 30) * Math.PI
    const rx = 280, ry = 220
    const cx = Math.cos(angle) * rx
    const cy = Math.sin(angle) * -ry
    const size = 2 + Math.random() * 2
    const dur = 5 + Math.random() * 3
    const delay = (i * 0.12) % 5
    return { isRed: false, cx, cy, size, dur, delay }
  })

  const allParticles = [...particlesA, ...particlesB]

  if (!mounted) return null;

  return (
    <div className="relative flex items-center justify-center w-full h-full">

      {/* Radial glow behind heart — Cinematic Deep Blue/Red */}
      <div className="absolute"
           style={{
             width: '80%', height: '80%',
             borderRadius: '50%',
             background: 'radial-gradient(circle, rgba(220,20,60,0.3) 0%, rgba(10,20,80,0.15) 45%, transparent 70%)',
             top: '50%', left: '50%',
             transform: 'translate(-50%, -50%)',
           }}/>

      {/* Neural Network / Cybernetic Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
           style={{
             background: 'radial-gradient(circle at center, transparent 40%, #060d1f 70%), repeating-linear-gradient(45deg, rgba(30,60,220,0.1) 0px, rgba(30,60,220,0.1) 2px, transparent 2px, transparent 20px), repeating-linear-gradient(-45deg, rgba(220,20,60,0.1) 0px, rgba(220,20,60,0.1) 2px, transparent 2px, transparent 20px)',
             animation: 'spin-slow 60s linear infinite',
           }}/>

      {/* Energy rings */}
      <div className="absolute pointer-events-none"
           style={{
             width: '85%', height: '85%',
             borderRadius: '50%',
             border: '1px solid transparent',
             borderTop: '1px solid rgba(220,20,60,0.6)',
             borderRight: '1px solid rgba(220,20,60,0.2)',
             filter: 'blur(1px)',
             animation: 'spin-slow 8s linear infinite',
             top: '50%', left: '50%',
             transform: 'translate(-50%, -50%)',
           }}/>

      {/* Glowing vessel lines */}
      <div className="pointer-events-none" style={{
        position: 'absolute', width: '2px', height: '35%',
        background: 'linear-gradient(to top, rgba(220,20,60,0.8), transparent)',
        top: '50%', left: '50%', transformOrigin: 'bottom center',
        filter: 'blur(2px)', animation: 'vessel-pulse-1 1.7s ease-in-out infinite',
        borderRadius: '4px',
      }}/>
      <div className="pointer-events-none" style={{
        position: 'absolute', width: '2px', height: '35%',
        background: 'linear-gradient(to top, rgba(30,80,220,0.8), transparent)',
        top: '50%', left: '50%', transformOrigin: 'bottom center',
        filter: 'blur(2px)', animation: 'vessel-pulse-3 1.8s ease-in-out infinite',
        borderRadius: '4px',
      }}/>

      {/* THE ROBOTIC HAND AND HEART IMAGE */}
      {!error ? (
        <motion.img
          ref={imgRef as any}
          src="/images/robotic-hand-heart.png"
          alt="Robotic Prosthetic Hand holding Anatomical Heart"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          initial={{ y: 200, opacity: 0, rotateX: 20 }}
          animate={{ y: 0, opacity: loaded ? 1 : 0, rotateX: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            position: 'relative',
            zIndex: 10,
            mixBlendMode: 'screen', // Pure black bg cut out perfectly
            filter: `
              drop-shadow(0 0 50px rgba(220,20,60,0.5))
              drop-shadow(0 0 80px rgba(10,30,120,0.4))
            `,
            transformStyle: 'preserve-3d',
          }}
        />
      ) : (
        <div ref={imgRef as any} 
             style={{
          width: '75%', height: '75%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, #cc1a1a, #8b0000, #1a237e)',
          filter: 'drop-shadow(0 0 60px rgba(220,20,60,0.9))',
          position: 'relative', zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transformStyle: 'preserve-3d',
        }}>
          <span style={{color: 'white', fontSize: '120px'}}>🫀</span>
        </div>
      )}

      {/* Floating Medical Particles */}
      {allParticles.map((p, i) => (
        <div key={i} className="pointer-events-none" style={{
          position: 'absolute',
          width: p.size, height: p.size,
          borderRadius: '50%',
          backgroundColor: p.isRed ? 'rgba(220,20,60,0.9)' : 'rgba(30,80,220,0.9)',
          boxShadow: p.isRed ? '0 0 6px rgba(220,20,60,1)' : '0 0 6px rgba(30,80,220,1)',
          top: `calc(50% + ${p.cy}px)`,
          left: `calc(50% + ${p.cx}px)`,
          transform: 'translate(-50%, -50%)',
          animation: `orbit ${p.dur}s ${p.delay}s linear infinite ${p.isRed ? 'normal' : 'reverse'}`,
          opacity: 0,
        }}/>
      ))}
    </div>
  )
}
