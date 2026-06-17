'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { faqData, categories, CategoryId } from '@/data/faqs';
import FooterSection from '@/components/FooterSection';
import Link from 'next/link';

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('general');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleCategory = (id: CategoryId) => {
    setActiveCategory(id);
    setOpenIndex(0);
  };

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
  const faqs = faqData[activeCategory];

  return (
    <main className="min-h-screen selection:bg-mf-red selection:text-white bg-white flex flex-col">
      <div className="flex-grow">
        {/* Header Section */}
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-[#FDFBF7] relative overflow-hidden border-b border-black/5">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
            <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#1e3a8a" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotPattern)" />
            </svg>
          </div>
          
          <div className="container-fluid relative z-10 text-center max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-mf-navy/5 border border-mf-navy/10 text-mf-navy px-4 py-1.5 rounded-full text-[0.75rem] font-bold tracking-[0.08em] mb-6"
            >
              <BookOpen size={16} className="text-mf-red" />
              SUPPORT & GUIDANCE
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-[4rem] font-serif font-bold text-mf-dark leading-tight mb-6"
            >
              Frequently Asked <br />
              <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-mf-red via-mf-red-light to-mf-gold">
                Questions (FAQs)
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[1.05rem] md:text-[1.15rem] text-mf-mid leading-relaxed max-w-2xl mx-auto"
            >
              Find all the answers you need about our CPD-accredited courses, platform access, fees, and scholarship policies.
            </motion.p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container-fluid max-w-4xl mx-auto px-4">
            
            {/* Category Tabs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center mb-10"
            >
              <div className="inline-flex bg-mf-cream border border-black/5 p-1.5 rounded-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex-wrap justify-center gap-1 sm:gap-0">
                {categories.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => handleCategory(cat.id)}
                    className={`relative z-10 px-6 py-2.5 rounded-[12px] text-[0.9rem] font-bold transition-colors ${activeCategory === cat.id ? 'bg-white text-mf-red shadow-sm' : 'text-mf-mid hover:text-mf-dark'}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Accordion List */}
            <motion.div 
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-4"
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                      <div
                        key={faq.id}
                        className={`rounded-[20px] border transition-all duration-300 ${
                          isOpen
                            ? 'border-mf-red/30 bg-white shadow-[0_8px_30px_rgba(200,48,58,0.08)]'
                            : 'border-black/5 bg-mf-cream hover:bg-white hover:border-black/10'
                        }`}
                      >
                        <button
                          onClick={() => toggle(index)}
                          className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none"
                          aria-expanded={isOpen}
                        >
                          <span className={`text-[1.05rem] font-bold pr-6 transition-colors leading-snug ${isOpen ? 'text-mf-red' : 'text-mf-dark'}`}>
                            {faq.question}
                          </span>
                          <div
                            className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isOpen ? 'bg-mf-red text-white' : 'bg-mf-navy/5 text-mf-navy'
                            }`}
                          >
                            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
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
                              <div className="px-6 pb-6 pt-2">
                                <div className="w-full h-[1px] bg-black/5 mb-4"></div>
                                <p 
                                  className="text-mf-mid text-[0.95rem] leading-[1.8] [&_a]:text-mf-red [&_a]:font-semibold [&_a]:underline [&_a:hover]:text-mf-dark [&_a]:transition-colors [&_strong]:font-bold [&_b]:font-bold [&_br]:block [&_br]:content-[''] [&_br]:mb-2"
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

            {/* Bottom CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 flex flex-col items-center justify-center text-center gap-5 rounded-[24px] border border-mf-navy/10 bg-gradient-to-b from-mf-navy/5 to-transparent px-6 py-12"
            >
              <div>
                <h3 className="text-mf-dark font-serif font-bold text-[1.8rem] mb-2">Still have questions?</h3>
                <p className="text-mf-mid text-[1rem]">Our support team is happy to help.</p>
              </div>
              <Link href="/enquire-us" className="bg-mf-navy hover:bg-mf-navy-light text-white text-[0.95rem] font-bold px-8 py-3.5 rounded-full transition-all shadow-[0_4px_15px_rgba(26,47,94,0.2)] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(26,47,94,0.25)]">
                Contact Us
              </Link>
            </motion.div>

          </div>
        </section>
      </div>

      <FooterSection />
    </main>
  );
}
