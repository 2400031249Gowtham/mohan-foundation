'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Search, ChevronDown, ChevronUp, Menu, X, BookOpen, Users, Stethoscope, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const drawerVariants: Variants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: '100%', transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
};

const menuStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.08
    }
  }
};

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const courseItems = [
  {
    label: 'Courses for Professionals',
    desc: 'Advanced programmes designed for working professionals.',
    icon: Users,
    href: '/#ecosystem'
  },
  {
    label: 'General Courses',
    desc: 'Accessible learning for everyone, at your own pace.',
    icon: BookOpen,
    href: '/#ecosystem'
  },
  {
    label: 'Surgical Retrieval Courses',
    desc: 'Specialist training in organ and tissue retrieval.',
    icon: Stethoscope,
    href: '/#ecosystem'
  },
  {
    label: 'Other Courses',
    desc: 'Explore our full catalogue of educational offerings.',
    icon: GraduationCap,
    href: '/#ecosystem'
  },
];

const navLinks = [
  { label: 'Home',         href: '/'         },
  { label: 'About Us',     href: '/#about'   },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'FAQ',          href: '/#faq'     },
  { label: 'Contact',      href: '/enquire-us' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [coursesOpen, setCoursesOpen]   = useState(false); // mobile accordion
  const [coursesHover, setCoursesHover] = useState(false); // desktop hover
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <header className={`sticky top-0 left-0 w-full z-[9999] flex flex-col bg-white transition-shadow duration-300 ${scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.08)]' : ''}`}>
      {/* Top Bar - Deep Navy */}
      <div 
        className="text-white/85 text-[clamp(0.7rem,1.5vw,0.85rem)] px-[clamp(1rem,3vw,2rem)] py-2 relative z-50 flex justify-between items-center gap-[clamp(0.5rem,2vw,1rem)]"
        style={{ background: 'linear-gradient(90deg, #5B2333 0%, #7A2940 50%, #A23B4B 100%)' }}
      >
        {/* Left: Contact Info */}
        <div className="hidden sm:flex gap-6 items-center flex-wrap">
          <span className="flex items-center gap-1.5"><MapPin size={14}/> Chennai, Tamil Nadu</span>
          <a href="tel:+916374773957" className="flex items-center gap-1.5 hover:text-white transition-colors"><Phone size={14}/> +91-63747-73957</a>
          <a href="mailto:elearning@mohanfoundation.org" className="flex items-center gap-1.5 hover:text-white transition-colors"><Mail size={14}/> elearning@mohanfoundation.org</a>
        </div>

        {/* Right: Auth & Action */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end shrink-0">
          <div className="flex gap-4 items-center">
            <Link href="/enquire-us" className="text-white/75 hover:text-white transition-colors">Register</Link>
            <span className="opacity-30">|</span>
            <a href="#" className="text-white/75 hover:text-white transition-colors">Login</a>
          </div>
          <Link href="/#courses" className="bg-mf-red hover:bg-mf-red-light hover:-translate-y-px text-white font-semibold px-4 py-1.5 rounded-full transition-all">
            Apply Now
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="relative z-[9999] bg-white">
        <div className="container-fluid py-[clamp(0.5rem,1.5vw,1rem)] flex flex-col lg:flex-row justify-between items-center gap-4 relative">

          {/* Row 1: Logo + CPD (Tablet/Desktop) + Hamburger */}
          <div className="flex w-full lg:w-auto items-center justify-between lg:justify-start gap-4 lg:gap-6 shrink-0 flex-wrap sm:flex-nowrap">
            <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Go to home" className="flex items-center decoration-none group shrink-0">
              <img src="/logo.png" alt="MOHAN Foundation" className="h-10 md:h-[46px] w-auto object-contain shrink-0" />
            </Link>

            {/* Tablet/Desktop CPD Elements (hidden < md) */}
            <div className="hidden md:flex lg:flex items-center gap-3 lg:gap-4 shrink-0 border-l border-gray-200 pl-3 lg:pl-4 ml-1 lg:ml-2">
              <img src="/cdp-logo.jpg" alt="CPD Accredited" className="h-[38px] lg:h-[46px] w-auto object-contain shrink-0" />
              <div className="inline-flex items-center gap-2 bg-mf-red/10 border border-mf-red/20 text-mf-red px-3 lg:px-4 py-1.5 rounded-full text-[0.7rem] lg:text-[0.75rem] font-bold tracking-[0.05em] whitespace-nowrap">
                <span className="w-2 h-2 bg-mf-red rounded-full animate-pulse"></span>
                CPD Accredited Since 2025
              </div>
            </div>

            {/* Mobile/Tablet Hamburger (< 1024px) */}
            <button
              className="lg:hidden text-mf-navy hover:text-mf-red transition-colors p-2 shrink-0 md:ml-auto"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Row 2 on Mobile ONLY (hidden >= md) */}
          <div className="flex md:hidden w-full flex-wrap items-center justify-center gap-2 py-2 shrink-0">
            <img src="/cdp-logo.jpg" alt="CPD Accredited" className="h-10 w-10 object-contain shrink-0" />
            <div className="inline-flex items-center gap-2 bg-mf-red/10 border border-mf-red/20 text-mf-red px-3 py-1.5 rounded-full text-[0.75rem] font-bold tracking-[0.05em] whitespace-nowrap">
              <span className="w-2 h-2 bg-mf-red rounded-full animate-pulse"></span>
              CPD Accredited Since 2025
            </div>
          </div>

          {/* Desktop Navigation (>= 1024px) */}
          <ul className="hidden lg:flex items-center gap-1 text-[0.85rem] font-medium text-mf-navy shrink-0 ml-auto">
            {navLinks.slice(0, 2).map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="px-4 py-2 rounded-full transition-all flex items-center gap-1 hover:text-mf-red hover:bg-mf-red/5"
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* Courses with hover dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setCoursesHover(true)}
              onMouseLeave={() => setCoursesHover(false)}
            >
              <Link href="/#courses" className="px-4 py-2 rounded-full transition-all flex items-center gap-1 hover:text-mf-red hover:bg-mf-red/5 cursor-pointer">
                <span>Courses</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${coursesHover ? 'rotate-180' : ''}`}
                />
              </Link>

              {/* Dropdown panel */}
              <AnimatePresence>
                {coursesHover && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[clamp(280px,80vw,400px)] pointer-events-auto"
                  >
                    <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(26,47,94,0.12)] border border-gray-100 overflow-hidden flex flex-col p-2 gap-1">
                        {courseItems.map(({ label, desc, icon: Icon, href }) => (
                          <Link
                            key={label}
                            href={href}
                            onClick={() => {
                              setCoursesHover(false);
                              setMenuOpen(false);
                            }}
                            className="flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-mf-blush group/item transition-colors"
                          >
                            <div className="mt-0.5 w-8 h-8 rounded-lg bg-mf-red/10 group-hover/item:bg-mf-red flex items-center justify-center flex-shrink-0 transition-all">
                              <Icon size={15} className="text-mf-red group-hover/item:text-white transition-colors" />
                            </div>
                            <div>
                              <p className="text-mf-dark font-semibold text-[0.85rem] leading-tight group-hover/item:text-mf-red transition-colors">
                                {label}
                              </p>
                              <p className="text-mf-light text-[0.7rem] mt-1 font-normal leading-snug">
                                {desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Testimonials, FAQ, Contact */}
            {navLinks.slice(2).map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="px-4 py-2 rounded-full transition-all flex items-center gap-1 hover:text-mf-red hover:bg-mf-red/5"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>


          <div className="hidden lg:flex items-center gap-3 shrink-0">
             <Link href="/#courses" className="bg-mf-red hover:bg-mf-red-light text-white px-6 py-2.5 rounded-full font-semibold text-[0.85rem] transition-all hover:-translate-y-px hover:shadow-[0_8px_25px_rgba(200,48,58,0.35)] whitespace-nowrap">
              Explore Courses
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9997]"
              />

              {/* Drawer */}
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3 }}
                className="lg:hidden fixed top-0 right-0 h-[100dvh] w-[min(85vw,360px)] bg-white shadow-2xl z-[10000] overflow-y-auto flex flex-col"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <header className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
                  <span className="text-sm font-semibold tracking-wide text-mf-navy">
                    MENU
                  </span>
                  <button
                    aria-label="Close Menu"
                    onClick={() => setMenuOpen(false)}
                    className="h-[44px] w-[44px] -mr-2 rounded-full flex items-center justify-center text-mf-navy hover:text-mf-red transition-colors"
                  >
                    <X size={22} />
                  </button>
                </header>

                <motion.ul 
                  variants={menuStaggerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col w-full max-w-[280px] mx-auto pt-6 pb-6 grow px-0"
                >

                {navLinks.slice(0, 2).map(({ label, href }) => (
                  <motion.li key={label} variants={menuItemVariants} className="border-b border-gray-100 last:border-b-0 mb-0">
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center w-full py-[12px] px-[20px] min-h-[44px] text-mf-dark font-medium hover:text-mf-red transition-colors text-[1rem] leading-[1.4]"
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}

                {/* Courses accordion */}
                <motion.li variants={menuItemVariants} className="border-b border-gray-100 last:border-b-0 mb-0">
                  <div className="w-full flex items-center justify-between py-[12px] px-[20px] min-h-[44px] text-mf-dark font-medium hover:text-mf-red transition-colors text-[1rem] leading-[1.4] cursor-pointer" onClick={() => setCoursesOpen(o => !o)}>
                    <span>Courses</span>
                    {coursesOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>

                  <AnimatePresence>
                    {coursesOpen && (
                      <motion.ul 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden ml-4 mr-4 mb-2 flex flex-col gap-1 border-l-2 border-mf-red/20 pl-2"
                      >
                        {courseItems.map(({ label }) => (
                          <li key={label}>
                            <a
                              href="#"
                              className="block px-4 py-2.5 rounded-lg text-mf-mid hover:text-mf-red hover:bg-mf-blush transition-colors text-[0.85rem] font-medium"
                            >
                              {label}
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.li>

                {navLinks.slice(2).map(({ label, href }) => (
                  <motion.li key={label} variants={menuItemVariants} className="border-b border-gray-100 last:border-b-0 mb-0">
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center w-full py-[12px] px-[20px] min-h-[44px] text-mf-dark font-medium hover:text-mf-red transition-colors text-[1rem] leading-[1.4]"
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}

                <motion.li className="mt-[20px] px-[20px]" variants={menuItemVariants}>
                   <Link href="/#courses" onClick={() => setMenuOpen(false)} className="flex items-center justify-center w-full bg-mf-red hover:bg-mf-red-light text-white px-6 py-[12px] rounded-full font-semibold text-[0.95rem] transition-all leading-[1.4]">
                    Explore Courses
                  </Link>
                </motion.li>
              </motion.ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
