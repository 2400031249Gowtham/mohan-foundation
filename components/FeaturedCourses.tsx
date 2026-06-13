'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { professionalCourses, generalCourses, Course } from '../data/courses';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import Infinite3DCarousel from './ui/Infinite3DCarousel';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const CourseCard = ({ course, isActive, isDesktop }: { course: Course, isActive: boolean, isDesktop: boolean }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const tiltX = useTransform(mouseYSpring, [-0.5, 0.5], [4, -4]);
  const tiltY = useTransform(mouseXSpring, [-0.5, 0.5], [-4, 4]);

  const rotateX = isActive && isDesktop ? tiltX : 0;
  const rotateY = isActive && isDesktop ? tiltY : 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || !isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`bg-white/70 backdrop-blur-md rounded-[20px] border border-white shadow-[0_10px_30px_rgba(26,47,94,0.03)] transition-all duration-500 flex flex-col md:h-[550px] h-[720px] w-full pointer-events-auto select-none ${isActive ? 'hover:shadow-[0_20px_50px_rgba(26,47,94,0.1)] hover:-translate-y-[12px] hover:scale-[1.03]' : ''}`}
    >
      {/* Image Box */}
      <div 
        className="relative md:h-[240px] h-[360px] w-full overflow-hidden bg-[#e2e8f0] rounded-t-[20px] transition-transform duration-500 shrink-0"
        style={{ transform: isActive && isDesktop ? "translateZ(40px)" : "translateZ(0px)", transformStyle: "preserve-3d" }}
      >
        <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md text-mf-navy px-3 py-1.5 rounded-full text-[0.65rem] font-bold shadow-[0_4px_10px_rgba(0,0,0,0.1)] pointer-events-none">
          {course.tag}
        </div>
        <Image 
          src={course.image}
          alt={course.title}
          fill
          priority={isActive}
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mf-navy/80 via-mf-navy/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
      </div>

      {/* Info Box */}
      <div 
        className="p-6 pb-8 flex flex-col flex-grow bg-white/70 backdrop-blur-md rounded-b-[20px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <h3 
          className="font-bold md:text-[1.15rem] text-xl md:leading-[1.3] leading-tight text-mf-dark mb-4 transition-all duration-500 md:line-clamp-2 md:h-14 min-h-[88px] flex items-start pointer-events-none"
          style={{ transform: isActive && isDesktop ? "translateZ(25px)" : "translateZ(0px)" }}
        >
          {course.title}
        </h3>
        
        <div 
          className="flex items-center gap-4 text-[0.75rem] font-medium text-mf-mid mb-4 transition-all duration-500 pointer-events-none"
          style={{ transform: isActive && isDesktop ? "translateZ(15px)" : "translateZ(0px)" }}
        >
          <span className="flex items-center gap-1.5">
            <BookOpen size={14} className="text-mf-red" /> {course.lessons} Lessons
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-mf-red" /> {course.weeks} Week{course.weeks > 1 ? 's' : ''}
          </span>
        </div>

        <div 
          className="flex items-center gap-1 mb-6 transition-all duration-500 pointer-events-none" 
          style={{ transform: isActive && isDesktop ? "translateZ(15px)" : "translateZ(0px)" }}
        >
          <div className="flex gap-0.5 text-[#fbbf24] text-[0.8rem]">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < course.rating ? '★' : '☆'}</span>
            ))}
          </div>
          <span className="text-[0.7rem] text-mf-light ml-1 font-medium">({course.reviews} Reviews)</span>
        </div>

        {/* Bottom Bar */}
        <div 
          className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between transition-all duration-500"
          style={{ transform: isActive && isDesktop ? "translateZ(20px)" : "translateZ(0px)" }}
        >
          <span className="font-serif font-black text-[1.25rem] text-mf-red pointer-events-none">
            {course.price}
          </span>
          <Link 
            href={`/register?course=${course.id}`}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-[0.8rem] font-bold text-mf-navy hover:text-mf-red transition-colors pointer-events-auto relative z-[100]"
          >
            Register <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function FeaturedCourses() {
  const [activeTab, setActiveTab] = useState<'pro' | 'pub'>('pro');
  const activeArray = activeTab === 'pro' ? professionalCourses : generalCourses;

  return (
    <section id="courses" className="py-24 bg-mf-cream relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-mf-navy/[0.03] to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-0 md:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12 flex flex-col items-center px-4"
        >
          <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 bg-mf-navy/5 border border-mf-navy/10 text-mf-navy px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold tracking-[0.08em] mb-4">
            OUR COURSES
          </motion.div>
          <motion.h2 variants={fadeUpVariants} className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] font-bold text-mf-dark leading-[1.1] mb-5">
            Our Featured<br/>
            <span className="bg-gradient-to-br from-mf-red to-mf-gold bg-clip-text text-transparent italic">Courses</span>
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="text-mf-mid text-[1rem] leading-[1.6] max-w-[600px] mx-auto">
            CPD-accredited programs designed for healthcare professionals and the general public — making organ donation knowledge accessible to all.
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="flex justify-center mb-12 px-4"
        >
          <div className="inline-flex bg-white/60 backdrop-blur-md border border-black/5 p-1.5 rounded-[16px] shadow-[0_4px_15px_rgba(26,47,94,0.04)] relative">
            <div 
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-[12px] shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${activeTab === 'pub' ? 'translate-x-[calc(100%+0px)]' : 'translate-x-0'}`}
            />
            <button 
              onClick={() => setActiveTab('pro')}
              className={`relative z-10 px-6 py-2.5 rounded-[12px] text-[0.85rem] font-bold transition-colors ${activeTab === 'pro' ? 'text-mf-red' : 'text-mf-mid hover:text-mf-dark'}`}
            >
              For Professionals
            </button>
            <button 
              onClick={() => setActiveTab('pub')}
              className={`relative z-10 px-6 py-2.5 rounded-[12px] text-[0.85rem] font-bold transition-colors ${activeTab === 'pub' ? 'text-mf-red' : 'text-mf-mid hover:text-mf-dark'}`}
            >
              For General Public
            </button>
          </div>
        </motion.div>

        {/* Carousel Container */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="w-full flex justify-center items-center"
        >
          <Infinite3DCarousel 
            key={activeTab} // remounts when tab changes
            items={activeArray}
            renderCard={(item, isActive, isDesktop) => <CourseCard course={item} isActive={isActive} isDesktop={isDesktop} />}
            cardWidthDesktop={420}
            autoPlayInterval={5500}
          />
        </motion.div>
        
      </div>
    </section>
  );
}
