'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const heroSlides = [
  {
    id: 1,
    headline: (
      <>
        <span className="line1">Learn.</span><br />
        <span className="line2">Share.</span><br />
        <span className="line4">Save Lives.</span>
      </>
    ),
    description: "MOHAN Foundation — India's pioneer in organ donation education since 1997. CPD-accredited courses in Transplant Coordination, Brainstem Death, and beyond.",
    image: "/hero/hero1_transparent.png"
  },
  {
    id: 2,
    headline: (
      <>
        <span className="line1">Equip Yourself</span><br />
        <span className="line2">to Excel in</span><br />
        <span className="line3">Transplant</span><br />
        <span className="line4">Coordination.</span>
      </>
    ),
    description: "Learn every aspect of organ donation coordination from donor identification to transplantation workflows.",
    image: "/hero/hero2_transparent.png"
  },
  {
    id: 3,
    headline: (
      <>
        <span className="line1">Master</span><br />
        <span className="line2">Compassionate</span><br />
        <span className="line3">Conversations</span><br />
        <span className="line4">That Matter.</span>
      </>
    ),
    description: "Develop counselling expertise to support donor families with empathy, confidence, and clarity.",
    image: "/hero/hero3_transparent.png"
  },
  {
    id: 4,
    headline: (
      <>
        <span className="line1">From</span><br />
        <span className="line2">Legislation</span><br />
        <span className="line3">to</span><br />
        <span className="line4">Practice.</span>
      </>
    ),
    description: "Navigate the complex medico-legal framework of organ donation under the THO Act and medical ethics.",
    image: "/hero/hero4_transparent.png"
  },
  {
    id: 5,
    headline: (
      <>
        <span className="line1">Brainstem Death</span><br />
        <span className="line2">Identify. Certify.</span><br />
        <span className="line3">Optimise.</span><br />
        <span className="line4">Save More Lives.</span>
      </>
    ),
    description: "Master the sensitive art of grief counseling, helping families make life-saving decisions with compassion.",
    image: "/hero/hero5_transparent.png"
  }
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  // ── THREE.JS HERO PARTICLES ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
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

  // ── HERO GSAP SCROLL CUE ANIMATION ──
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const ctx = gsap.context(() => {
      timer = setTimeout(() => {
        if (!document.querySelector('.scroll-cue')) return;
        gsap.from('.scroll-cue', { opacity: 0, y: 20, duration: 0.5, delay: 0.5 });
      }, 300);
    });

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // ── ANIMATED COUNTERS (Remains Untouched) ──
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

  const slideVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } }
  } as const;

  return (
    <section id="hero">
      <button onClick={prevSlide} className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-mf-navy/20 bg-white/50 backdrop-blur-md flex lg:hidden items-center justify-center hover:bg-mf-navy hover:text-white transition-colors text-mf-navy shadow-lg" aria-label="Previous slide">
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-mf-navy/20 bg-white/50 backdrop-blur-md flex lg:hidden items-center justify-center hover:bg-mf-navy hover:text-white transition-colors text-mf-navy shadow-lg" aria-label="Next slide">
        <ChevronRight size={24} />
      </button>
      <canvas id="hero-canvas" ref={canvasRef}></canvas>
      <div className="hero-bg-grid"></div>
      <div className="hero-inner">
        <button onClick={prevSlide} className="absolute left-2 lg:left-6 xl:-left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-mf-navy/20 bg-white/50 backdrop-blur-md hidden lg:flex items-center justify-center hover:bg-mf-navy hover:text-white transition-colors text-mf-navy shadow-lg" aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-2 lg:right-6 xl:-right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-mf-navy/20 bg-white/50 backdrop-blur-md hidden lg:flex items-center justify-center hover:bg-mf-navy hover:text-white transition-colors text-mf-navy shadow-lg" aria-label="Next slide">
          <ChevronRight size={24} />
        </button>
        
        {/* TEXT CONTENT CONTAINER */}
        <div 
          className="hero-text-container" 
          style={{ gridArea: 'text', display: 'flex', flexDirection: 'column', alignSelf: 'center' }}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentSlide}`}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col gap-3 md:gap-4"
            >
              <h1 className="hero-h1">
                {heroSlides[currentSlide].headline}
              </h1>
              <p className="hero-sub">{heroSlides[currentSlide].description}</p>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center mt-5">
            <div className="flex gap-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-8 bg-mf-red' : 'w-2.5 bg-mf-navy/20 hover:bg-mf-navy/40'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* VISUAL CONTAINER */}
        <div className="hero-visual" style={{ gridArea: 'visual' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(280px,80%,600px)] aspect-square bg-[#C8303A] rounded-full blur-[120px] opacity-[0.25] pointer-events-none z-0 mix-blend-multiply"></div>
          <div className="relative lg:absolute lg:top-1/2 lg:left-[45%] lg:-translate-x-1/2 lg:-translate-y-1/2 w-full aspect-[4/3] lg:aspect-[16/11] flex items-center justify-center pointer-events-none z-10 mx-auto max-w-[800px]">
            
            {/* Background elements removed for minimal aesthetic */}
            {/* Dynamic Sliding Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${currentSlide}`}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 z-10 w-full h-full flex items-center justify-center"
              >
                <Image 
                  src={heroSlides[currentSlide].image} 
                  alt={heroSlides[currentSlide].description} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                  className="object-contain"
                  style={{ 
                    transform: currentSlide === 0 ? 'scale(1.7)' : 
                               currentSlide === 2 ? 'scale(1.25) translateY(-12%)' : 
                               currentSlide === 3 ? 'scale(1.25) translateY(-22%)' : 
                               'scale(1.25)',
                    transformOrigin: (currentSlide === 2 || currentSlide === 3) ? 'top center' : 'center center'
                  }}
                  priority
                  unoptimized
                />
              </motion.div>
            </AnimatePresence>

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
        #hero { min-height: auto; padding-block: clamp(10px, 2vw, 20px) clamp(20px, 4vw, 40px); display: flex; flex-direction: column; background: #FDF8F3; position: relative; overflow: hidden; }
        .hero-bg-grid { position: absolute; inset: 0; opacity: .18; background-image: radial-gradient(var(--red) 1px, transparent 1px); background-size: 44px 44px; pointer-events: none; z-index: 1; }
        
        .hero-inner { max-width: 1400px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 64px); display: flex; flex-direction: column; align-items: center; gap: 16px; position: relative; z-index: 2; width: 100%; text-align: center; }
        
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
          #hero { min-height: min(90svh, 900px); padding-top: 0px; padding-bottom: 2rem; display: flex; flex-direction: row; align-items: center; }
          
          .hero-inner {
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: 1fr auto;
            grid-template-areas: 
              "text visual"
              "scroll scroll";
            gap: 1.5rem 2rem;
            align-items: center;
            text-align: left;
            margin: 0 auto;
          }
          
          .hero-text-container { padding-left: 6%; }
          .hero-h1, .hero-sub { text-align: left; margin: 0; }
          .hero-h1 { max-width: 650px; }
          .hero-sub { max-width: 580px; }
          
          .hero-visual { padding: 0; position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; margin: 0; }
          
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
