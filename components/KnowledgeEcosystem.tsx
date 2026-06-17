'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, Star, Users, Brain, Activity, Scale, Stethoscope, HeartHandshake, ArrowRight, HeartPulse, X, Wind, Droplet, ShieldPlus, Award, Building, Gift } from 'lucide-react';
import Link from 'next/link';

type Course = {
  id: string;
  category: string;
  shortTitle: string;
  title: string;
  activeClass: string;
  color: string;
  icon: any;
  lessons: string;
  duration: string;
  reviews: string;
  price: string;
  px: number;
  py: number;
  image: string;
  iconUrl: string;
};

import { professionalCourses as professionalCoursesArray, generalCourses as publicCoursesArray } from '@/data/courses';

const uiMetadataPro: Record<string, any> = {
  '3': { category: '#Transplant Coordination', shortTitle: 'Transplant Cert.', activeClass: 'border-[#3b82f6] shadow-[0_0_30px_rgba(59,130,246,0.4)]', color: '#00F0FF', icon: Building, px: 25, py: 20, iconUrl: 'https://img.icons8.com/color/240/hospital.png' },
  '4': { category: '#PG Diploma', shortTitle: 'PG Diploma', activeClass: 'border-[#a855f7] shadow-[0_0_30px_rgba(168,85,247,0.4)]', color: '#B000FF', icon: Award, px: 75, py: 20, iconUrl: 'https://img.icons8.com/color/240/diploma.png' },
  '5': { category: '#Medical Professionals', shortTitle: 'Brainstem Death', activeClass: 'border-[#eab308] shadow-[0_0_30px_rgba(234,179,8,0.4)]', color: '#FFEA00', icon: Brain, px: 15, py: 50, iconUrl: 'https://img.icons8.com/color/240/brain.png' },
  '6': { category: '#Medical Professionals', shortTitle: 'Medical Course', activeClass: 'border-[#10b981] shadow-[0_0_30px_rgba(16,185,129,0.4)]', color: '#10b981', icon: Stethoscope, px: 85, py: 50, iconUrl: 'https://img.icons8.com/color/240/stethoscope.png' },
  '7': { category: '#Paramedical', shortTitle: 'Paramedical', activeClass: 'border-[#06b6d4] shadow-[0_0_30px_rgba(6,182,212,0.4)]', color: '#06b6d4', icon: Activity, px: 25, py: 80, iconUrl: 'https://img.icons8.com/color/240/ambulance.png' },
  '2': { category: '#Legal Aspects', shortTitle: 'Legal Laws', activeClass: 'border-[#f43f5e] shadow-[0_0_30px_rgba(244,63,94,0.4)]', color: '#f43f5e', icon: Scale, px: 75, py: 80, iconUrl: 'https://img.icons8.com/color/240/law.png' }
};

const professionalCourses: Record<string, Course> = {};
professionalCoursesArray.forEach(c => {
  if (uiMetadataPro[c.id]) {
    professionalCourses[c.id] = { ...c, ...uiMetadataPro[c.id], lessons: `${c.lessons} Lessons`, reviews: `${c.reviews} Reviews` } as Course;
  }
});

const uiMetadataPub: Record<string, any> = {
  '9': { category: '#Organ Donation', shortTitle: 'Gift of Life', activeClass: 'border-[#3b82f6] shadow-[0_0_30px_rgba(59,130,246,0.4)]', color: '#00F0FF', icon: Gift, px: 25, py: 20, iconUrl: 'https://img.icons8.com/color/240/gift.png' },
  '13': { category: '#Hindi', shortTitle: 'Organ Donation', activeClass: 'border-[#a855f7] shadow-[0_0_30px_rgba(168,85,247,0.4)]', color: '#B000FF', icon: HeartHandshake, px: 15, py: 50, iconUrl: 'https://img.icons8.com/color/240/volunteering.png' },
  '10': { category: '#Health & Wellness', shortTitle: 'Kidneys', activeClass: 'border-[#eab308] shadow-[0_0_30px_rgba(234,179,8,0.4)]', color: '#FFEA00', icon: Droplet, px: 25, py: 80, iconUrl: 'https://img.icons8.com/color/240/kidney.png' },
  '11': { category: '#Health & Wellness', shortTitle: 'Liver', activeClass: 'border-[#10b981] shadow-[0_0_30px_rgba(16,185,129,0.4)]', color: '#10b981', icon: ShieldPlus, px: 75, py: 20, iconUrl: 'https://img.icons8.com/color/240/liver.png' },
  '12': { category: '#Health & Wellness', shortTitle: 'Lungs', activeClass: 'border-[#06b6d4] shadow-[0_0_30px_rgba(6,182,212,0.4)]', color: '#06b6d4', icon: Wind, px: 75, py: 80, iconUrl: 'https://img.icons8.com/color/240/lungs.png' }
};

