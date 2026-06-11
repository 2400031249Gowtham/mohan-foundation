import { allCourses } from '@/data/courses';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import FooterSection from '@/components/FooterSection';
import { Clock, BookOpen, Star, CheckCircle, ArrowRightCircle } from 'lucide-react';

export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const course = allCourses.find(c => c.id === resolvedParams.id);
  if (!course) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col pt-[120px]">
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

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-[120px]">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#FAF8F4] to-[#F5F1EB] py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center relative z-10">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <span className="inline-block bg-[rgba(255,255,255,0.75)] text-[#D93A43] border border-white/50 text-sm font-bold px-4 py-2 rounded-lg self-start backdrop-blur-[20px] shadow-sm">
              {course.tag}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#16213E] leading-tight">
              {course.title}
            </h1>
            <p className="text-lg text-[#475569] leading-relaxed">
              {course.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 mt-2 text-sm font-medium text-[#334155]">
              <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-[#D93A43]" />
                <span>{course.lessons} Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-[#D93A43]" />
                <span>{course.weeks} Weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={18}
                      className={j < course.rating ? "text-[#F59E0B] fill-[#F59E0B]" : "text-gray-300 fill-gray-300"}
                    />
                  ))}
                </div>
                <span>({course.reviews} Reviews)</span>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <span className="text-4xl font-extrabold text-[#D93A43]">{course.price}</span>
              <Link 
                href={`/register?course=${encodeURIComponent(course.title)}`}
                className="bg-[#d3222a] hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Register Now <ArrowRightCircle size={20} />
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.9)] border-[6px] border-white">
              <Image 
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="w-full lg:w-2/3 flex flex-col gap-12">
            
            <div>
              <h2 className="text-2xl font-extrabold text-[#1a2744] mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#203c7c]/10 flex items-center justify-center text-[#203c7c]">1</span>
                Course Objectives
              </h2>
              <ul className="flex flex-col gap-4">
                {course.objectives?.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
                    <CheckCircle className="text-[#d3222a] shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700 leading-relaxed font-medium">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-extrabold text-[#1a2744] mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#203c7c]/10 flex items-center justify-center text-[#203c7c]">2</span>
                Key Benefits & Outcomes
              </h2>
              <ul className="flex flex-col gap-4">
                {course.benefits?.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700 leading-relaxed font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sticky top-[150px]">
              <h3 className="text-xl font-extrabold text-[#1a2744] mb-6 border-b border-gray-100 pb-4">Course Information</h3>
              
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-2">Eligibility</h4>
                  <p className="text-gray-900 font-bold leading-snug">{course.eligibility}</p>
                </div>
                
                <div className="h-px bg-gray-100"></div>

                <div>
                  <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-2">Certificate</h4>
                  <p className="text-gray-900 font-bold leading-snug">{course.certificate}</p>
                </div>
                
                <div className="h-px bg-gray-100"></div>

                <div>
                  <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-2">CPD Accreditation</h4>
                  <p className="text-[#203c7c] font-extrabold leading-snug">{course.cpdAccreditation}</p>
                </div>
              </div>
              
              <div className="mt-10">
                <Link 
                  href={`/register?course=${encodeURIComponent(course.title)}`}
                  className="w-full bg-[#d3222a] hover:bg-red-800 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  Register Now <ArrowRightCircle size={20} />
                </Link>
                <p className="text-center text-xs font-bold text-gray-400 mt-4 uppercase tracking-wide">Spots fill up quickly</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <FooterSection />
    </main>
  );
}
