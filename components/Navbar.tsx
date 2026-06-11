'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Search, ChevronDown, ChevronUp, Menu, X, BookOpen, Users, Stethoscope, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const courseItems = [
  {
    label: 'Courses for Professionals',
    desc: 'Advanced programmes designed for working professionals.',
    icon: Users,
  },
  {
    label: 'Courses for General Public',
    desc: 'Accessible learning for everyone, at your own pace.',
    icon: BookOpen,
  },
  {
    label: 'Surgical Retrieval Courses',
    desc: 'Specialist training in organ and tissue retrieval.',
    icon: Stethoscope,
  },
  {
    label: 'Other Courses',
    desc: 'Explore our full catalogue of educational offerings.',
    icon: GraduationCap,
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

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-400">
      {/* Top Bar - Deep Navy */}
      <div 
        className="text-white/85 text-[0.78rem] px-8 py-2 relative z-50 flex justify-between items-center gap-4"
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
      <nav className={`transition-all duration-400 ${scrolled ? 'bg-white/95 backdrop-blur-[20px] shadow-[0_2px_30px_rgba(26,47,94,0.08)]' : 'bg-transparent'} relative z-40`}>
        <div className="max-w-[1280px] mx-auto px-8 py-3 flex justify-between items-center">

          {/* Logos + CPD badge */}
          <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Go to home" className="flex items-center gap-3 sm:gap-4 decoration-none group">
            {/* MOHAN Foundation Logo */}
            <img src="/logo.png" alt="MOHAN Foundation" className="h-10 md:h-[46px] w-auto object-contain shrink-0" />
            
            {/* CPD Badge */}
            <img src="/cdp-logo.jpg" alt="CPD Accredited Badge" className="h-10 md:h-[46px] w-auto object-contain shrink-0" />
            
            {/* CPD Accredited Button */}
            <div className="hidden sm:flex bg-[#233B76] text-white font-bold text-[0.75rem] md:text-[0.8rem] px-3.5 py-1.5 md:py-2 rounded-[6px] shrink-0 items-center justify-center tracking-wide">
              CPD Accredited
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1 text-[0.85rem] font-medium text-mf-navy">
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
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[340px] pointer-events-auto"
                  >
                    <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(26,47,94,0.12)] border border-gray-100 overflow-hidden flex flex-col p-2 gap-1">
                        {courseItems.map(({ label, desc, icon: Icon }) => (
                          <a
                            key={label}
                            href="#"
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
                          </a>
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

          <div className="hidden lg:flex items-center gap-3">
             <Link href="/#courses" className="bg-mf-red hover:bg-mf-red-light text-white px-6 py-2.5 rounded-full font-semibold text-[0.85rem] transition-all hover:-translate-y-px hover:shadow-[0_8px_25px_rgba(200,48,58,0.35)]">
              Explore Courses
            </Link>
          </div>

          {/* Mobile: hamburger */}
          <button
            className="lg:hidden text-mf-navy hover:text-mf-red transition-colors p-2"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] absolute top-full left-0 w-full"
            >
              <ul className="flex flex-col px-6 py-4 gap-1">

                {navLinks.slice(0, 2).map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="block w-full px-4 py-3 rounded-xl text-mf-dark font-medium hover:bg-mf-blush hover:text-mf-red transition-colors text-[0.95rem]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}

                {/* Courses accordion */}
                <li>
                  <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-mf-dark font-medium hover:bg-mf-blush hover:text-mf-red transition-colors text-[0.95rem] cursor-pointer" onClick={() => setCoursesOpen(o => !o)}>
                    <span>Courses</span>
                    {coursesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
                </li>

                {navLinks.slice(2).map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="block w-full px-4 py-3 rounded-xl text-mf-dark font-medium hover:bg-mf-blush hover:text-mf-red transition-colors text-[0.95rem]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}

                <li className="pt-4 pb-2">
                   <Link href="/#courses" onClick={() => setMenuOpen(false)} className="block text-center w-full bg-mf-red hover:bg-mf-red-light text-white px-6 py-3 rounded-full font-semibold text-[0.95rem] transition-all">
                    Explore Courses
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
