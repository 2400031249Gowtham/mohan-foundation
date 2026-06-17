import { allCourses } from '@/data/courses';
import { notFound } from 'next/navigation';
import FooterSection from '@/components/FooterSection';
import CourseDetailsClient from '@/components/CourseDetailsClient';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const course = allCourses.find(c => c.id === resolvedParams.id);
  
  if (!course) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col pt-0">
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <BookOpen className="text-[#d3222a]" size={48} />
          </div>
          <h1 className="text-4xl font-extrabold text-[#1a2744] mb-4">Course Not Found</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            We couldn't find the course you were looking for. It may have been removed or the URL might be incorrect.
          </p>
          <Link 
            href="/"
            className="bg-[#203c7c] hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-xl transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
        <FooterSection />
      </main>
    );
  }

  // Filter similar courses (recommending other courses)
  const similarCourses = allCourses.filter(c => c.id !== course.id);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-0">
      <CourseDetailsClient course={course} similarCourses={similarCourses} />
      <FooterSection />
    </main>
  );
}
