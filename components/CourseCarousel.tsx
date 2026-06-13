'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  MessageCircle,
  Star,
  ArrowRightCircle
} from 'lucide-react';

import { Course } from '../data/courses';

interface CourseCarouselProps {
  heading: string;
  courses: Course[];
  direction?: 'forward' | 'reverse';
}

const GAP = 24; // gap-6 = 24px

export default function CourseCarousel({ heading, courses, direction = 'forward' }: CourseCarouselProps) {
  const total = courses.length;
  const tripled = [...courses, ...courses, ...courses];

  // Reverse starts at the END of the middle copy so goPrev has a full set to scroll through
  const [index, setIndex] = useState(direction === 'reverse' ? total * 2 - 1 : total);
  const [animated, setAnimated] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [cardSlot, setCardSlot] = useState(0);
  const firstCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      if (firstCardRef.current) {
        setCardSlot(firstCardRef.current.offsetWidth + GAP);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const silentJump = useCallback((newIndex: number) => {
    setAnimated(false);
    setIndex(newIndex);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimated(true));
    });
  }, []);

  const goNext = useCallback(() => setIndex(i => i + 1), []);
  const goPrev = useCallback(() => setIndex(i => i - 1), []);

  useEffect(() => {
    if (index >= total * 2) {
      const t = setTimeout(() => silentJump(index - total), 500);
      return () => clearTimeout(t);
    }
    if (index < total) {
      const t = setTimeout(() => silentJump(index + total), 500);
      return () => clearTimeout(t);
    }
  }, [index, total, silentJump]);

  // Memoized so the effect dependency is stable across re-renders
  const autoStep = useCallback(() => {
    setIndex(i => direction === 'reverse' ? i - 1 : i + 1);
  }, [direction]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(autoStep, 4000);
    return () => clearInterval(timer);
  }, [isHovered, autoStep]);

  return (
    <div className="container-fluid">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <h2 className="text-2xl font-bold text-gray-800">
          {heading}
        </h2>

        <div className="flex gap-3 mt-6 md:mt-0">
          <button
            onClick={goPrev}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-sm ${
              direction === 'reverse'
                ? 'bg-[#203c7c] text-white hover:bg-blue-900 shadow-md'
                : 'border border-gray-300 text-gray-600 hover:bg-[#203c7c] hover:text-white hover:border-[#203c7c]'
            }`}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goNext}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              direction === 'reverse'
                ? 'border border-gray-300 text-gray-600 hover:bg-[#203c7c] hover:text-white hover:border-[#203c7c] shadow-sm'
                : 'bg-[#203c7c] text-white hover:bg-blue-900 shadow-md'
            }`}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="overflow-hidden transition-opacity duration-500"
        style={{ opacity: cardSlot > 0 ? 1 : 0 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={animated ? 'flex gap-6 transition-transform duration-500 ease-in-out' : 'flex gap-6'}
          style={{
            transform: cardSlot ? `translateX(-${index * cardSlot}px)` : undefined,
            willChange: 'transform',
          }}
        >
          {tripled.map((course, i) => (
            <div
              key={`${course.id}-${i}`}
              ref={i === 0 ? firstCardRef : undefined}
              className="w-[85vw] max-w-[400px] shrink-0 flex flex-col bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 overflow-hidden group"
            >
              <div className="aspect-video w-full overflow-hidden relative shrink-0">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={i < 3}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-[clamp(1rem,3vw,1.5rem)] flex flex-col flex-grow">
                <span className="inline-block bg-[#e8ecf4] text-[#203c7c] text-xs font-bold px-3 py-1.5 rounded-md mb-4">
                  {course.tag}
                </span>

                <h3 className="text-[clamp(1rem,2vw,1.15rem)] font-extrabold text-gray-900 mb-4 leading-snug">
                  {course.title}
                </h3>

                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={16} className="text-gray-400" />
                    <span>{course.lessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-gray-400" />
                    <span>{course.weeks} Week</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle size={16} className="text-gray-400" />
                    <span>Group Chat</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className={j < course.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({course.reviews} Reviews)</span>
                </div>

                <div className="h-px w-full bg-gray-100 mb-6 mt-auto"></div>

                <div className="flex items-center justify-between">
                  <Link 
                    href={`/courses/${course.id}`}
                    className="flex items-center gap-2 bg-[#203c7c] hover:bg-blue-900 text-white px-5 py-2.5 rounded-md font-semibold text-[clamp(0.75rem,1.5vw,0.85rem)] transition-colors relative z-[100]"
                  >
                    Register Now
                    <ArrowRightCircle size={18} className="text-white/80" />
                  </Link>
                  <span className="text-xl font-extrabold text-gray-900">
                    {course.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
