'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Infinite3DCarousel from './ui/Infinite3DCarousel';

const testimonials = [
  {
    id: 1,
    image: "/feedback/kriti.jpg",
    name: "MS. KRITI SANCHETI",
    location: "Lawyer, Jivandeep Health Services, Durg, India",
    ratingLabel: "LEGAL ASPECTS OF TRANSPLANTATION COURSE",
    quote: "Being a legal professional, this course provided me an in-depth knowledge regarding different aspects and prospects of organ transplantation.",
    body: "It helped in studying the whole system and the working structure of the committees and organizations involved in it. I now have a comprehensive understanding of the legislative, judicial, and social frameworks surrounding organ donation.",
  },
  {
    id: 2,
    image: "/feedback/jafar.jpg",
    name: "MR. JAFAR ALI K",
    location: "Nursing Officer, AIIMS, Delhi, India",
    ratingLabel: "BRAINSTEM DEATH COURSE",
    quote: "The online Brainstem Death course was very helpful as I work as a nurse transplant coordinator.",
    body: "The modules were simple yet informative and greatly enhanced my knowledge and skills in brainstem death identification — a critical competency in transplant coordination. I highly recommend this course to all nursing professionals in the transplant field.",
  },
  {
    id: 3,
    image: "/feedback/vinoth.jpg",
    name: "MR. VINOTHKUMAR V",
    location: "Medical Social Worker, Bharath Hospital, Chennai",
    ratingLabel: "TRANSPLANT COORDINATION PROFESSIONAL CERTIFICATE",
    quote: "This is an excellent platform for healthcare professionals who wish to contribute meaningfully to the organ transplantation field.",
    body: "The course instilled in me a deep sense of responsibility and compassion. MOHAN Foundation's structured approach to e-learning is truly commendable — it equips professionals with both the knowledge and the motivation to make a real difference in patients' lives.",
  },
];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

export default function TestimonialsSection() {

  const renderTestimonial = (t: typeof testimonials[0], isActive: boolean, isDesktop: boolean) => (
    <div className={`bg-white/80 backdrop-blur-md border border-white rounded-[24px] p-[clamp(1.5rem,3vw,2rem)] shadow-[0_10px_30px_rgba(26,47,94,0.03)] h-full w-full flex flex-col group transition-all duration-500 select-none pointer-events-auto ${isActive ? 'shadow-[0_20px_50px_rgba(26,47,94,0.08)]' : ''}`}>
      <div className="text-[5rem] text-mf-red/5 font-serif leading-none absolute top-4 right-6 pointer-events-none group-hover:text-mf-red/10 transition-colors">"</div>
      <div className="flex items-center gap-0.5 mb-3 text-[#fbbf24] text-[1.1rem]">★★★★★</div>
      <div className="text-[0.65rem] font-bold text-mf-red tracking-[0.1em] mb-4 uppercase">{t.ratingLabel}</div>
      <h3 className="text-mf-dark font-bold text-[1.05rem] mb-3 leading-snug">"{t.quote}"</h3>
      <p className="text-mf-mid text-[0.9rem] leading-[1.7] mb-8 flex-grow pointer-events-none">{t.body}</p>
      <div className="flex items-center gap-4 pt-5 border-t border-black/5 mt-auto">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-mf-red/20 group-hover:border-mf-red transition-colors flex-shrink-0">
          <Image 
            src={t.image} 
            alt={t.name} 
            fill 
            sizes="48px"
            priority={isActive}
            className="object-cover" 
            draggable={false} 
          />
        </div>
        <div>
          <div className="font-bold text-mf-navy text-[0.85rem] mb-0.5">{t.name}</div>
          <div className="text-[0.7rem] text-mf-light leading-snug pr-2">{t.location}</div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="testimonials" className="py-10 md:py-12 bg-mf-cream font-sans overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="text-center container-fluid mb-5 flex flex-col items-center"
      >
        <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 bg-mf-navy/5 border border-mf-navy/10 text-mf-navy px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold tracking-[0.08em] mb-3">
          TESTIMONIALS
        </motion.div>
        <motion.h2 variants={fadeUpVariants} className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] font-bold text-mf-dark leading-[1.1]">
          Trusted by healthcare professionals<br/>
          <span className="bg-gradient-to-br from-mf-red to-mf-gold bg-clip-text text-transparent italic">across India and beyond</span>
        </motion.h2>
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-0">
        <Infinite3DCarousel 
          items={testimonials}
          renderCard={renderTestimonial}
          cardWidthDesktop={400}
          autoPlayInterval={5000}
        />
      </div>
    </section>
  );
}
