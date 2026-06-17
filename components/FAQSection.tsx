'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Globe, Users, Star, TrendingUp, Map } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { faqData, categories, CategoryId } from '../data/faqs';

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

const learningStats = [
  { 
    icon: Users, 
    value: '15,000+', 
    label: 'Candidates Completed', 
    renderDecoration: () => <TrendingUp size={36} className="text-white opacity-20 group-hover:opacity-40 transition-opacity duration-300 stroke-[1.5]" /> 
  },
  { 
    icon: Globe, 
    value: '25+',     
    label: 'No. of Countries',     
    renderDecoration: () => <Map size={36} className="text-white opacity-20 group-hover:opacity-40 transition-opacity duration-300 stroke-[1.5]" /> 
  },
  { 
    icon: Star,  
    value: '4.8/5',   
    label: 'Feedback Ratings',     
    renderDecoration: () => (
      <div className="flex gap-0.5 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        {[1,2,3,4,5].map(i => (
          <Star key={i} size={16} className={i === 5 ? "text-white/40 fill-white/40" : "text-[#F5E1A4] fill-[#F5E1A4]"} />
        ))}
      </div>
    )
  },
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('general');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleCategory = (id: CategoryId) => {
    setActiveCategory(id);
    setOpenIndex(0);
  };

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
  const faqs = faqData[activeCategory];

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#F8FAFC] font-sans overflow-hidden relative">
      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="container-fluid max-w-[1340px] mx-auto px-4 md:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[46%_54%] gap-5 items-stretch">

          {/* ── LEFT PANEL: Premium "Global Impact" Card ─────────────────────────────────────────────── */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B2E6B] via-[#1A4A9F] to-[#235CC8] p-8 md:p-10 shadow-[0_20px_40px_rgba(11,46,107,0.2)] border border-white/10 backdrop-blur-xl">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/[0.02] to-white/[0.08] pointer-events-none" />
            


            {/* Floating Glows and Connecting Lines for Depth */}
            <div className="absolute top-[35%] left-[10%] w-48 h-48 bg-[#F5E1A4]/10 rounded-full blur-[60px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#D4A345]/15 rounded-full blur-[50px] pointer-events-none animate-pulse mix-blend-screen" />
            
            <svg className="absolute top-[40%] left-[10%] w-[80%] h-[20%] opacity-20 pointer-events-none" viewBox="0 0 100 50" preserveAspectRatio="none">
              <path d="M 0,25 Q 30,5 50,25 T 100,25" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 3" />
              <circle cx="0" cy="25" r="1.5" fill="#F5E1A4" className="animate-pulse" />
              <circle cx="50" cy="25" r="1.5" fill="#F5E1A4" className="animate-pulse" />
              <circle cx="100" cy="25" r="1.5" fill="#F5E1A4" className="animate-pulse" />
            </svg>

            <div className="relative z-10 flex flex-col gap-6">
              {/* Badge */}
              <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold tracking-[0.08em] w-max backdrop-blur-md">
                <Globe size={14} className="text-white/80" />
                GLOBAL IMPACT
              </motion.div>

              {/* Heading */}
              <motion.div variants={fadeUpVariants}>
                <h2 className="font-serif text-[clamp(2.2rem,3.5vw,3rem)] font-bold text-white leading-[1.1] mb-4">
                  Learning Across<br />
                  <span className="bg-gradient-to-r from-[#F5E1A4] via-[#E8C170] to-[#D4A345] bg-clip-text text-transparent italic">Borders.</span>
                </h2>
                <p className="text-white/70 text-[1.05rem] leading-[1.7] max-w-[380px]">
                  MOHAN Foundation's e-learning platform bridges geographical gaps, providing world-class training in organ donation and transplantation globally.
                </p>
              </motion.div>
            </div>

            {/* Stats grid */}
            <div className="relative z-10 mt-auto pt-16 flex flex-col gap-4">
              {learningStats.map(({ icon: Icon, value, label, renderDecoration }) => (
                <motion.div 
                  variants={fadeUpVariants}
                  key={label}
                  className="group flex items-center justify-between py-4 px-6 rounded-[20px] bg-white/10 border border-white/15 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 hover:bg-white/[0.12] transition-all duration-300"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-[1.45rem] leading-none mb-1.5 tracking-tight">{value}</div>
                      <div className="text-white/70 text-[0.8rem] font-bold uppercase tracking-[0.05em]">{label}</div>
                    </div>
                  </div>
                  <div className="flex shrink-0 ml-2">
                    {renderDecoration()}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── RIGHT PANEL: Elevated FAQ Card ─────────────────────────────────────────────── */}
          <div className="flex flex-col bg-white rounded-[28px] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 md:p-12 h-full justify-between">
            <div className="flex flex-col flex-grow">
              {/* FAQ Heading */}
              <motion.div variants={fadeUpVariants} className="mb-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-mf-red/5 border border-mf-red/10 text-mf-red px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold tracking-[0.08em] mb-4">
                  <BookOpen size={14} />
                  FAQs
                </div>
                <h2 className="font-serif text-[clamp(2.2rem,3.5vw,2.8rem)] font-bold text-mf-dark leading-[1.1] mb-4">
                  Common <span className="text-mf-red italic">Questions</span>
                </h2>
                <p className="text-mf-mid text-[1rem] leading-[1.7] max-w-[500px] mx-auto lg:mx-0">
                  Everything you need to know about our courses, platform access, and pricing — all in one place.
                </p>
              </motion.div>

              {/* Category tabs */}
              <motion.div variants={fadeUpVariants} className="flex justify-center lg:justify-start mb-8">
                <div className="inline-flex bg-[#F8FAFC] border border-black/5 p-2 rounded-full shadow-inner relative w-full sm:w-auto overflow-hidden">
                  {categories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => handleCategory(cat.id)}
                      className={`flex-1 sm:flex-none relative z-10 px-6 md:px-10 py-3 rounded-full text-[0.9rem] font-bold transition-all duration-300 ${activeCategory === cat.id ? 'bg-white text-mf-red shadow-[0_2px_12px_rgba(0,0,0,0.06)]' : 'text-mf-mid hover:text-mf-dark'}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Accordion list */}
              <motion.div variants={fadeUpVariants} className="flex flex-col gap-4">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    {faqs.slice(0, 1).map((faq, index) => {
                      const isOpen = openIndex === index;
                      return (
                        <div
                          key={faq.id}
                          className={`rounded-[20px] border transition-all duration-300 ${
                            isOpen
                              ? 'border-mf-red/20 bg-white shadow-[0_8px_25px_rgba(200,48,58,0.06)]'
                              : 'border-black/5 bg-[#F8FAFC] hover:bg-white hover:border-black/10'
                          }`}
                        >
                          <button
                            onClick={() => toggle(index)}
                            className="w-full flex items-center justify-between px-8 py-6 text-left focus:outline-none"
                            aria-expanded={isOpen}
                          >
                            <span className={`text-[1.05rem] font-bold pr-6 transition-colors leading-[1.4] ${isOpen ? 'text-mf-red' : 'text-mf-dark'}`}>
                              {faq.question}
                            </span>
                            <div
                              className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isOpen ? 'bg-mf-red text-white' : 'bg-[#F1F5F9] text-mf-navy'
                              }`}
                            >
                              {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="px-8 pb-8 pt-2">
                                  <div className="w-full h-[1px] bg-black/5 mb-5"></div>
                                  <div 
                                    className="text-mf-mid text-[0.95rem] leading-[1.8] faq-content [&_a]:text-mf-red [&_a]:font-semibold [&_a]:underline [&_a:hover]:text-mf-dark [&_a]:transition-colors [&_strong]:font-bold [&_b]:font-bold [&_br]:block [&_br]:content-[''] [&_br]:mb-2"
                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div variants={fadeUpVariants} className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
              <Link href="/faqs" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-mf-navy hover:bg-[#1A2E5B] text-white text-[0.95rem] font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(26,47,94,0.15)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(26,47,94,0.2)]">
                More Questions &rarr;
              </Link>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