const publicCourses: Record<string, Course> = {};
publicCoursesArray.forEach(c => {
  if (uiMetadataPub[c.id]) {
    publicCourses[c.id] = { ...c, ...uiMetadataPub[c.id], lessons: `${c.lessons} Lessons`, reviews: `${c.reviews} Reviews` } as Course;
  }
});

const AbstractLifeCore = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-visible">
    <style>{`
      @keyframes slowSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes reverseSpin {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
      }
      @keyframes heartbeatPulse {
        0% { transform: scale(0.95); opacity: 0.8; filter: drop-shadow(0 0 15px rgba(232,59,143,0.5)); }
        15% { transform: scale(1.15); opacity: 1; filter: drop-shadow(0 0 35px rgba(232,59,143,0.9)); }
        30% { transform: scale(0.95); opacity: 0.8; filter: drop-shadow(0 0 15px rgba(232,59,143,0.5)); }
        45% { transform: scale(1.05); opacity: 0.9; filter: drop-shadow(0 0 25px rgba(232,59,143,0.7)); }
        100% { transform: scale(0.95); opacity: 0.8; filter: drop-shadow(0 0 15px rgba(232,59,143,0.5)); }
      }
      @keyframes floatParticle {
        0% { transform: translateY(0px) scale(1); opacity: 0.2; }
        50% { transform: translateY(-20px) scale(1.5); opacity: 1; filter: drop-shadow(0 0 10px #00F0FF); }
        100% { transform: translateY(0px) scale(1); opacity: 0.2; }
      }
      @keyframes brainElectrify {
        0%, 100% { filter: drop-shadow(0 0 15px rgba(0,240,255,0.6)) brightness(1); }
        5%, 7% { filter: drop-shadow(0 0 40px rgba(0,240,255,1)) drop-shadow(0 0 15px #FFF) brightness(1.4) contrast(1.2); }
        6% { filter: drop-shadow(0 0 10px rgba(232,59,143,0.8)) brightness(0.9); }
        45%, 47% { filter: drop-shadow(0 0 40px rgba(232,59,143,1)) drop-shadow(0 0 15px #FFF) brightness(1.5) contrast(1.2); }
        46% { filter: drop-shadow(0 0 10px rgba(0,240,255,0.8)) brightness(0.8); }
      }
      @keyframes electrifyFlash {
        0%, 100% { opacity: 0; transform: scale(0.9); }
        5%, 7% { opacity: 0.6; transform: scale(1.1) rotate(5deg); background: #00F0FF; }
        6% { opacity: 0.1; transform: scale(1); }
        45%, 47% { opacity: 0.6; transform: scale(1.15) rotate(-5deg); background: #E83B8F; }
        46% { opacity: 0.1; transform: scale(1); }
      }
    `}</style>
    
    {/* Central Biomorphic Core: Realistic Brain floating perfectly with no background */}
    {/* Central Biomorphic Core: Realistic Brain floating perfectly with no background */}
    <div className="relative w-[180%] h-[180%] md:w-[220%] md:h-[220%] flex items-center justify-center z-10 transition-transform duration-700 hover:scale-105 mix-blend-multiply">
      <img 
        src="/courses-1/BrainCourse-2.jpg" 
        alt="Knowledge Core"
        className="w-full h-full object-contain"
        style={{ filter: 'brightness(1.15) contrast(1.2) saturate(1.1)' }}
      />
    </div>
  </div>
);

