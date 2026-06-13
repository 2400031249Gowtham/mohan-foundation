'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Globe, Users, Star } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

type CategoryId = 'general' | 'access' | 'fees';

const categories: { id: CategoryId; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'access',  label: 'Access'  },
  { id: 'fees',    label: 'Fees'    },
];

const faqData: Record<CategoryId, { id: number; question: string; answer: string }[]> = {
  general: [
    {
      id: 1,
      question: "Are MOHAN Foundation's online training programs accredited by any educational institute or any other organisations?",
      answer: "Yes, MOHAN Foundation has been an accredited CPD provider since 2025. This accreditation allows the organization to issue formal CPD certificates after successful completion of eligible training programmes, helping participants fulfil mandatory and reflective CPD requirements. While the courses are not affiliated with international universities, they are well recognised and respected by transplant hospitals and healthcare institutions across India.",
    },
    {
      id: 2,
      question: "Can a working professional join the course?",
      answer: "YES. The online learning platform provides the convenience of studying while working. This also offers participants the flexibility to learn at their own pace.",
    },
    {
      id: 3,
      question: "Can international students participate in courses?",
      answer: "Yes, they can. Our courses have been taken by many candidates from abroad due to the low fee structure and high quality of the course. All candidates who take the course are expected to rate the course and this is shown on our site.",
    },
    {
      id: 4,
      question: "What is the medium of the course?",
      answer: "The medium of instruction is English. All course materials are provided in English.",
    },
    {
      id: 5,
      question: "Can students be assured of job opportunities?",
      answer: "NO. MOHAN Foundation does not have a placement cell. However, when MF is approached by any institution, the job opportunity will be circulated within the Alumni group. Having said this, most hospitals do value candidates trained by MOHAN Foundation as over 70% of successful coordinators in the country have been trained by MOHAN Foundation.",
    },
  ],
  access: [
    {
      id: 6,
      question: "How will I receive my course access details?",
      answer: "Once the registration process (including fee payment) is completed, you will be receiving the access details such as username and password to the registered email address.",
    },
    {
      id: 7,
      question: "How can I access my courses?",
      answer: "After logging in, you will see the list of courses that are available on our platform. If you click on the particular course that you have enrolled for, you will be taken to the course material page.",
    },
    {
      id: 8,
      question: "I didn't get my username and password.",
      answer: "Once you complete the registration process, your username and password will be sent to you via email. Access details for long-term courses will be provided a few days prior to the course start date. For short-term courses, access details will be shared within a few days after successful registration.",
    },
    {
      id: 9,
      question: "Are there any deadlines for completion of courses?",
      answer: "For long-term courses, there are specific deadlines to adhere to. However, for short-term courses, access is granted for a longer duration than the course itself. This extended access allows you to complete the course within the provided timeline.",
    },
    {
      id: 10,
      question: "Can I access the course content after a course ends?",
      answer: "NO. The students can apply for annual subscription so that they can avail the access to the resource materials even after the course duration.",
    },
  ],
  fees: [
    {
      id: 11,
      question: "How much does it cost to join a course?",
      answer: "Multiple courses are offered on our platform. The course details page for each course will have all details about the course including the fee structure. Most of our courses are offered at a subsidised cost. The fee starts from Rs. 500 and can go up to Rs. 15,000. Overseas candidates' fees is higher due to many factors.",
    },
    {
      id: 12,
      question: "Are there any scholarship policies that are accessible or can be utilized?",
      answer: "YES. There is an educational grant which can be availed only by the candidates from government and non-profit institutions. This grant is available only for the long-term one year and 6 week courses.",
    },
    {
      id: 13,
      question: "How to apply for scholarship?",
      answer: "The scholarship is available for candidates from government and non-profit institutions. A sample letter is provided on the registration form for each course. Applications must adhere strictly to the prescribed format.",
    },
    {
      id: 14,
      question: "Are there any hidden charges?",
      answer: "No, once you have paid the registration fee there are no further payments to be made.",
    },
    {
      id: 15,
      question: "When will I get my certificate?",
      answer: "Online certificates are available. Upon completing course requirements, you will be able to download your course completion certificate.",
    },
  ],
};

