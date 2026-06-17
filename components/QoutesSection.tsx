"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  "/slider/slide1.png",
  "/slider/slide2.png",
  "/slider/slide3.png",
  "/slider/slide4.png",
];

export default function QoutesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Automatic transition every 5 seconds
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-[#0A1128] border-y border-gray-800">
      {/* Slideshow */}
      {slides.map((src, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Blurred Background to fill empty spaces nicely if the image aspect ratio doesn't perfectly match */}
            <div className="absolute inset-0">
              <Image 
                src={src} 
                alt="" 
                fill 
                className="object-cover opacity-20 blur-xl scale-125"
                unoptimized
              />
            </div>

            {/* Ken Burns Effect Wrapper */}
            <div
              className={`absolute inset-0 w-full h-full transition-transform duration-[6000ms] ease-out will-change-transform ${
                isActive ? "scale-105" : "scale-100"
              }`}
            >
              <Image
                src={src}
                alt={`MOHAN Foundation slide ${index + 1}`}
                fill
                priority={index === 0} // Preload the first slide to avoid flashing
                className="object-contain md:object-cover object-center md:px-0 md:py-0 px-2 py-4"
                sizes="100vw"
                quality={100}
                unoptimized
              />
            </div>
          </div>
        );
      })}

      {/* Very Light Gradient Overlay (Only enough for button readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-20 pointer-events-none" />
      
      {/* Subtle Vignette Overlay for framing */}
      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)] z-20 pointer-events-none" />

      {/* Button Container (Bottom Center) */}
      <div className="absolute bottom-0 left-0 w-full pb-10 md:pb-16 z-30 flex justify-center items-end">
        <Link 
          href="/courses" 
          className="bg-[#d3222a] hover:bg-red-800 text-white font-semibold px-10 py-4 rounded-md transition-all text-sm md:text-base tracking-wide inline-block shadow-[0_4px_14px_0_rgba(211,34,42,0.39)] hover:shadow-[0_6px_20px_rgba(211,34,42,0.23)] hover:-translate-y-1"
        >
          Explore Our Courses
        </Link>
      </div>
    </section>
  );
}