export default function KnowledgeEcosystem() {
  const [schema, setSchema] = useState<'professionals' | 'public'>('professionals');
  const [activeCourseId, setActiveCourseId] = useState<string>('3');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentCoursesData = schema === 'professionals' ? professionalCourses : publicCourses;
  // Fallback to the first course if activeCourseId is not found in the current schema
  const activeCourse = currentCoursesData[activeCourseId as keyof typeof currentCoursesData] 
    || Object.values(currentCoursesData)[0];

  React.useEffect(() => {
    fetch('/api/copy-heart')
      .then(r => r.json())
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    // Only run on client and if modal is open on mobile/tablet
    if (isModalOpen && typeof window !== 'undefined' && window.innerWidth < 1024) {
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      document.body.classList.add("modal-open");
      document.documentElement.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
      const scrollY = document.body.style.top;
      document.body.style.top = "";
      if (scrollY) {
        // Timeout ensures DOM has painted before scrolling
        setTimeout(() => {
          window.scrollTo(0, parseInt(scrollY || "0") * -1);
        }, 0);
      }
    }
    return () => {
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
      document.body.style.top = "";
    };
  }, [isModalOpen]);

  const handleCourseClick = (id: string) => {
    setActiveCourseId(id);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsModalOpen(true);
    }
  };

  const handleSchemaToggle = (newSchema: 'professionals' | 'public') => {
    setSchema(newSchema);
    setIsModalOpen(false);
    if (newSchema === 'professionals') {
      setActiveCourseId('3');
    } else {
      setActiveCourseId('9');
    }
  };

  return (
    <section id="ecosystem" className="relative w-full overflow-hidden bg-[#FDFBF7] py-8 lg:py-12">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="absolute w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pinkGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="#E83B8F" />
              <path d="M20 18 L20 22 M18 20 L22 20" stroke="#E83B8F" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pinkGrid)" />
        </svg>
      </div>

      {/* HEADER SECTION (from Screenshot) */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 pt-6 pb-2 max-w-4xl mx-auto">
        {/* Top Pill */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#E2E8F0] bg-white text-[#1E3A8A] text-[11px] font-bold tracking-widest uppercase mb-5 shadow-sm">
          Our Courses
        </div>
        
        {/* Title */}
        <h1 className="text-4xl lg:text-[3.5rem] font-serif font-bold text-slate-900 leading-tight mb-3">
          Our Featured <br />
          <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-[#E83B8F] via-[#D63B45] to-[#F59E0B]">
            Courses
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="max-w-2xl text-[1.05rem] text-slate-600 font-medium leading-relaxed mb-5">
          CPD-accredited programs designed for healthcare professionals and the general public — making organ donation knowledge accessible to all.
        </p>

        {/* Toggle Container */}
        <div className="flex items-center bg-[#F8FAFC] border border-slate-200 rounded-full p-1.5 shadow-sm">
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSchemaToggle('professionals');
            }}
            className={`px-8 py-3 rounded-full text-[0.95rem] transition-all duration-300 font-bold ${
              schema === 'professionals' 
              ? 'bg-white text-[#D63B45] shadow-[0_4px_10px_rgba(0,0,0,0.05)]' 
              : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            For Professionals
          </button>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSchemaToggle('public');
            }}
            className={`px-8 py-3 rounded-full text-[0.95rem] transition-all duration-300 font-bold ${
              schema === 'public' 
              ? 'bg-white text-[#D63B45] shadow-[0_4px_10px_rgba(0,0,0,0.05)]' 
              : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            For General Public
          </button>
        </div>
      </div>

      <main className="container mx-auto px-4 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4 z-10">
        
        {/* LEFT SECTION (Orbital Diagram) */}
        <div className="w-full lg:w-2/3 relative flex flex-col items-center justify-center min-h-[500px] lg:min-h-[600px] lg:-ml-4">
          
          {/* Red Wavy Connecting Strings */}
          <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            <style>
              {`
                @keyframes flow-red {
                  0% { stroke-dashoffset: 20; }
                  100% { stroke-dashoffset: 0; }
                }
                .wavy-line {
                  fill: none;
                  stroke: rgba(239, 68, 68, 0.4);
                  stroke-width: 0.3;
                  stroke-dasharray: 2, 2;
                  animation: flow-red 1s linear infinite;
                }
              `}
            </style>
            
            {Object.values(currentCoursesData).map((course, i) => {
              const isLeft = course.px < 50;
              const startX = isLeft ? 42 : 58;
              const cx1 = startX + (course.px - startX) * 0.5;
              const cy1 = 50;
              const cx2 = startX + (course.px - startX) * 0.5;
              const cy2 = course.py;
              
              const pathData = `M ${startX} 50 C ${cx1} ${cy1}, ${cx2} ${cy2}, ${course.px} ${course.py}`;

              return (
                <path key={`${schema}-${course.id}`} className="wavy-line" d={pathData} />
              );
            })}
          </svg>

          {/* Central Hub */}
          <motion.div 
            className="absolute top-1/2 left-1/2 z-10 flex flex-col items-center justify-center pointer-events-none"
            animate={{ 
              y: ["-50%", "-52%", "-50%"],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
            style={{ x: "-50%", y: "-50%" }}
          >
            
            {schema === 'professionals' ? (
              <div className="relative w-[180px] h-[180px] lg:w-[220px] lg:h-[220px] flex items-center justify-center z-10 mix-blend-multiply">
                <img 
                  src="/images/heart-render-white.png" 
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://i.postimg.cc/7LTB6wWw/image-0.png" }}
                  alt="Professional Hub" 
                  className="w-full h-full object-contain mix-blend-multiply" 
                />
              </div>
            ) : (
              <div className="relative w-[200px] h-[200px] lg:w-[260px] lg:h-[260px] flex items-center justify-center z-10 overflow-visible">
                <AbstractLifeCore />
              </div>
            )}
          </motion.div>

          {/* 6 Orbital Nodes */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={schema}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full absolute inset-0 z-20 pointer-events-none"
            >
              {Object.values(currentCoursesData).map((course, index) => {
                const isActive = activeCourse.id === course.id;
                
                return (
                  <div 
                    key={course.id}
                    className="absolute z-20 pointer-events-none"
                    style={{ 
                      left: `${course.px}%`, 
                      top: `${course.py}%`, 
                      transform: 'translate(-50%, -50%)' 
                    }}
                  >
                    <motion.div
                      onClick={() => handleCourseClick(course.id)} 
                      className="flex flex-col items-center group cursor-pointer pointer-events-auto"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: index * 0.5 }}
                    >
                      <div className={`relative w-16 h-16 md:w-[76px] md:h-[76px] rounded-full border-[3px] flex items-center justify-center transition-all duration-500 group-hover:scale-[1.25] group-hover:-translate-y-2 group-hover:z-30 group-hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] overflow-hidden bg-white/95 backdrop-blur-sm ${isActive ? course.activeClass : 'border-slate-100 shadow-md'}`}>
                        <img 
                          src={course.iconUrl.replace('color/240', 'fluency/240')}
                          alt={course.shortTitle}
                          className={`w-[42px] h-[42px] md:w-[48px] md:h-[48px] object-contain transition-all duration-700 group-hover:scale-110 ${isActive ? '' : 'opacity-80 grayscale-[20%] group-hover:grayscale-0 group-hover:opacity-100'}`}
                          style={{ filter: isActive ? `drop-shadow(0px 8px 16px ${course.color}80)` : 'none' }}
                          onError={(e) => { 
                            if (e.currentTarget.src.includes('fluency')) {
                              e.currentTarget.src = course.iconUrl;
                            }
                          }}
                        />
                        {!isActive && (
                          <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                        )}
                      </div>
                      <span className={`mt-3 text-sm font-bold text-center whitespace-nowrap bg-white/90 px-3 py-1 rounded-full backdrop-blur-md shadow-sm border border-slate-100/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:-translate-y-1 ${isActive ? 'text-[#D63B45]' : 'text-slate-800'}`}>
                        {course.shortTitle}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT SECTION (Course Card - Desktop Only) */}
        <div className="hidden lg:flex w-full lg:w-1/3 justify-center z-30 pb-12 lg:pb-0 relative mt-[400px] lg:mt-0">
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCourse.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm lg:max-w-[400px] bg-white rounded-[24px] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden"
            >
              
              {/* Course Banner Image with Floating Category Text */}
              <div className="relative w-full h-[200px] bg-slate-100">
                <img 
                  src={activeCourse.image} 
                  alt={activeCourse.title} 
                  className="w-full h-full object-cover opacity-90 transition-opacity duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[11px] font-black text-slate-800 shadow-sm">
                  {activeCourse.category}
                </div>
              </div>

              <div className="p-6 pt-6 flex flex-col flex-grow">
                <h2 className="text-xl lg:text-[1.4rem] font-serif font-bold mb-4 leading-snug text-slate-900">
                  {activeCourse.title}
                </h2>

                <div className="flex items-center space-x-6 mb-4 text-slate-600 font-medium">
                  <div className="flex items-center">
                    <BookOpen className="text-[#D63B45] mr-2 w-[18px] h-[18px]" />
                    <span className="text-[0.95rem]">{activeCourse.lessons}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="text-[#D63B45] mr-2 w-[18px] h-[18px]" />
                    <span className="text-[0.95rem]">{activeCourse.duration}</span>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <div className="flex text-amber-400 mr-2">
                    <Star className="w-[14px] h-[14px]" fill="currentColor" />
                    <Star className="w-[14px] h-[14px]" fill="currentColor" />
                    <Star className="w-[14px] h-[14px]" fill="currentColor" />
                    <Star className="w-[14px] h-[14px]" fill="currentColor" />
                    <Star className="w-[14px] h-[14px]" fill="currentColor" />
                  </div>
                  <span className="text-[0.85rem] text-slate-500 font-medium">({activeCourse.reviews})</span>
                </div>

                <div className="w-full h-[1px] bg-slate-100 mb-6 mt-auto"></div>

                <div className="flex items-center justify-between mt-6">
                  <span className="text-[1.3rem] font-bold text-[#D63B45] font-serif">{activeCourse.price}</span>
                  <Link href={`/courses/${activeCourse.id}`} className="flex items-center gap-2 text-[0.95rem] font-bold text-[#1e3a8a] hover:text-[#D63B45] transition-colors group">
                    Register
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </main>
      {/* MOBILE / TABLET MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:hidden pointer-events-auto">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Modal Content */}
            <motion.div
              className="relative w-[92vw] md:w-[80vw] max-w-2xl max-h-[90vh] bg-white rounded-[24px] shadow-2xl overflow-hidden pointer-events-auto z-10 flex flex-col"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100) setIsModalOpen(false);
              }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white backdrop-blur-md transition-colors"
              >
                <X size={18} />
              </button>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeCourse.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col w-full h-full overflow-y-auto overflow-x-hidden"
                >
                  {/* Course Banner Image with Floating Category Text */}
                  <div className="relative w-full h-[200px] bg-slate-100 flex-shrink-0">
                    <img 
                      src={activeCourse.image} 
                      alt={activeCourse.title} 
                      className="w-full h-full object-contain opacity-90 transition-opacity duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[11px] font-black text-slate-800 shadow-sm z-10">
                      {activeCourse.category}
                    </div>
                  </div>

                  <div className="p-6 md:p-8 pt-6 flex flex-col flex-grow">
                    <h2 className="text-xl md:text-[1.3rem] font-serif font-bold mb-4 md:mb-6 leading-snug text-slate-900">
                      {activeCourse.title}
                    </h2>

                    <div className="flex items-center space-x-6 mb-4 md:mb-5 text-slate-600 font-medium">
                      <div className="flex items-center">
                        <BookOpen className="text-[#D63B45] mr-2 w-[16px] h-[16px] md:w-[18px] md:h-[18px]" />
                        <span className="text-[0.9rem] md:text-[0.95rem]">{activeCourse.lessons}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="text-[#D63B45] mr-2 w-[16px] h-[16px] md:w-[18px] md:h-[18px]" />
                        <span className="text-[0.9rem] md:text-[0.95rem]">{activeCourse.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center mb-5 md:mb-6">
                      <div className="flex text-amber-400 mr-2">
                        <Star className="w-[14px] h-[14px]" fill="currentColor" />
                        <Star className="w-[14px] h-[14px]" fill="currentColor" />
                        <Star className="w-[14px] h-[14px]" fill="currentColor" />
                        <Star className="w-[14px] h-[14px]" fill="currentColor" />
                        <Star className="w-[14px] h-[14px]" fill="currentColor" />
                      </div>
                      <span className="text-[0.85rem] text-slate-500 font-medium">({activeCourse.reviews})</span>
                    </div>

                    <div className="w-full h-[1px] bg-slate-100 mb-5 md:mb-6 mt-auto"></div>

                    <div className="flex items-center justify-between">
                      <span className="text-[1.2rem] md:text-[1.3rem] font-bold text-[#D63B45] font-serif">{activeCourse.price}</span>
                      <Link href={`/courses/${activeCourse.id}`} className="flex items-center gap-2 text-[0.95rem] font-bold text-[#1e3a8a] hover:text-[#D63B45] transition-colors group px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200">
                        Register
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
