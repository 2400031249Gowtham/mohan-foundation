'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Image from 'next/image';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ── THREE.JS HERO PARTICLES ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0); // Explicitly ensure canvas is fully transparent
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particleCount = 150;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      const t = Math.random();
      if (t < 0.4) {
        colors[i] = 0.78; colors[i + 1] = 0.19; colors[i + 2] = 0.22; // red
      } else if (t < 0.7) {
        colors[i] = 0.10; colors[i + 1] = 0.18; colors[i + 2] = 0.37; // navy
      } else {
        colors[i] = 0.83; colors[i + 1] = 0.63; colors[i + 2] = 0.09; // gold
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.NormalBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 5;

    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      const posArray = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < posArray.length; i += 3) {
        posArray[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.002;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // ── CAROUSEL INTERVAL REMOVED ──

  // ── HERO GSAP ANIMATIONS ──
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const ctx = gsap.context(() => {
      timer = setTimeout(() => {
        // Safe check for elements before animating to prevent GSAP warnings
        if (!document.querySelector('.hero-tag')) return;
        
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.hero-tag', { y: 30, opacity: 0, duration: 0.6 })
          .from('#hl1, .line1', { y: 60, opacity: 0, duration: 0.5 }, '-=0.3')
          .from('#hl2, .line2', { y: 60, opacity: 0, duration: 0.5 }, '-=0.3')
          .from('#hl3, .line3', { y: 60, opacity: 0, duration: 0.5 }, '-=0.3')
          .from('#hl4, .line4', { y: 60, opacity: 0, duration: 0.5 }, '-=0.3')
          .from('.hero-sub', { y: 30, opacity: 0, duration: 0.5 }, '-=0.3')
          .from('.hstat', { y: 20, opacity: 0, stagger: 0.1, duration: 0.4 }, '-=0.2')
          .from('.hero-right', { scale: 0.95, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
          .from('.scroll-cue', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3');
      }, 300);
    });

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // ── ANIMATED COUNTERS ──
  useEffect(() => {
    const animateCounter = (el: HTMLElement, target: number, suffix = '', isRaw = false) => {
      const duration = 2000;
      const start = performance.now();

      function update(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = Math.round(target * eased);

        if (isRaw) {
          el.textContent = current.toString();
        } else if (target >= 1000) {
          el.textContent = (current / 1000).toFixed(current >= 10000 ? 0 : 1).replace('.0', '') + 'k+';
        } else {
          el.textContent = current + suffix;
        }

        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-count]').forEach(counterEl => {
            const counter = counterEl as HTMLElement;
            if (counter.dataset.animated) return;
            counter.dataset.animated = 'true';
            animateCounter(
              counter,
              parseInt(counter.dataset.count || '0'),
              counter.dataset.suffix || '',
              counter.dataset.raw === 'true'
            );
          });
        }
      });
    }, { threshold: 0.3 });

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // ── PARALLAX on scroll ──
  useEffect(() => {
    const handleScroll = () => {
      const grid = document.querySelector('.hero-bg-grid') as HTMLElement;
      if (grid) grid.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero">
      <canvas id="hero-canvas" ref={canvasRef}></canvas>
      <div className="hero-bg-grid"></div>
      <div className="hero-inner">
        <h1 className="hero-h1" style={{ gridArea: 'h1' }}>
          <span className="line1" id="hl1">Save Lives</span><br />
          <span className="line2" id="hl2">With Knowledge</span><br />
          <span className="line3" id="hl3">Not Just</span><br />
          <span className="line4" id="hl4">Intention.</span>
        </h1>
        <p className="hero-sub" style={{ gridArea: 'sub' }}>MOHAN Foundation — India's pioneer in organ donation education since 1997. CPD-accredited courses in Transplant Coordination, Brainstem Death, and beyond.</p>
        <div className="hero-visual" style={{ gridArea: 'visual' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(280px,80%,450px)] aspect-square bg-[#C8303A] rounded-full blur-[120px] opacity-[0.25] pointer-events-none z-0 mix-blend-multiply"></div>
          <div className="relative lg:absolute lg:top-1/2 lg:left-[55%] lg:-translate-x-1/2 lg:-translate-y-1/2 w-full aspect-square flex items-center justify-center pointer-events-none z-10 mx-auto max-w-[500px]">
            <motion.div 
               className="absolute inset-0 opacity-[0.04]"
               animate={{ x: [0, -100, 0] }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               style={{
                 backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, var(--navy) 40px, var(--navy) 42px), repeating-linear-gradient(135deg, transparent, transparent 20px, var(--red) 20px, var(--red) 21px)',
                 backgroundSize: '120px 120px',
                 maskImage: 'radial-gradient(circle at center, black, transparent 70%)',
                 WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 70%)'
               }}
            />
            <motion.div 
              className="absolute w-[clamp(250px,65vw,320px)] aspect-square rounded-full border-[1.5px] border-mf-navy/20"
              animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: [0, 0, 0.2, 1] }}
            />
            <motion.div 
              className="absolute w-[clamp(320px,85vw,440px)] aspect-square rounded-full border-[1.5px] border-mf-red/15"
              animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
              transition={{ duration: 4, delay: 2, repeat: Infinity, ease: [0, 0, 0.2, 1] }}
            />
            {isMounted && Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full bg-mf-navy"
                initial={{ 
                  x: (Math.random() - 0.5) * 600, 
                  y: (Math.random() - 0.5) * 600,
                  opacity: Math.random() * 0.1
                }}
                animate={{
                  y: [null, (Math.random() - 0.5) * 600 - 100],
                  opacity: [null, 0]
                }}
                transition={{
                  duration: 6 + Math.random() * 6,
                  repeat: Infinity,
                  ease: [0, 0, 1, 1]
                }}
              />
            ))}
            <motion.div
              animate={{ scale: [1, 1.05, 1], y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
              className="relative z-10 w-full h-full"
              style={{
                /* Extremely aggressive edge masking */
                maskImage: 'radial-gradient(ellipse at 45% 50%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at 45% 50%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 70%)'
              }}
            >
              <Image 
                src="/images/master.png" 
                alt="Prosthetic robotic hand holding anatomical heart" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="hero-scroll scroll-cue">
        <span>SCROLL</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --red: #C8303A;
          --red2: #E04050;
          --navy: #1A2F5E;
          --navy2: #2A4580;
          --cream: #FDF8F3;
          --blush: #F7E8E8;
          --gold: #D4A017;
          --dark: #1A1A2E;
          --mid: #4A5568;
          --light: #718096;
        }

        /* ── SPIN ANIMATIONS ── */
        @keyframes spin-cw{0%{transform:translate(-50%,-50%) rotate(0deg)}100%{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes spin-ccw{0%{transform:translate(-50%,-50%) rotate(0deg)}100%{transform:translate(-50%,-50%) rotate(-360deg)}}

        /* ── THREE.JS CANVAS ── */
        #hero-canvas{position:absolute;inset:0;z-index:0;pointer-events:none}

        /* ── HERO MOBILE FIRST STYLES ── */
        #hero { min-height: auto; padding-block: clamp(80px, 12vw, 100px) clamp(30px, 6vw, 60px); display: flex; flex-direction: column; background: #FDF8F3; position: relative; overflow: hidden; }
        .hero-bg-grid { position: absolute; inset: 0; opacity: .18; background-image: radial-gradient(var(--red) 1px, transparent 1px); background-size: 44px 44px; pointer-events: none; z-index: 1; }
        
        .hero-inner { max-width: 1440px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 64px); display: flex; flex-direction: column; align-items: center; gap: 24px; position: relative; z-index: 2; width: 100%; text-align: center; }
        
        .hero-h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 10vw, 3.5rem); font-weight: 900; line-height: 0.95; }
        .hero-h1 .line1 { color: var(--dark); }
        .hero-h1 .line2 { background: linear-gradient(135deg, var(--red), var(--gold)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-style: italic; }
        .hero-h1 .line3 { color: var(--navy); }
        .hero-h1 .line4 { background: linear-gradient(135deg, var(--navy), var(--red)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        
        .hero-sub { color: var(--mid); font-size: clamp(0.95rem, 3vw, 1.05rem); line-height: 1.6; max-width: 480px; margin: 0 auto; }
        
        .hero-visual { position: relative; display: flex; align-items: center; justify-content: center; width: 100%; height: auto; padding: 2rem 0; margin: 0 auto; }
        
        .hero-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: clamp(0.5rem, 2vw, 1rem); width: 100%; max-width: 600px; margin: 0 auto; }
        .hstat { background: rgba(255,255,255,.8); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,.9); border-radius: 14px; padding: .75rem; text-align: center; box-shadow: 0 2px 15px rgba(26,47,94,.06); }
        .hstat-val { font-family: 'Playfair Display', serif; font-weight: 700; color: var(--red); font-size: 1.2rem; }
        .hstat-lbl { font-size: .65rem; color: var(--light); font-weight: 500; margin-top: .15rem; }
        
        .scroll-cue { display: none; }

        /* TABLET (768px - 1023px) */
        @media (min-width: 768px) {
          .hero-inner { gap: 32px; }
          .hero-h1 { font-size: clamp(3.5rem, 6vw, 4.5rem); }
          .hero-visual { padding: 4rem 0; }
        }

        /* DESKTOP (1024px+) */
        @media (min-width: 1024px) {
          #hero { min-height: min(100svh, 1100px); padding-top: 8rem; padding-bottom: 3rem; display: flex; flex-direction: row; }
          
          .hero-inner {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto 1fr auto;
            grid-template-areas: 
              "h1 visual"
              "sub visual"
              "stats visual"
              "scroll scroll";
            gap: 1.5rem 4rem;
            align-items: start;
            text-align: left;
            margin: 0 auto;
          }
          
          .hero-h1, .hero-sub { text-align: left; margin: 0; }
          
          .hero-visual { padding: 0; position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; margin: 0; }
          
          .hero-stats { align-self: end; margin: 0; margin-top: 2rem; max-width: 100%; }
          
          .scroll-cue {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: .5rem;
            color: var(--light);
            position: absolute;
            bottom: clamp(1rem, 3vh, 2rem);
            left: 50%;
            transform: translateX(-50%);
            animation: bounceY 2s ease-in-out infinite;
            margin-top: 0;
            width: auto;
            opacity: 0.6;
          }
          .scroll-cue span { font-size: .7rem; letter-spacing: .2em; font-weight: 600; }
          @keyframes bounceY { 0%, 100% { transform: translateX(-50%) translateY(0) } 50% { transform: translateX(-50%) translateY(-8px) } }
        }
      `}} />
    </section>
  );
}
