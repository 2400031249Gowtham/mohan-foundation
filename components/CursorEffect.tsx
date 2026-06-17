'use client'
import { useEffect, useRef, useState } from 'react'

export default function CursorEffect() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse   = useRef({ x: -200, y: -200 })
  const ring    = useRef({ x: -200, y: -200 })
  const hasMovedRef = useRef(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true)
      return
    }

    const onMove = (e: MouseEvent) => {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true
        if (dotRef.current)  dotRef.current.style.opacity  = '1'
        if (ringRef.current) ringRef.current.style.opacity = '1'
      }
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }

    // Global event delegation for hover effects
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select, [role="button"]')) {
        if (ringRef.current) {
          ringRef.current.style.width = '60px';
          ringRef.current.style.height = '60px';
          ringRef.current.style.borderColor = '#c0392b';
        }
        if (dotRef.current) {
          dotRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
        }
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select, [role="button"]')) {
        if (ringRef.current) {
          ringRef.current.style.width = '40px';
          ringRef.current.style.height = '40px';
          ringRef.current.style.borderColor = 'rgba(200, 48, 58, 0.5)';
        }
        if (dotRef.current) {
          dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        }
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('mouseout', onMouseOut)

    let raf: number
    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed',
        width: '8px',
        height: '8px',
        background: '#c0392b',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%) scale(1)',
        transition: 'transform 0.15s, opacity 0.3s ease',
        opacity: 0,
      }}/>
      <div ref={ringRef} style={{
        position: 'fixed',
        width: '40px',
        height: '40px',
        border: '1.5px solid rgba(200, 48, 58, 0.5)',
        borderRadius: '50%',
        background: 'transparent',
        pointerEvents: 'none',
        zIndex: 9998,
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.2s cubic-bezier(0.23, 1, 0.32, 1), height 0.2s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.2s, opacity 0.3s ease',
        opacity: 0,
      }}/>
    </>
  )
}
