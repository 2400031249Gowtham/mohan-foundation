'use client';

import React from 'react';
import { Phone, ArrowRight, MessageCircle, Mail } from 'lucide-react';
import Link from 'next/link';
import DnaBackground from './DnaBackground';

export default function AboutUsSection() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden relative">
      <DnaBackground className="opacity-[0.04]" />
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN: Visual Area */}
          <div className="relative">
            {/* Main Card with Rings */}
            <div className="bg-gradient-to-br from-mf-navy to-mf-navy-light rounded-[28px] aspect-[4/3] flex items-center justify-center relative overflow-hidden shadow-[0_30px_70px_rgba(26,47,94,0.25)] border border-white/10">
              <div className="absolute rounded-full border border-white/10 w-[350px] h-[350px] animate-[spin-cw_20s_linear_infinite]"></div>
              <div className="absolute rounded-full border border-white/10 w-[250px] h-[250px] animate-[spin-ccw_14s_linear_infinite]"></div>
              <div className="absolute rounded-full border border-white/10 w-[160px] h-[160px] animate-[spin-cw_10s_linear_infinite]"></div>
              
              <div className="text-center text-white z-10 relative">
                <div className="text-[4rem] animate-[lhb_2s_ease-in-out_infinite]">❤️</div>
                <div className="font-serif font-bold text-[1.3rem] mt-2 leading-tight">
                  Multi Organ<br/>Harvesting Aid<br/>Network
                </div>
                <div className="text-[0.75rem] opacity-60 mt-2">Saving Lives One Pledge at a Time</div>
              </div>
            </div>

            {/* Est Badge */}
            <div className="absolute -bottom-6 -left-6 bg-mf-red text-white rounded-[18px] px-6 py-5 shadow-[0_12px_35px_rgba(200,48,58,0.35)]">
              <div className="font-serif text-[2.2rem] font-black leading-none">1997</div>
              <div className="text-[0.7rem] opacity-80 mt-1">Est. Year</div>
              <div className="text-[0.65rem] opacity-70 mt-0.5">Of Service to Life</div>
            </div>

            {/* Quote Badge */}
            <div className="absolute right-[-1.5rem] top-[40%] -translate-y-1/2 bg-white/90 backdrop-blur-md border border-white/50 rounded-[16px] p-4 max-w-[200px] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="text-[2rem] text-mf-red/20 font-serif leading-none mb-1">"</div>
              <div className="text-[0.7rem] text-mf-mid leading-relaxed italic">
                Our mission is to promote and facilitate ethical organ donation and transplantation, creating a world where no patient dies for want of an organ.
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Content */}
          <div className="w-full">
            <div className="inline-flex items-center gap-2 bg-mf-red/10 border border-mf-red/20 text-mf-red px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold tracking-[0.08em] mb-3.5">
              ABOUT US
            </div>
            
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold text-mf-dark leading-[1.1] mb-3">
              MOHAN Foundation<br/>
              <span className="bg-gradient-to-br from-mf-red to-mf-gold bg-clip-text text-transparent italic">Empowers Lives.</span>
            </h2>
            
            <p className="text-mf-mid text-[1rem] leading-[1.75] mb-3">
              MOHAN Foundation (Multi Organ Harvesting Aid Network) is a not-for-profit NGO established in 1997, dedicated to creating a supportive ecosystem for deceased organ donations in India.
            </p>
            <p className="text-mf-mid text-[1rem] leading-[1.75] mb-7">
              We promote ethical organ donation and transplantation through education, training, and public awareness — <strong className="text-mf-dark font-bold">saving lives one pledge at a time.</strong>
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-7">
              <div className="bg-mf-soft rounded-[14px] p-4 border border-black/5 hover:bg-white hover:shadow-[0_6px_20px_rgba(26,47,94,0.08)] hover:-translate-y-1 transition-all">
                <div className="w-9 h-9 rounded-[10px] bg-[#fee2e2] flex items-center justify-center text-[1rem] mb-2.5">📖</div>
                <div className="font-bold text-[0.85rem] text-mf-dark mb-1">Professional Training</div>
                <div className="text-[0.75rem] text-mf-light leading-[1.5]">CPD-accredited courses for healthcare professionals in organ donation and transplantation.</div>
              </div>
              <div className="bg-mf-soft rounded-[14px] p-4 border border-black/5 hover:bg-white hover:shadow-[0_6px_20px_rgba(26,47,94,0.08)] hover:-translate-y-1 transition-all">
                <div className="w-9 h-9 rounded-[10px] bg-[#d1fae5] flex items-center justify-center text-[1rem] mb-2.5">🌐</div>
                <div className="font-bold text-[0.85rem] text-mf-dark mb-1">National Reach</div>
                <div className="text-[0.75rem] text-mf-light leading-[1.5]">Building India-wide awareness and an ethical ecosystem for deceased organ donation since 1997.</div>
              </div>
              <div className="bg-mf-soft rounded-[14px] p-4 border border-black/5 hover:bg-white hover:shadow-[0_6px_20px_rgba(26,47,94,0.08)] hover:-translate-y-1 transition-all">
                <div className="w-9 h-9 rounded-[10px] bg-[#fef3c7] flex items-center justify-center text-[1rem] mb-2.5">🏅</div>
                <div className="font-bold text-[0.85rem] text-mf-dark mb-1">CPD Accredited</div>
                <div className="text-[0.75rem] text-mf-light leading-[1.5]">Formal CPD certificates issued post-training to fulfil mandatory and reflective CPD requirements.</div>
              </div>
              <div className="bg-mf-soft rounded-[14px] p-4 border border-black/5 hover:bg-white hover:shadow-[0_6px_20px_rgba(26,47,94,0.08)] hover:-translate-y-1 transition-all">
                <div className="w-9 h-9 rounded-[10px] bg-[#e0e7ff] flex items-center justify-center text-[1rem] mb-2.5">👥</div>
                <div className="font-bold text-[0.85rem] text-mf-dark mb-1">Community Impact</div>
                <div className="text-[0.75rem] text-mf-light leading-[1.5]">Over 12,000+ trained professionals actively contributing to India's transplant ecosystem.</div>
              </div>
            </div>

            {/* Call to Actions - Preserving Links */}
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href="/enquire-us" 
                className="bg-mf-red hover:bg-mf-red-light text-white px-6 py-3 rounded-full font-bold text-[0.85rem] transition-all shadow-[0_8px_25px_rgba(200,48,58,0.35)] hover:-translate-y-px"
              >
                Discover More →
              </Link>
              <a 
                href="https://wa.me/916374773957"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1ebd5a] text-white px-6 py-3 rounded-full font-bold text-[0.85rem] flex items-center gap-2 transition-all shadow-md hover:-translate-y-px"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href="tel:+916374773957" className="bg-mf-navy/10 hover:bg-mf-navy/15 text-mf-navy px-6 py-3 rounded-full font-bold text-[0.85rem] transition-all hover:-translate-y-px flex items-center gap-2">
                <Phone size={14}/> Call Now
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}