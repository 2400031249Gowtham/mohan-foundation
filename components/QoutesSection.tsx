"use client";

import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ThrivingSection() {
  const sectionRef = useRef(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const textRef = useRef(null);

  useEffect(() => {
    // Animate text block on scroll
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );

    // Animate each card with slight stagger
    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  const cards = [
    { icon: "🙌", title: "HAPPY CLIENT" },
    { icon: "🖐️✨", title: "WORKERS HAND" },
    { icon: "👥⚙️", title: "ACTIVE EXPERTS" },
  ];

  return (
    <section
      className="relative text-black py-16 px-6 md:px-20 overflow-hidden"
      ref={sectionRef}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-fixed z-0" />

      {/* Dark blue overlay */}
      <div className="absolute inset-0 bg-[#203c7c]/70 z-10" />

      {/* Center Content */}
      <div className="relative z-20 flex items-center justify-center min-h-[260px]">
        <div ref={textRef} className="text-center max-w-2xl px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-snug mb-5">
            Every Life Saved Begins<br className="hidden md:block" /> with the Right Knowledge.
          </h2>
          <p className="text-white/75 text-sm md:text-base leading-relaxed mb-8">
            Join thousands of healthcare professionals trained by MOHAN Foundation — India's pioneer in organ donation education. Our CPD-accredited courses in Transplant Coordination, Brainstem Death, Legal Aspects, and more equip you to make a real difference.
          </p>
          <button className="bg-[#d3222a] hover:bg-red-800 text-white font-semibold px-7 py-3 rounded transition-colors text-sm">
            Explore Our Courses
          </button>
        </div>
      </div>


    </section>
  );
}
