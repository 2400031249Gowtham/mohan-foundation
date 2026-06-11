'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { professionalCourses, generalCourses } from '../data/courses';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export default function FeaturedCourses() {
  const [activeTab, setActiveTab] = useState<'pro' | 'pub'>('pro');

  const courses = activeTab === 'pro' ? professionalCourses : generalCourses;

  return (
    <section id="courses" className="py-24 bg-mf-cream relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-mf-navy/[0.03] to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-mf-navy/5 border border-mf-navy/10 text-mf-navy px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold tracking-[0.08em] mb-4">
            OUR COURSES
          </div>
          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] font-bold text-mf-dark leading-[1.1] mb-5">
            Our Featured<br/>
            <span className="bg-gradient-to-br from-mf-red to-mf-gold bg-clip-text text-transparent italic">Courses</span>
          </h2>
          <p className="text-mf-mid text-[1rem] leading-[1.6] max-w-[600px] mx-auto">
            CPD-accredited programs designed for healthcare professionals and the general public — making organ donation knowledge accessible to all.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/60 backdrop-blur-md border border-black/5 p-1.5 rounded-[16px] shadow-[0_4px_15px_rgba(26,47,94,0.04)] relative">
            
            {/* Sliding background for active tab */}
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
        </div>

        {/* Courses Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {courses.map((course) => (
              <div 
                key={course.id}
                className="bg-white/70 backdrop-blur-md rounded-[20px] overflow-hidden border border-white hover:border-white shadow-[0_10px_30px_rgba(26,47,94,0.03)] hover:shadow-[0_20px_50px_rgba(26,47,94,0.08)] hover:-translate-y-1.5 transition-all duration-400 group flex flex-col"
              >
                {/* Image Box */}
                <div className="relative h-[220px] w-full overflow-hidden bg-[#e2e8f0]">
                  <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md text-mf-navy px-3 py-1.5 rounded-full text-[0.65rem] font-bold shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
                    {course.tag}
                  </div>
                  <Image 
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[0.6s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mf-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </div>

                {/* Info Box */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-[1.1rem] leading-[1.3] text-mf-dark mb-4 group-hover:text-mf-red transition-colors line-clamp-2 h-12">
                    {course.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-[0.75rem] font-medium text-mf-mid mb-4">
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={14} className="text-mf-red" /> {course.lessons} Lessons
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-mf-red" /> {course.weeks} Week{course.weeks > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mb-6 mt-auto">
                    <div className="flex gap-0.5 text-[#fbbf24] text-[0.8rem]">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < course.rating ? '★' : '☆'}</span>
                      ))}
                    </div>
                    <span className="text-[0.7rem] text-mf-light ml-1 font-medium">({course.reviews} Reviews)</span>
                  </div>

                  {/* Bottom Bar */}
                  <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                    <span className="font-serif font-black text-[1.2rem] text-mf-red">
                      {course.price}
                    </span>
                    <Link 
                      href={`/courses/${course.id}`}
                      className="inline-flex items-center gap-1.5 text-[0.8rem] font-bold text-mf-navy hover:text-mf-red transition-colors"
                    >
                      Register <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
