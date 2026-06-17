'use client';

import Link from 'next/link';

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
  { label: 'Instagram', Icon: IconInstagram, href: 'https://instagram.com/mohanfoundation' },
  { label: 'Facebook',  Icon: IconFacebook, href: 'https://facebook.com/mohanfoundation' },
  { label: 'LinkedIn',  Icon: IconLinkedIn, href: 'https://linkedin.com/company/mohanfoundation' },
  { label: 'YouTube',   Icon: IconYouTube, href: 'https://youtube.com/mohanfoundation' },
  { label: 'Twitter/X', Icon: IconX, href: 'https://twitter.com/mohanfoundation' },
];

const aboutLinks = [
  { label: 'About Us', href: '/#about' },
  { label: 'Our Team', href: '/#team' },
];

const guidanceLinks = [
  { label: 'FAQs', href: '/faqs' },
  { label: 'Enquiry', href: '/enquire-us' },
];

const legalLinks = [
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Copyright Acknowledgement', href: '/terms' },
];

const policyLinks = [
  { label: 'Complaint Policy & Procedures', href: '/privacy-policy' },
  { label: 'Data Protection & Privacy Policy', href: '/privacy-policy' },
  { label: 'Digital Health & Safety Policy', href: '/privacy-policy' },
  { label: 'Disability & Discrimination Policy', href: '/privacy-policy' },
  { label: 'Equal Treatment Policy', href: '/privacy-policy' },
  { label: 'Money-back Guarantee Policy', href: '/privacy-policy' },
];

const bottomPolicies = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Refund Policy', href: '/privacy-policy' },
];

