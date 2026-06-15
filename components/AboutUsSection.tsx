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
  { icon: '🌐', title: 'National Reach', desc: 'Building India-wide awareness and an ethical ecosystem for deceased organ donation since 1997.', bg: 'bg-[#d1fae5]' },
  { icon: '🏅', title: 'CPD Accredited', desc: 'Formal CPD certificates issued post-training to fulfil mandatory and reflective CPD requirements.', bg: 'bg-[#fef3c7]' },
  { icon: '👥', title: 'Community Impact', desc: "Over 12,000+ trained professionals actively contributing to India's transplant ecosystem.", bg: 'bg-[#e0e7ff]' },
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
    <section id="about" className="py-24 bg-white overflow-hidden relative">
      <DnaBackground className="opacity-[0.04]" />
      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container-fluid"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN: Visual Area */}
          <div className="relative flex flex-col lg:block w-full">
            {/* Main Card with Rings */}
            <div className="bg-gradient-to-br from-mf-navy to-mf-navy-light rounded-[28px] aspect-[4/3] flex items-center justify-center relative overflow-hidden shadow-[0_30px_70px_rgba(26,47,94,0.25)] border border-white/10 w-full shrink-0">
              <div className="absolute rounded-full border border-white/10 w-[85%] aspect-square animate-[spin-cw_20s_linear_infinite]"></div>
              <div className="absolute rounded-full border border-white/10 w-[60%] aspect-square animate-[spin-ccw_14s_linear_infinite]"></div>
              <div className="absolute rounded-full border border-white/10 w-[35%] aspect-square animate-[spin-cw_10s_linear_infinite]"></div>
              
              <div className="text-center text-white z-10 relative">
                <div className="text-[4rem] animate-[lhb_2s_ease-in-out_infinite]">❤️</div>
                <div className="font-serif font-bold text-[1.3rem] mt-2 leading-tight">
                  Multi Organ<br/>Harvesting Aid<br/>Network
                </div>
                <div className="text-[0.75rem] opacity-60 mt-2">Saving Lives One Pledge at a Time</div>
              </div>
            </div>

            <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-4 w-full justify-between items-stretch">
              {/* Est Badge */}
              <div className="lg:absolute lg:-bottom-6 lg:-left-6 bg-mf-red text-white rounded-[18px] px-6 py-5 shadow-[0_12px_35px_rgba(200,48,58,0.35)] shrink-0 grow lg:grow-0">
                <div className="font-serif text-[2.2rem] font-black leading-none">1997</div>
                <div className="text-[0.7rem] opacity-80 mt-1">Est. Year</div>
                <div className="text-[0.65rem] opacity-70 mt-0.5">Of Service to Life</div>
              </div>

              {/* Quote Badge */}
              <div className="lg:absolute lg:right-[-1.5rem] lg:top-[40%] lg:-translate-y-1/2 bg-white/90 backdrop-blur-md border border-white/50 rounded-[16px] p-4 w-full lg:w-[max-content] lg:max-w-[min(200px,40vw)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] grow shrink-0 lg:grow-0">
                <div className="text-[2rem] text-mf-red/20 font-serif leading-none mb-1">"</div>
                <div className="text-[0.7rem] text-mf-mid leading-relaxed italic">
                  Our mission is to promote and facilitate ethical organ donation and transplantation, creating a world where no patient dies for want of an organ.
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
              <span className="bg-gradient-to-br from-mf-red to-mf-gold bg-clip-text text-transparent italic">Empowers Lives.</span>
            </motion.h2>
            
            <motion.p variants={fadeUpVariants} className="text-mf-mid text-[1rem] leading-[1.75] mb-3">
              MOHAN Foundation (Multi Organ Harvesting Aid Network) is a not-for-profit NGO established in 1997, dedicated to creating a supportive ecosystem for deceased organ donations in India.
            </motion.p>
            <motion.p variants={fadeUpVariants} className="text-mf-mid text-[1rem] leading-[1.75] mb-7">
              We promote ethical organ donation and transplantation through education, training, and public awareness — <strong className="text-mf-dark font-bold">saving lives one pledge at a time.</strong>
            </motion.p>

            {/* Feature Grid */}
            <motion.div variants={fadeUpVariants} className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-[clamp(1rem,3vw,1.5rem)] mb-8 w-full" style={{ perspective: 1000 }}>
              {featuresData.map((f, i) => (
                <FeatureCard key={i} {...f} delay={i * 0.15} />
              ))}
            </motion.div>

            {/* Call to Actions - Preserving Links */}
            <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-4">
              <Link 
                href="/enquire-us" 
                className="bg-mf-red hover:bg-mf-red-light text-white px-6 py-3 rounded-full font-bold text-[0.85rem] transition-all shadow-[0_8px_25px_rgba(200,48,58,0.35)] hover:-translate-y-px"
              >
                Discover More →
              </Link>
              <a 
                href="https://wa.me/916374773957"
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