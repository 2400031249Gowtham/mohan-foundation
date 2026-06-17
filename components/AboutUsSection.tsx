'use client';

import React from 'react';
import { Phone, ArrowRight, MessageCircle, Mail } from 'lucide-react';
import Link from 'next/link';
import DnaBackground from './DnaBackground';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const featuresData = [
  { icon: '📖', title: 'Professional Training', desc: 'CPD-accredited courses for healthcare professionals in organ donation and transplantation.', bg: 'bg-[#fee2e2]' },
  { icon: '🌐', title: 'Creating Awareness', desc: 'Creating awareness on organ donation to foster an informed and supportive society and dispel myths.', bg: 'bg-[#d1fae5]' },
  { icon: '💬', title: 'Counselling', desc: 'Supporting grieving families to make informed decisions about organ donation and facilitate ethical organ donation.', bg: 'bg-[#fef3c7]' },
  { icon: '🤝', title: 'Networking', desc: 'Building partnerships with governments, hospitals, policymakers, NGOs, and professional bodies to strengthen organ donation systems.', bg: 'bg-[#e0e7ff]' },
];

function FeatureCard({ icon, title, desc, delay, bg }: { icon: string, title: string, desc: string, delay: number, bg: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={fadeUpVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/60 shadow-xl hover:shadow-2xl hover:-translate-y-[8px] hover:scale-[1.02] transition-all duration-400 group flex flex-col h-full relative z-10"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
      
      {/* Icon */}
      <div className="relative mb-5 w-12 h-12" style={{ transform: "translateZ(30px)" }}>
        <motion.div 
          className={`absolute inset-0 rounded-full ${bg} blur-[8px] opacity-60 group-hover:opacity-100 transition-opacity duration-400`} 
        />
        <motion.div 
          animate={{ y: [0, -4, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className={`relative w-12 h-12 rounded-full ${bg} flex items-center justify-center text-[1.2rem] shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-white/60`}
        >
          {icon}
        </motion.div>
      </div>

      <div className="font-bold text-[0.95rem] text-mf-dark mb-2 group-hover:text-mf-red transition-colors duration-300" style={{ transform: "translateZ(20px)" }}>{title}</div>
      <div className="text-[0.8rem] text-mf-light leading-[1.6]" style={{ transform: "translateZ(10px)" }}>{desc}</div>
    </motion.div>
  );
}

export default function AboutUsSection() {
  return (
    <section id="about" className="py-10 md:py-14 bg-white overflow-hidden relative">
      <DnaBackground className="opacity-[0.04]" />
      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container-fluid"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* LEFT COLUMN: Visual Area */}
          <div className="relative flex flex-col lg:block w-full">
            {/* Main Card with Premium Atmosphere */}
            <div className="group bg-gradient-to-br from-[#0A193D] via-[#112A61] to-[#1C3A7A] rounded-[28px] aspect-[4/3] flex flex-col items-center justify-center relative overflow-hidden shadow-[0_30px_70px_rgba(10,25,61,0.3)] border border-white/10 w-full shrink-0">
              {/* Subtle ambient lighting */}
              <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#F5E1A4]/15 rounded-full blur-[80px] pointer-events-none mix-blend-screen transition-opacity duration-700 group-hover:opacity-100 opacity-70"></div>
              <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#E04050]/20 rounded-full blur-[60px] pointer-events-none mix-blend-screen"></div>

              {/* Organ-inspired Abstract Line Art (Low Opacity) */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0,50 Q 25,20 50,50 T 100,50" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="3 3"/>
                <path d="M 0,70 Q 30,90 60,70 T 100,70" fill="none" stroke="white" strokeWidth="0.3"/>
                <path d="M 20,0 Q 40,40 20,100" fill="none" stroke="white" strokeWidth="0.4"/>
                <path d="M 80,0 Q 60,60 80,100" fill="none" stroke="white" strokeWidth="0.4"/>
              </svg>

              {/* Rings (Kept but refined) */}
              <div className="absolute rounded-full border border-white/5 w-[85%] aspect-square animate-[spin-cw_20s_linear_infinite]"></div>
              <div className="absolute rounded-full border border-white/5 w-[60%] aspect-square animate-[spin-ccw_14s_linear_infinite]"></div>
              
              {/* Floating particles/dots */}
              <div className="absolute w-1.5 h-1.5 bg-white/40 rounded-full top-[30%] left-[25%] animate-pulse"></div>
              <div className="absolute w-2 h-2 bg-mf-red/50 rounded-full bottom-[40%] right-[30%] animate-[bounce_3s_infinite]"></div>
              <div className="absolute w-1 h-1 bg-[#F5E1A4]/60 rounded-full top-[60%] left-[70%] animate-pulse"></div>

              <div className="text-center text-white z-10 relative flex flex-col items-center">
                {/* Floating Enlarge Heart */}
                <div className="text-[4.5rem] drop-shadow-[0_0_20px_rgba(224,64,80,0.6)] animate-[bounce_4s_ease-in-out_infinite] mb-2">❤️</div>
                
                {/* Elegant Typography */}
                <h3 className="font-serif font-bold text-[clamp(1.4rem,2.5vw,1.8rem)] leading-[1.15] tracking-tight mb-2 max-w-[85%] mx-auto">
                  Multi Organ<br/>
                  <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Hope and Advocacy</span><br/>
                  Network
                </h3>
                
                <div className="flex items-center gap-2 opacity-80 mt-2">
                  <div className="h-px w-6 bg-white/30"></div>
                  <span className="text-[0.7rem] sm:text-[0.8rem] uppercase tracking-[0.15em] font-semibold text-[#F5E1A4]">Saving Lives One Pledge at a Time</span>
                  <div className="h-px w-6 bg-white/30"></div>
                </div>
              </div>
            </div>

            <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-4 w-full justify-between items-stretch">
              {/* Est Badge */}
              <div className="lg:absolute lg:-bottom-6 lg:-left-6 bg-gradient-to-br from-[#E04050] to-[#B3202E] text-white rounded-[20px] px-7 py-6 shadow-[0_15px_40px_rgba(200,48,58,0.4)] shrink-0 grow lg:grow-0 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(200,48,58,0.5)] transition-all duration-300 border border-white/20 backdrop-blur-md z-20 group">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-[20px] transition-opacity duration-300 pointer-events-none"></div>
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-1.5 h-10 bg-white/30 rounded-full"></div>
                  <div>
                    <div className="text-[0.7rem] opacity-90 uppercase tracking-[0.1em] font-bold mb-0.5 text-white/90">Serving Since</div>
                    <div className="font-serif text-[2.4rem] font-black leading-none tracking-tight text-white drop-shadow-md">1997</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Content */}
          <div className="w-full flex flex-col items-start">
            <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 bg-mf-red/10 border border-mf-red/20 text-mf-red px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold tracking-[0.08em] mb-3.5">
              ABOUT US
            </motion.div>
            
            <motion.h2 variants={fadeUpVariants} className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold text-mf-dark leading-[1.1] mb-3">
              MOHAN Foundation<br/>
              <span className="bg-gradient-to-br from-mf-red to-mf-gold bg-clip-text text-transparent italic">Empowering Lives.</span>
            </motion.h2>
            
            <motion.p variants={fadeUpVariants} className="text-mf-mid text-[1rem] leading-[1.75] mb-8 max-w-2xl">
              MOHAN (Multi Organ Hope and Advocacy Network) Foundation is a pioneering not-for-profit, non-governmental organization dedicated to creating a supportive ecosystem for deceased organ donation in India. Established in 1997, the Foundation promotes and facilitates ethical organ donation and transplantation.
            </motion.p>

            {/* Feature Grid */}
            <motion.div variants={fadeUpVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 w-full items-stretch" style={{ perspective: 1000 }}>
              {featuresData.map((f, i) => (
                <FeatureCard key={i} {...f} delay={i * 0.15} />
              ))}
            </motion.div>

            {/* Call to Actions - Preserving Links */}
            <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-4">
              <a 
                href="https://www.mohanfoundation.org" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-mf-red hover:bg-mf-red-light text-white px-6 py-3 rounded-full font-bold text-[0.85rem] transition-all shadow-[0_8px_25px_rgba(200,48,58,0.35)] hover:-translate-y-px"
              >
                Discover More →
              </a>
              <a 
                href="https://wa.me/919677202908"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1ebd5a] text-white px-6 py-3 rounded-full font-bold text-[0.85rem] flex items-center gap-2 transition-all shadow-md hover:-translate-y-px"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href="tel:+916374773957" className="bg-mf-navy/10 hover:bg-mf-navy/15 text-mf-navy px-6 py-3 rounded-full font-bold text-[0.85rem] transition-all hover:-translate-y-px flex items-center gap-2">
                <Phone size={14}/> Call Now
              </a>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}