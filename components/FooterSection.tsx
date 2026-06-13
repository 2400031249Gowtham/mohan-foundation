'use client';

import Link from 'next/link';
import { MapPin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0b1a35" />
    </svg>
  );
}

const socials = [
  { label: 'Instagram', Icon: IconInstagram },
  { label: 'Facebook',  Icon: IconFacebook  },
  { label: 'LinkedIn',  Icon: IconLinkedIn  },
  { label: 'YouTube',   Icon: IconYouTube   },
  { label: 'Twitter/X', Icon: IconX         },
];

const legalLinks = [
  'Terms of Use',
  'Terms & Conditions',
  'Copyright Acknowledgement',
];

const policyLinks = [
  'Complaint Policy & Procedures',
  'Data Protection and Privacy Policy',
  'Digital Health & Safety Policy',
  'Disability and Discrimination Policy',
  'Equal Treatment Policy',
  'Money-back Guarantee Policy',
];

export default function FooterSection() {
  return (
    <footer className="bg-gradient-to-b from-[#FAF8F4] to-[#F5F1EB] text-[#475569] relative overflow-hidden font-sans">
      
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#5B2333] via-[#D93A43] to-[#A23B4B] z-20" />

      {/* Decorative Blur Backgrounds & Textures */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, #16213E 40px, #16213E 42px), repeating-linear-gradient(135deg, transparent, transparent 20px, #D93A43 20px, #D93A43 21px)',
          backgroundSize: '120px 120px',
        }}
      />
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#D93A43]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#16213E]/5 rounded-full blur-[80px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-24 pb-16 relative z-10"
      >
        <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand & About (Left) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-5 bg-[rgba(255,255,255,0.75)] backdrop-blur-[20px] p-4 rounded-[24px] w-max border border-[rgba(0,0,0,0.05)] shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform duration-300">
              <img
                src="/logo.png"
                alt="MOHAN Foundation"
                className="h-[50px] w-auto object-contain"
              />
              <div className="w-[1px] h-[40px] bg-[rgba(0,0,0,0.08)]"></div>
              <img
                src="/cdp-logo.jpg"
                alt="CPD Accredited Provider"
                className="h-[55px] w-auto object-contain rounded-md"
              />
            </div>
            
            <p className="text-[#475569] text-[0.9rem] leading-[1.7]">
              MOHAN (Multi Organ Harvesting Aid Network) Foundation is a pioneering Not-for-profit, Non-Governmental Organization dedicated to creating a supportive ecosystem for deceased organ donations in India. Established in 1997, the Foundation is dedicated to promoting and facilitating ethical organ donation and transplantation.
            </p>
            <p className="text-[#475569] text-[0.9rem] leading-[1.7]">
              MOHAN Foundation has been an accredited CPD provider since 2025. This accreditation sets us apart as a trusted provider of CPD-accredited training and enables us to issue formal CPD certificates post-training courses.
            </p>
          </div>

          {/* Links Grid (Right) */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            
            {/* Col 1 — About */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[0.95rem] font-bold uppercase tracking-[0.05em] text-[#16213E]">About</h4>
              <ul className="flex flex-col gap-3">
                <li><Link href="/#about" className="text-[0.9rem] text-[#334155] hover:text-[#D93A43] hover:-translate-y-1 inline-block transition-all duration-300">About Us</Link></li>
                <li><Link href="/#about" className="text-[0.9rem] text-[#334155] hover:text-[#D93A43] hover:-translate-y-1 inline-block transition-all duration-300">Our Team</Link></li>
              </ul>
            </div>

            {/* Col 2 — Guidance */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[0.95rem] font-bold uppercase tracking-[0.05em] text-[#16213E]">Guidance</h4>
              <ul className="flex flex-col gap-3">
                <li><Link href="/#faq" className="text-[0.9rem] text-[#334155] hover:text-[#D93A43] hover:-translate-y-1 inline-block transition-all duration-300">FAQs</Link></li>
                <li><Link href="/enquire-us" className="text-[0.9rem] text-[#334155] hover:text-[#D93A43] hover:-translate-y-1 inline-block transition-all duration-300">Enquiry</Link></li>
              </ul>
            </div>

            {/* Col 3 — Legal */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[0.95rem] font-bold uppercase tracking-[0.05em] text-[#16213E]">Legal</h4>
              <ul className="flex flex-col gap-3">
                {legalLinks.map(link => (
                  <li key={link}>
                    <a href="#" className="text-[0.9rem] text-[#334155] hover:text-[#D93A43] hover:-translate-y-1 inline-block transition-all duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Policies */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[0.95rem] font-bold uppercase tracking-[0.05em] text-[#16213E]">Policies</h4>
              <ul className="flex flex-col gap-3">
                {policyLinks.map(link => (
                  <li key={link}>
                    <a href="#" className="text-[0.9rem] text-[#334155] hover:text-[#D93A43] hover:-translate-y-1 inline-block transition-all duration-300 leading-snug">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
        
        {/* Reach Us Sub-section */}
        <div className="max-w-[1280px] mx-auto px-8 mt-16 pt-10 border-t border-[rgba(0,0,0,0.08)] grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="mailto:elearning@mohanfoundation.org" className="flex items-center gap-4 bg-[rgba(255,255,255,0.75)] backdrop-blur-[20px] p-4 rounded-[24px] border border-[rgba(0,0,0,0.05)] shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-full bg-[#D93A43]/10 flex items-center justify-center shrink-0">
              <Mail size={18} className="text-[#D93A43]" />
            </div>
            <div>
              <div className="text-[0.75rem] font-bold text-[#475569] uppercase tracking-widest mb-1">Email Us</div>
              <div className="text-[0.95rem] text-[#16213E] font-medium group-hover:text-[#D93A43] transition-colors">elearning@mohanfoundation.org</div>
            </div>
          </a>
          <a href="tel:+916374773957" className="flex items-center gap-4 bg-[rgba(255,255,255,0.75)] backdrop-blur-[20px] p-4 rounded-[24px] border border-[rgba(0,0,0,0.05)] shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-full bg-[#D93A43]/10 flex items-center justify-center shrink-0">
              <Phone size={18} className="text-[#D93A43]" />
            </div>
            <div>
              <div className="text-[0.75rem] font-bold text-[#475569] uppercase tracking-widest mb-1">Call Us</div>
              <div className="text-[0.95rem] text-[#16213E] font-medium group-hover:text-[#D93A43] transition-colors">+91-63747-73957</div>
            </div>
          </a>
          <a href="tel:18001037100" className="flex items-center gap-4 bg-[rgba(255,255,255,0.75)] backdrop-blur-[20px] p-4 rounded-[24px] border border-[rgba(0,0,0,0.05)] shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-full bg-[#D93A43]/10 flex items-center justify-center shrink-0">
              <Phone size={18} className="text-[#D93A43]" />
            </div>
            <div>
              <div className="text-[0.75rem] font-bold text-[#475569] uppercase tracking-widest mb-1">Toll Free</div>
              <div className="text-[0.95rem] font-black tracking-wider text-[#16213E] group-hover:text-[#D93A43] transition-colors">1800-103-7100</div>
            </div>
          </a>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-[rgba(0,0,0,0.08)] py-6 relative z-10">
        <div className="max-w-[1280px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#475569] text-[0.85rem] text-center md:text-left font-medium">
            © 2026 MOHAN Foundation. All Rights Reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.75)] flex items-center justify-center text-[#475569] hover:bg-[#D93A43] hover:text-white hover:-translate-y-1 transition-all duration-300 border border-[rgba(0,0,0,0.05)] shadow-sm backdrop-blur-[10px]"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