export default function FooterSection() {
  return (
    <footer className="bg-[#FAF8F4] text-[#475569] font-sans border-t border-[rgba(0,0,0,0.06)] relative overflow-hidden">
      
      {/* Decorative Blur Backgrounds & Textures for premium feel */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#16213E 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#D93A43]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[20%] w-[300px] h-[300px] bg-[#16213E]/3 rounded-full blur-[80px] pointer-events-none" />

      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#5B2333] via-[#D93A43] to-[#A23B4B] z-20" />

      <div className="container-fluid max-w-[1440px] mx-auto px-6 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr_1.8fr] gap-10 lg:gap-8">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col items-start gap-6 lg:pr-6">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <img
                src="/logo.png"
                alt="MOHAN Foundation"
                className="h-[55px] w-auto object-contain"
              />
            </Link>
            
            <a href="https://directory.cpdstandards.com/providers/mohan-foundation/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-[16px] bg-[rgba(255,255,255,0.9)] border border-[#e5e7eb] rounded-[16px] px-[18px] py-[14px] shadow-md hover:shadow-lg hover:-translate-y-[2px] transition-all duration-300 cursor-pointer mt-2 w-[max-content] min-w-[280px] max-w-[320px] h-[86px] -ml-3 lg:-ml-4">
              <img src="/cpd-badge-new.png" alt="CPD Badge" className="w-[58px] h-[58px] object-contain shrink-0 mix-blend-multiply" />
              <div className="flex flex-col justify-center">
                <span className="text-[18px] font-bold leading-[1.1] text-[#1E2548]">CPD Standards Office</span>
                <span className="text-[13.5px] leading-tight text-[#00A0E3] mt-1">The Educator's Trustmark</span>
              </div>
            </a>

            
            <div className="flex items-center gap-3 mt-1">
              {socials.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#64748B] hover:bg-[#D93A43] hover:text-white hover:-translate-y-1 transition-all duration-300 border border-gray-200 shadow-sm"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: About */}
          <div className="flex flex-col gap-5 lg:border-l lg:border-[rgba(0,0,0,0.06)] lg:pl-8">
            <h4 className="text-[0.85rem] font-bold tracking-[0.1em] text-[#1E2548] uppercase">About</h4>
            <ul className="flex flex-col gap-3">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[0.9rem] text-[#64748B] hover:text-[#D93A43] hover:translate-x-1 inline-flex transition-all duration-300 font-medium whitespace-nowrap">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Guidance */}
          <div className="flex flex-col gap-5 lg:border-l lg:border-[rgba(0,0,0,0.06)] lg:pl-8">
            <h4 className="text-[0.85rem] font-bold tracking-[0.1em] text-[#1E2548] uppercase">Guidance</h4>
            <ul className="flex flex-col gap-3">
              {guidanceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[0.9rem] text-[#64748B] hover:text-[#D93A43] hover:translate-x-1 inline-flex transition-all duration-300 font-medium whitespace-nowrap">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="flex flex-col gap-5 lg:border-l lg:border-[rgba(0,0,0,0.06)] lg:pl-8">
            <h4 className="text-[0.85rem] font-bold tracking-[0.1em] text-[#1E2548] uppercase">Legal</h4>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[0.9rem] text-[#64748B] hover:text-[#D93A43] hover:translate-x-1 inline-flex transition-all duration-300 font-medium whitespace-nowrap">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Policies */}
          <div className="flex flex-col gap-5 lg:border-l lg:border-[rgba(0,0,0,0.06)] lg:pl-8">
            <h4 className="text-[0.85rem] font-bold tracking-[0.1em] text-[#1E2548] uppercase">Policies</h4>
            <ul className="flex flex-col gap-3 overflow-visible">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[0.9rem] text-[#64748B] hover:text-[#D93A43] hover:translate-x-1 inline-flex transition-all duration-300 font-medium whitespace-nowrap">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Contact Info Cards */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {/* Card 1: Email */}
          <a 
            href="mailto:elearning@mohanfoundation.org"
            className="flex flex-col items-center justify-center text-center bg-white border border-[#e2e8f0] rounded-[24px] px-6 py-8 shadow-sm hover:shadow-lg hover:-translate-y-[4px] transition-all duration-300 cursor-pointer group"
          >
            <div className="w-[48px] h-[48px] rounded-full border border-[rgba(217,58,67,0.15)] bg-[rgba(217,58,67,0.03)] flex items-center justify-center text-[#D93A43] mb-4 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px]">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <span className="text-[11px] font-bold tracking-[0.08em] text-[#64748B] uppercase mb-1.5">Email Us</span>
            <span className="text-[14px] sm:text-[15px] font-bold text-[#1E2548] leading-tight group-hover:text-[#D93A43] transition-colors duration-300 break-all max-w-full">
              elearning@mohanfoundation.org
            </span>
          </a>

          {/* Card 2: Call Us */}
          <a 
            href="tel:+916374773957"
            className="flex flex-col items-center justify-center text-center bg-white border border-[#e2e8f0] rounded-[24px] px-6 py-8 shadow-sm hover:shadow-lg hover:-translate-y-[4px] transition-all duration-300 cursor-pointer group"
          >
            <div className="w-[48px] h-[48px] rounded-full border border-[rgba(217,58,67,0.15)] bg-[rgba(217,58,67,0.03)] flex items-center justify-center text-[#D93A43] mb-4 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px]">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold tracking-[0.08em] text-[#64748B] uppercase mb-1.5">Call Us</span>
            <span className="text-[14px] sm:text-[15px] font-bold text-[#1E2548] leading-tight group-hover:text-[#D93A43] transition-colors duration-300 break-all max-w-full">
              +91 63747 73957
            </span>
          </a>

          {/* Card 3: Whatsapp */}
          <a 
            href="https://wa.me/919677202908"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center text-center bg-white border border-[#e2e8f0] rounded-[24px] px-6 py-8 shadow-sm hover:shadow-lg hover:-translate-y-[4px] transition-all duration-300 cursor-pointer group"
          >
            <div className="w-[48px] h-[48px] rounded-full border border-[rgba(217,58,67,0.15)] bg-[rgba(217,58,67,0.03)] flex items-center justify-center text-[#D93A43] mb-4 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px]">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold tracking-[0.08em] text-[#64748B] uppercase mb-1.5">Whatsapp</span>
            <span className="text-[14px] sm:text-[15px] font-bold text-[#1E2548] leading-tight group-hover:text-[#D93A43] transition-colors duration-300 break-all max-w-full">
              +91 96772 02908
            </span>
          </a>

          {/* Card 4: Toll Free */}
          <a 
            href="tel:18001037100"
            className="flex flex-col items-center justify-center text-center bg-white border border-[#e2e8f0] rounded-[24px] px-6 py-8 shadow-sm hover:shadow-lg hover:-translate-y-[4px] transition-all duration-300 cursor-pointer group"
          >
            <div className="w-[48px] h-[48px] rounded-full border border-[rgba(217,58,67,0.15)] bg-[rgba(217,58,67,0.03)] flex items-center justify-center text-[#D93A43] mb-4 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px]">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                <path d="M14.05 2a9 9 0 0 1 8 8" />
                <path d="M14.05 6A5 5 0 0 1 18 10" />
              </svg>
            </div>
            <span className="text-[11px] font-bold tracking-[0.08em] text-[#64748B] uppercase mb-1.5">Toll Free</span>
            <span className="text-[14px] sm:text-[15px] font-bold text-[#1E2548] leading-tight group-hover:text-[#D93A43] transition-colors duration-300 break-all max-w-full">
              1800-103-7100
            </span>
          </a>
        </div>
      </div>

      {/* Bottom Bar: Policies & Copyright */}
      <div className="border-t border-[#E2E8F0] py-5 bg-white relative z-10">
        <div className="container-fluid max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-[#64748B] text-[0.85rem] font-medium">
            © 2025 MOHAN Foundation. All Rights Reserved.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {bottomPolicies.map((link, i) => (
              <div key={link.label} className="flex items-center gap-4 sm:gap-6">
                <Link href={link.href} className="text-[0.85rem] text-[#64748B] hover:text-[#D93A43] transition-colors font-medium whitespace-nowrap">
                  {link.label}
                </Link>
                {i < bottomPolicies.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-[#CBD5E1]"></span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
