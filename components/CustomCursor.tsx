'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide on touch devices only
    if ('ontouchstart' in window) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    let animId: number;
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      animId = requestAnimationFrame(animateRing);
    };

    const onEnter = () => {
      ring.style.width = '60px';
      ring.style.height = '60px';
      ring.style.borderColor = '#C8303A';
      dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    };
    const onLeave = () => {
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.borderColor = 'rgba(200, 48, 58, 0.5)';
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    const addHoverListeners = () => {
      const targets = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .ccard, .feat-card, .faq-q, .tab, .faq-tab, .csoc, .fsoc, .nav-link, .mob-link'
      );
      targets.forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
      return targets;
    };

    document.addEventListener('mousemove', onMouseMove);
    animId = requestAnimationFrame(animateRing);

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      addHoverListeners();
    }, 500);

    // Re-attach on route changes
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          width: '8px',
          height: '8px',
          background: '#C8303A',
          borderRadius: '50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.15s ease',
        }}
      />
      <div
        ref={ringRef}
        style={{
          width: '40px',
          height: '40px',
          border: '1.5px solid rgba(200, 48, 58, 0.5)',
          borderRadius: '50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s cubic-bezier(.23,1,.32,1), height 0.2s cubic-bezier(.23,1,.32,1), border-color 0.2s ease',
        }}
      />
    </>
  );
}
