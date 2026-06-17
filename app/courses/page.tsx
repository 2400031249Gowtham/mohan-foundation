// app/courses/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { professionalCourses, generalCourses, Course } from '@/data/courses';

// Combine courses, ensuring the Transplant Coordination Professional Certificate is first
const allCourses: Course[] = [...professionalCourses, ...generalCourses];

export default function CoursesPage() {
  return (
    <section className="min-h-screen bg-mf-cream py-12 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-center text-4xl font-serif text-mf-dark mb-8">
          Our Courses
        </h1>
        <p className="text-center text-mf-mid mb-12 max-w-2xl mx-auto">
          Explore the full catalog of MOHAN Foundation e‑learning courses. Each program is
          CPD‑accredited and designed for healthcare professionals and the public.
        </p>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {allCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white/70 backdrop-blur-md rounded-[20px] border border-white shadow-[0_10px_30px_rgba(26,47,94,0.03)] transition-all duration-300 flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative aspect-video w-full rounded-t-[20px] overflow-hidden bg-[#e2e8f0]">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  draggable={false}
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="font-bold text-xl text-mf-dark mb-1">
                  {course.title}
                </h2>
                
                <div className="text-mf-dark font-medium text-[0.85rem] mb-3">
                  {course.registrationStatus}
                </div>

                <div className="flex items-center justify-between bg-black/5 rounded-[8px] px-4 py-2.5 mb-3">
                  <span className="flex items-center gap-1.5 font-bold text-[0.85rem] text-mf-dark">
                    <Clock size={14} className="text-mf-red" /> {course.duration}
                  </span>
                  <span className="font-bold text-[0.85rem] text-mf-dark">
                    {course.price}
                  </span>
                </div>

                <p className="text-sm text-mf-mid mb-4 line-clamp-2 flex-grow">
                  {course.description}
                </p>

                <div className="mt-auto flex items-center justify-center pt-2">
                  <Link
                    href={`/courses/${course.id}`}
                    className="inline-flex justify-center items-center bg-[#1E1B7A] hover:bg-[#15125A] hover:scale-[1.02] text-white px-8 py-3 rounded-full text-[0.9rem] font-bold transition-all duration-300"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