const learningStats = [
  { icon: Users, value: '15,000+', label: 'Candidates Completed', bg: 'bg-[#e0e7ff]' },
  { icon: Globe, value: '25+',     label: 'No. of Countries',     bg: 'bg-[#d1fae5]' },
  { icon: Star,  value: '4.8/5',   label: 'Feedback Ratings',     bg: 'bg-[#fef3c7]' },
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
    <section id="faq" className="py-24 bg-white font-sans overflow-hidden border-t border-black/5">
      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-[1280px] mx-auto px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16 items-start">

          {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
          <div className="lg:sticky lg:top-32 flex flex-col gap-6">

            {/* Badge */}
            <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 bg-mf-navy/5 border border-mf-navy/10 text-mf-navy px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold tracking-[0.08em] w-max">
              <Globe size={14} className="text-mf-red" />
              GLOBAL IMPACT
            </motion.div>

            {/* Heading */}
            <motion.div variants={fadeUpVariants}>
              <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-bold text-mf-dark leading-[1.1] mb-4">
                Learning Across<br />
                <span className="bg-gradient-to-br from-mf-red to-mf-gold bg-clip-text text-transparent italic">Borders.</span>
              </h2>
              <p className="text-mf-mid text-[1rem] leading-[1.6] max-w-[400px]">
                MOHAN Foundation's e-learning platform bridges geographical gaps, providing world-class training in organ donation and transplantation globally.
              </p>
            </motion.div>

            {/* Stats grid */}
            <motion.div variants={fadeUpVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mt-4">
              {learningStats.map(({ icon: Icon, value, label, bg }) => (
                <div
                  key={label}
                  className="flex items-center gap-5 py-4 px-6 rounded-[20px] bg-mf-soft border border-black/5 shadow-[0_4px_15px_rgba(26,47,94,0.02)] hover:shadow-[0_8px_25px_rgba(26,47,94,0.06)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-[14px] ${bg} flex items-center justify-center shrink-0 shadow-sm`}>
                    <Icon size={20} className="text-mf-dark" />
                  </div>
                  <div>
                    <div className="text-mf-red font-black text-[1.4rem] leading-none mb-1">{value}</div>
                    <div className="text-mf-light text-[0.75rem] font-semibold uppercase tracking-[0.05em]">{label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN (FAQ) ─────────────────────────────────────────────── */}
          <div className="flex flex-col w-full">

            {/* FAQ Heading */}
            <motion.div variants={fadeUpVariants} className="mb-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-mf-red/10 border border-mf-red/20 text-mf-red px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold tracking-[0.08em] mb-4">
                <BookOpen size={14} />
                FAQ
              </div>
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-mf-dark leading-[1.1] mb-3">
                Common <span className="bg-gradient-to-br from-mf-red to-mf-gold bg-clip-text text-transparent italic">Questions</span>
              </h2>
              <p className="text-mf-mid text-[0.95rem] leading-relaxed max-w-[500px] mx-auto lg:mx-0">
                Everything you need to know about our courses, platform access, and pricing — all in one place.
              </p>
            </motion.div>

            {/* Category tabs */}
            <motion.div variants={fadeUpVariants} className="flex justify-center lg:justify-start mb-8">
              <div className="inline-flex bg-mf-cream border border-black/5 p-1.5 rounded-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] relative overflow-hidden">
                <button 
                  onClick={() => handleCategory('general')}
                  className={`relative z-10 px-6 py-2 rounded-[12px] text-[0.85rem] font-bold transition-colors ${activeCategory === 'general' ? 'bg-white text-mf-red shadow-sm' : 'text-mf-mid hover:text-mf-dark'}`}
                >
                  General
                </button>
                <button 
                  onClick={() => handleCategory('access')}
                  className={`relative z-10 px-6 py-2 rounded-[12px] text-[0.85rem] font-bold transition-colors ${activeCategory === 'access' ? 'bg-white text-mf-red shadow-sm' : 'text-mf-mid hover:text-mf-dark'}`}
                >
                  Access
                </button>
                <button 
                  onClick={() => handleCategory('fees')}
                  className={`relative z-10 px-6 py-2 rounded-[12px] text-[0.85rem] font-bold transition-colors ${activeCategory === 'fees' ? 'bg-white text-mf-red shadow-sm' : 'text-mf-mid hover:text-mf-dark'}`}
                >
                  Fees
                </button>
              </div>
            </motion.div>

            {/* Accordion list */}
            <motion.div variants={fadeUpVariants} className="flex flex-col gap-3">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-3"
                >
                  {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                      <div
                        key={faq.id}
                        className={`rounded-[16px] border transition-all duration-300 ${
                          isOpen
                            ? 'border-mf-red/30 bg-white shadow-[0_4px_20px_rgba(200,48,58,0.05)]'
                            : 'border-black/5 bg-mf-cream hover:bg-white hover:border-black/10'
                        }`}
                      >
                        <button
                          onClick={() => toggle(index)}
                          className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
                          aria-expanded={isOpen}
                        >
                          <span className={`text-[0.95rem] font-bold pr-4 transition-colors ${isOpen ? 'text-mf-red' : 'text-mf-dark'}`}>
                            {faq.question}
                          </span>
                          <div
                            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isOpen ? 'bg-mf-red text-white' : 'bg-mf-navy/5 text-mf-navy'
                            }`}
                          >
                            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
                              <p className="px-6 pb-6 text-mf-mid text-[0.9rem] leading-[1.7]">
                                {faq.answer}
                              </p>
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
            <motion.div variants={fadeUpVariants} className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[20px] border border-mf-navy/10 bg-mf-navy/5 px-6 py-5">
              <div className="text-center sm:text-left">
                <p className="text-mf-dark font-bold text-[0.95rem]">Still have questions?</p>
                <p className="text-mf-mid text-[0.8rem] mt-0.5">Our support team is happy to help.</p>
              </div>
              <button className="bg-mf-navy hover:bg-mf-navy-light text-white text-[0.85rem] font-bold px-6 py-3 rounded-full transition-colors whitespace-nowrap shadow-[0_4px_15px_rgba(26,47,94,0.2)] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(26,47,94,0.25)]">
                Contact Us
              </button>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
