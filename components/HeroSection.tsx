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
    const timer = setTimeout(() => {
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

    return () => clearTimeout(timer);
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
        <div className="hero-left" id="heroLeft">
          <div className="hero-tag"><span className="pulse"></span>CPD Accredited Since 2025</div>
          <h1 className="hero-h1">
            <span className="line1" id="hl1">Save Lives</span><br />
            <span className="line2" id="hl2">With Knowledge</span><br />
            <span className="line3" id="hl3">Not Just</span><br />
            <span className="line4" id="hl4">Intention.</span>
          </h1>
          <p className="hero-sub">MOHAN Foundation — India's pioneer in organ donation education since 1997. CPD-accredited courses in Transplant Coordination, Brainstem Death, and beyond.</p>
          <div className="hero-stats" ref={statsRef}>
            <div className="hstat"><div className="hstat-val" data-count="12000">0</div><div className="hstat-lbl">Students Enrolled</div></div>
            <div className="hstat"><div className="hstat-val" data-count="200">0</div><div className="hstat-lbl">Expert Instructors</div></div>
            <div className="hstat"><div className="hstat-val" data-count="98" data-suffix="%">0</div><div className="hstat-lbl">Satisfaction Rate</div></div>
            <div className="hstat"><div className="hstat-val" data-count="1997" data-raw="true">0</div><div className="hstat-lbl">Est. Year</div></div>
          </div>
        </div>
        <div className="hero-right relative flex items-center justify-center">
          {/* Large Radial Glow Behind Heart */}
          <div className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#C8303A] rounded-full blur-[120px] opacity-[0.25] pointer-events-none z-0 mix-blend-multiply"></div>

          {/* Centered and appropriately sized visual container (75% vw position) */}
          <div className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[800px] flex items-center justify-center pointer-events-none z-10">
            {/* DNA Background */}
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

            {/* Concentric Pulse Rings */}
            <motion.div 
              className="absolute w-[320px] h-[320px] rounded-full border-[1.5px] border-mf-navy/20"
              animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div 
              className="absolute w-[440px] h-[440px] rounded-full border-[1.5px] border-mf-red/15"
              animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
              transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "easeOut" }}
            />

            {/* Soft Particle Field (Framer Motion) */}
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
                  ease: "linear"
                }}
              />
            ))}

            {/* Main Visual */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="scroll-cue">
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

        /* ── HERO ── */
        #hero{min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden;padding-top:8rem;padding-bottom:3rem;background:#FDF8F3}
        .hero-bg-grid{position:absolute;inset:0;opacity:.18;background-image:radial-gradient(var(--red) 1px,transparent 1px);background-size:44px 44px;pointer-events:none;z-index:1}
        .hero-inner{max-width:1280px;margin:0 auto;padding:0 2rem;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;position:relative;z-index:2;width:100%}
        .hero-tag{display:inline-flex;align-items:center;gap:.5rem;background:rgba(200,48,58,.08);border:1px solid rgba(200,48,58,.2);color:var(--red);padding:.4rem 1rem;border-radius:999px;font-size:.75rem;font-weight:700;letter-spacing:.07em;margin-bottom:1.5rem}
        .hero-tag .pulse{width:7px;height:7px;background:var(--red);border-radius:50%;animation:pg 2s ease-in-out infinite}
        @keyframes pg{0%,100%{opacity:.5}50%{opacity:1}}
        .hero-h1{font-family:'Playfair Display',serif;font-size:clamp(2.4rem,4.25vw,4.7rem);font-weight:900;line-height:0.95;margin-bottom:1.5rem}
        .hero-h1 .line1{color:var(--dark)}
        .hero-h1 .line2{background:linear-gradient(135deg,var(--red),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-style:italic}
        .hero-h1 .line3{color:var(--navy)}
        .hero-h1 .line4{background:linear-gradient(135deg,var(--navy),var(--red));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .hero-sub{color:var(--mid);font-size:1.05rem;line-height:1.75;max-width:480px;margin-bottom:2rem}
        .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2.5rem}
        .hero-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:.75rem}
        .hstat{background:rgba(255,255,255,.8);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.9);border-radius:14px;padding:.75rem;text-align:center;box-shadow:0 2px 15px rgba(26,47,94,.06)}
        .hstat-val{font-family:'Playfair Display',serif;font-weight:700;color:var(--red);font-size:1.2rem}
        .hstat-lbl{font-size:.65rem;color:var(--light);font-weight:500;margin-top:.15rem}

        /* Carousel styling */
        .hero-right{position:relative;display:flex;align-items:center;justify-content:center;width:100%;height:100%;min-height:500px}
        .hero-carousel-wrapper{position:relative;width:100%;max-width:550px;height:500px;border-radius:24px;overflow:hidden;box-shadow:0 30px 60px rgba(26,47,94,0.15);background:rgba(255,255,255,0.5)}
        .hero-carousel-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 1s ease-in-out}
        .hero-carousel-image.active{opacity:1}
        .hero-carousel-overlay{position:absolute;inset:0;background:linear-gradient(135deg, rgba(26,47,94,0.05), rgba(200,48,58,0.05));pointer-events:none}

        /* Scroll cue */
        .scroll-cue{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:.5rem;color:var(--light);animation:bounceY 2s ease-in-out infinite;z-index:5}
        @keyframes bounceY{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-8px)}}
        .scroll-cue span{font-size:.7rem;letter-spacing:.2em;font-weight:600}

        /* Shared button */
        .btn-primary{background:var(--red);color:#fff;padding:.6rem 1.4rem;border-radius:999px;font-weight:600;font-size:.85rem;text-decoration:none;transition:all .25s;border:none;cursor:pointer}
        .btn-primary:hover{background:var(--red2);box-shadow:0 8px 25px rgba(200,48,58,.35);transform:translateY(-1px)}

        /* ── RESPONSIVE ── */
        @media(max-width:1024px){
          .hero-inner{grid-template-columns:1fr;gap:2.5rem}
          .hero-right{display:none}
        }
        @media(max-width:768px){
          .hero-stats{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:480px){
          .hero-h1{font-size:1.9rem}
          .hero-btns{flex-direction:column}
        }
      `}} />
    </section>
  );
}
