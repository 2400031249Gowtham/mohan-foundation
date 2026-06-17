'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, BookOpen, CreditCard, Award, Globe, 
  ChevronLeft, ChevronRight, Clock, CheckCircle, Download
} from 'lucide-react';
import EnquiryModal from './EnquiryModal';
import { Course } from '@/data/courses';

interface CourseDetailsClientProps {
  course: Course;
  similarCourses: Course[];
}

export default function CourseDetailsClient({ course, similarCourses }: CourseDetailsClientProps) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [feedbackIndex, setFeedbackIndex] = useState(0);

  // Derive display tags
  const isProfessional = course.tag.includes('Professional') || 
                         course.tag.includes('Organ Donation') || 
                         course.tag.includes('Legal') || 
                         course.tag.includes('Transplant') ||
                         course.id !== '9' && course.id !== '10' && course.id !== '11' && course.id !== '12' && course.id !== '13';

  const categoryLabel = isProfessional ? 'Courses for Professionals' : 'Courses for General Public';

  // Compute CPD Hours badge text dynamically
  const getCpdHours = (id: string, cpdText: string) => {
    if (id === '3') return '100 CPD Hours';
    if (id === '4') return '480 CPD Hours';
    if (cpdText?.toLowerCase().includes('not applicable')) return null;
    
    // Extract credit numbers from text if available
    const match = cpdText?.match(/\d+/);
    if (match) {
      const credits = parseInt(match[0], 10);
      return `${credits * 3} CPD Hours`;
    }
    return '20 CPD Hours';
  };

  const cpdHoursLabel = getCpdHours(course.id, course.cpdAccreditation || '');

  // Compute dynamic batch dates
  const nextBatchDate = isProfessional ? 'July 6, 2026' : 'Immediate Enrollment';
  const regDeadline = isProfessional ? 'July 3, 2026' : 'Self-Paced Learning';

  // Dynamic Specs computing
  const getSpecs = () => {
    let duration = `${course.weeks || 4} Week${(course.weeks || 4) > 1 ? 's' : ''}`;
    let studyHours = '';
    
    if (course.id === '3') {
      duration = '6 Weeks';
      studyHours = ' (Study Hours: 100 Hours)';
    } else if (course.id === '4') {
      duration = '1 Year';
      studyHours = ' (Study Hours: 480 Hours)';
    } else if (course.weeks) {
      studyHours = ` (Study Hours: ${course.weeks * 15} Hours)`;
    }

    let feeDetails = {
      india: course.price,
      intl: isProfessional ? '$99.99' : '$4.99',
      annual: '',
      candidatesIndia: '',
      candidatesIntl: ''
    };

    if (course.id === '3') {
      feeDetails.intl = 'International students: $99.99';
      feeDetails.annual = 'Annual Subscription (for candidates enrolled in this course only)';
      feeDetails.candidatesIndia = 'Candidates from India - Fee - ₹ 500';
      feeDetails.candidatesIntl = 'International students - Fee - $ 10';
    } else if (course.id === '4') {
      feeDetails.intl = 'International students: $399.99';
      feeDetails.annual = 'Annual Subscription (for candidates enrolled in this course only)';
      feeDetails.candidatesIndia = 'Candidates from India - Fee - ₹ 1,500';
      feeDetails.candidatesIntl = 'International students - Fee - $ 40';
    } else {
      const numericPrice = parseInt(course.price.replace(/[^\d]/g, ''), 10) || 499;
      const usdPrice = Math.round(numericPrice / 40);
      feeDetails.intl = `International students: $${usdPrice > 0 ? usdPrice - 0.01 : '9.99'}`;
    }

    return {
      duration: `${duration}${studyHours}`,
      structure: isProfessional ? 'Online Modules & Webinars' : 'Online Self-paced Modules',
      fee: feeDetails,
      certification: 'Online Certificate',
      medium: course.id === '13' ? 'Hindi' : 'English'
    };
  };

  const specs = getSpecs();

  // Dynamic Curriculum Modules mapping
  const getCurriculumModules = () => {
    if (course.id === '3') {
      return [
        { title: 'Module 1: Introduction to Organ & Tissue Donation', topics: ['Global and national organ donation scenario', 'History of transplantation', 'Role of MOHAN Foundation'] },
        { title: 'Module 2: Brainstem Death Identification & Certification', topics: ['Pathophysiology of brain death', 'Clinical testing and apnea tests', 'THOA Act certification protocols'] },
        { title: 'Module 3: Deceased Donor Counselling & Consent', topics: ['Grief counseling principles', 'Approaching grieving families with empathy', 'Consent forms and legal approvals'] },
        { title: 'Module 4: Donor Management & Optimisation', topics: ['Physiological changes in brain death', 'Maintaining organ perfusion and oxygenation', 'Critical care management of potential donors'] },
        { title: 'Module 5: Organ Retrieval, Preservation & Allocation', topics: ['Surgical retrieval procedures', 'Cold storage techniques and preservation solutions', 'NOTTO allocation guidelines'] },
        { title: 'Module 6: Role of Transplant Coordinator', topics: ['Medico-legal procedures and police inquests', 'Green corridors & transport coordination', 'Documentation and data preservation'] },
      ];
    }
    if (course.id === '4') {
      return [
        { title: 'Module 1: Foundations of Organ Transplantation & Anatomy', topics: ['Immunology and histocompatibility', 'Anatomy and physiology of transplantable organs', 'End-stage organ disease pathology'] },
        { title: 'Module 2: The Legal and Ethical Matrix (THOA Act)', topics: ['THOA Act 1994 and amendments', 'Authorization committees, role, and functioning', 'Ethical challenges in living and deceased organ allocation'] },
        { title: 'Module 3: Advanced Grief Counselling & Psycho-Social Aspects', topics: ['Crisis intervention models', 'Techniques in family approach and counseling', 'Cultural and religious perspectives on donation'] },
        { title: 'Module 4: Clinical Coordination & Donor Care', topics: ['Donor identification, evaluation, and selection', 'Brain death protocols & clinical certification', 'ICU donor maintenance protocols'] },
        { title: 'Module 5: Surgical Retrieval & Cold Chain Management', topics: ['Organ harvesting steps', 'Preservation solutions & ischemic times', 'Logistics of organ transport and green corridor systems'] },
        { title: 'Module 6: Research Methodology & Hospital Administration', topics: ['Statistical analysis in donation data', 'Setting up organ donation programs in hospitals', 'Dissertation and field visit presentations'] },
      ];
    }
    return [
      { title: 'Module 1: Foundational Concepts', topics: ['Introduction to the topic', 'Core concepts and background study', 'Basic definitions and structure'] },
      { title: 'Module 2: Legal and Ethical Framework', topics: ['Key regulations and policy details', 'Ethical concerns and decision making', 'Compliances and certifications'] },
      { title: 'Module 3: Practical Implementation & Workflow', topics: ['Real-world applications and workflows', 'Role of coordinators and physicians', 'SOPs and documentation'] },
      { title: 'Module 4: Summary and Final Assessment', topics: ['Review of all lessons', 'Q&A session prep', 'Final online test instructions'] },
    ];
  };

  const curriculum = getCurriculumModules();

  // Testimonials database
  const getTestimonials = () => {
    const defaultTestimonials = [
      {
        name: 'Mrs. Meethu P Sebastian',
        role: 'DSRC COUNSELLOR',
        location: 'Kerala, India',
        courseCode: 'TCPC',
        rating: 5,
        period: 'October - November 2025',
        text: 'I would like to express my sincere appreciation to the MOHAN Foundation for providing such an informative and well-structured transplant coordination course. It has greatly enhanced my professional skills and given me the confidence to support donor families.'
      },
      {
        name: 'Mr. Vinothkumar V',
        role: 'MEDICAL SOCIAL WORKER',
        location: 'Bharath Hospital, Chennai',
        courseCode: 'TCPC',
        rating: 5,
        period: 'September - October 2025',
        text: 'This is an excellent platform for healthcare professionals who wish to contribute meaningfully to the organ transplantation field. The online modules are highly comprehensive and the webinars are highly interactive.'
      },
      {
        name: 'Dr. Kriti Sancheti',
        role: 'HEALTHCARE LAWYER',
        location: 'Jivandeep Health Services, Durg',
        courseCode: 'LAD',
        rating: 5,
        period: 'August - September 2025',
        text: 'Being a legal professional, this course provided me an in-depth knowledge regarding different aspects and prospects of organ transplantation, which is crucial for handling complex authorization cases.'
      }
    ];

    if (course.id === '3') return defaultTestimonials;
    
    return [
      {
        name: 'Mrs. Meethu P Sebastian',
        role: 'DSRC COUNSELLOR',
        location: 'Kerala, India',
        courseCode: course.id === '4' ? 'PGDTC' : 'MOHAN',
        rating: 5,
        period: 'October - November 2025',
        text: `The course contents for ${course.title} are incredibly rich and informative. The online learning portal makes it flexible to study while balancing work, and the webinars clear all practical doubts.`
      },
      ...defaultTestimonials.slice(1)
    ];
  };

  const testimonialsList = getTestimonials();

  // Dynamic Brochure download generator
  const handleDownloadBrochure = () => {
    const brochureText = `
======================================================================
                  MOHAN FOUNDATION E-LEARNING PORTAL
                    OFFICIAL COURSE BROCHURE
======================================================================

COURSE TITLE: ${course.title}
CATEGORY: ${course.tag}
DURATION: ${specs.duration}
MEDIUM OF INSTRUCTION: ${specs.medium}
ACCREDITATION: ${course.cpdAccreditation || 'N/A'}

----------------------------------------------------------------------
1. COURSE DESCRIPTION
----------------------------------------------------------------------
${course.description}

----------------------------------------------------------------------
2. COURSE ELIGIBILITY
----------------------------------------------------------------------
${course.eligibility || 'Refer to website for eligibility'}

----------------------------------------------------------------------
3. KEY COURSE OBJECTIVES
----------------------------------------------------------------------
${course.objectives?.map((obj, i) => `[${i + 1}] ${obj}`).join('\n') || 'To equip healthcare professionals to handle the key areas in transplant coordination.'}

----------------------------------------------------------------------
4. BENEFITS & OUTCOMES
----------------------------------------------------------------------
${course.benefits?.map((b, i) => `• ${b}`).join('\n') || 'Improve your professional development'}

----------------------------------------------------------------------
5. CURRICULUM OUTLINE
----------------------------------------------------------------------
${curriculum.map((m) => `${m.title}\n${m.topics.map(t => `  - ${t}`).join('\n')}`).join('\n\n')}

----------------------------------------------------------------------
6. ABOUT MOHAN FOUNDATION
----------------------------------------------------------------------
MOHAN Foundation is a pioneer in organ donation education in India, 
established in 1997. Our courses are designed to establish high standards 
in transplant coordination, grief counseling, and donor optimization.

For help, queries, and support:
Email: elearning@mohanfoundation.org
Phone: +91-63747-73957
Toll Free: 1800-103-7100
Website: https://el.mohanfoundation.org

======================================================================
                 (c) 2026 MOHAN Foundation. All Rights Reserved.
======================================================================
`;

    const blob = new Blob([brochureText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${course.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_brochure.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleNextFeedback = () => {
    setFeedbackIndex((prev) => (prev + 1) % testimonialsList.length);
  };

  const handlePrevFeedback = () => {
    setFeedbackIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-[#1A2F5E] font-sans pb-16">
      {/* Dynamic Hero Area */}
      <section className="bg-gradient-to-r from-[#F4F7FC] via-[#EDF2FA] to-[#E3ECF7] pt-10 pb-12 px-4 md:px-8 border-b border-gray-100 relative">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-stretch">
          
          {/* Left Column: Course details & badges */}
          <div className="w-full lg:w-3/5 flex flex-col justify-between py-2">
            <div>
              {/* Category Badge */}
              <div className="inline-block bg-[#E8EBFC] text-[#4F46E5] border border-[#C7D2FE] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                {categoryLabel}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] font-serif font-black text-[#1A2F5E] leading-tight tracking-tight mb-3">
                {course.title}
              </h1>

              {/* Subtitle */}
              <p className="text-[#5B7095] text-lg font-bold mb-6">
                Learn about Transplant Coordination
              </p>

              {/* Accreditation and badges */}
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-6">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Accredited by CPD
                  </span>
                  
                  <div className="flex items-center gap-3 mt-1.5">
                    {/* CPD Badge Logo */}
                    <div className="relative w-[130px] h-[50px] bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden flex items-center justify-center p-1">
                      <Image 
                        src="/cdp-logo.jpg" 
                        alt="CPD Standards logo" 
                        fill 
                        sizes="130px"
                        className="object-contain p-1"
                        priority
                        unoptimized
                      />
                    </div>

                    {/* Custom gold circle badge */}
                    {cpdHoursLabel && (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E6B95C] via-[#D89A2B] to-[#B07B18] text-white flex flex-col items-center justify-center text-center font-bold text-[9px] uppercase leading-tight shadow-md border-2 border-white/80 shrink-0">
                        <span className="text-[10px] leading-none mb-0.5">{cpdHoursLabel.split(' ')[0]}</span>
                        <span className="leading-none text-[7px] text-white/90">CPD</span>
                        <span className="leading-none text-[7px] text-white/90">Hours</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quote details */}
              <p className="italic text-gray-500 font-medium text-sm border-l-2 border-mf-red pl-3 max-w-xl mb-6">
                "Experience the &ldquo;Best of Both Worlds&rdquo; through Online and Real-time Learning and Give Impetus to Your Career"
              </p>

              {/* Batch dates info */}
              <div className="bg-[#FFFFFF]/80 border border-[#E2E8F0] rounded-2xl p-4 inline-flex flex-col gap-1.5 max-w-md shadow-sm mb-6">
                <div className="flex items-center gap-2 text-xs font-black text-gray-500 uppercase tracking-wider">
                  <Calendar size={14} className="text-mf-red" /> Batch Information
                </div>
                <div className="text-sm">
                  <span className="font-bold text-[#1A2F5E]">Next batch starts on:</span> <span className="font-black text-mf-red">{nextBatchDate}</span>
                </div>
                {isProfessional && (
                  <div className="text-xs text-gray-500 font-bold">
                    Registrations open till {regDeadline}
                  </div>
                )}
              </div>
            </div>

            {/* Buttons Group */}
            <div className="flex flex-wrap gap-3 mt-4">
              <Link 
                href={`/register?course=${encodeURIComponent(course.title)}`}
                className="bg-[#1A2F5E] hover:bg-[#2A4580] text-white px-5 py-3 rounded-full font-extrabold text-sm shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
              >
                Register Now
              </Link>
              <button 
                onClick={() => setIsEnquiryOpen(true)}
                className="bg-[#1A2F5E] hover:bg-[#2A4580] text-white px-5 py-3 rounded-full font-extrabold text-sm shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
              >
                Enquiry
              </button>
              <button 
                onClick={handleDownloadBrochure}
                className="bg-[#1A2F5E] hover:bg-[#2A4580] text-white px-5 py-3 rounded-full font-extrabold text-sm shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Download size={14} /> Download Course Brochure
              </button>
            </div>
          </div>

          {/* Right Column: Vimeo Video Embed */}
          <div className="w-full lg:w-2/5 flex items-center justify-center">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 group">
              <iframe 
                src="https://player.vimeo.com/video/819124403?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
                title="MOHAN Foundation Course Video"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Specifications Table Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_10px_35px_rgba(26,47,94,0.06)] p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 divide-y md:divide-y-0 lg:divide-x divide-gray-100">
            
            {/* Spec: Duration */}
            <div className="flex gap-4 items-start pb-4 md:pb-0 lg:px-4 first:pl-0">
              <Calendar className="text-[#C8303A] shrink-0" size={24} />
              <div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5">Duration:</h4>
                <p className="text-sm font-bold text-gray-900 leading-snug">{specs.duration}</p>
              </div>
            </div>

            {/* Spec: Structure */}
            <div className="flex gap-4 items-start pt-4 md:pt-0 lg:px-4">
              <BookOpen className="text-[#C8303A] shrink-0" size={24} />
              <div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5">Structure:</h4>
                <p className="text-sm font-bold text-gray-900 leading-snug">{specs.structure}</p>
              </div>
            </div>

            {/* Spec: Course Fee */}
            <div className="flex gap-4 items-start pt-4 md:pt-0 lg:px-4 lg:col-span-2">
              <CreditCard className="text-[#C8303A] shrink-0" size={24} />
              <div className="w-full">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5">Course Fee:</h4>
                <div className="space-y-1 text-sm font-bold text-gray-900">
                  <p>Indian students: <span className="text-mf-red">{specs.fee.india}</span></p>
                  <p className="text-xs font-bold text-gray-500">{specs.fee.intl}</p>
                  {specs.fee.annual && (
                    <p className="text-[10px] text-gray-400 font-medium italic mt-1 leading-snug">{specs.fee.annual}</p>
                  )}
                  {specs.fee.candidatesIndia && (
                    <div className="text-[11px] text-gray-500 font-semibold mt-1 space-y-0.5">
                      <p>{specs.fee.candidatesIndia}</p>
                      <p>{specs.fee.candidatesIntl}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Spec: Medium of Instruction */}
            <div className="flex gap-4 items-start pt-4 md:pt-0 lg:px-4 last:border-r-0">
              <Globe className="text-[#C8303A] shrink-0" size={24} />
              <div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5">Medium of Instructions:</h4>
                <p className="text-sm font-bold text-gray-900 leading-snug">{specs.medium}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tabs and Info Area */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Content (Tabs and Details) */}
          <div className="w-full lg:w-[68%]">
            
            {/* Tab navigation */}
            <div className="border-b border-gray-200 overflow-x-auto flex scrollbar-none whitespace-nowrap gap-1">
              {[
                { id: 'about', label: 'About the course' },
                { id: 'cpd', label: 'CPD Accredited' },
                { id: 'objectives', label: 'Objectives' },
                { id: 'curriculum', label: 'Curriculum' },
                { id: 'who', label: 'Who can join' },
                { id: 'faculty', label: 'Faculty - Curriculum' },
                { id: 'contact', label: 'Faculty - Contact Session' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-[13px] md:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                    activeTab === tab.id 
                      ? 'border-mf-red text-[#C8303A]' 
                      : 'border-transparent text-gray-500 hover:text-[#1A2F5E]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents Panel */}
            <div className="bg-white rounded-[24px] border border-gray-100 p-6 md:p-8 shadow-sm mt-6">
              {activeTab === 'about' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xl font-extrabold text-[#1A2F5E]">About the Course</h3>
                  {course.aboutHtml ? (
                    <div 
                      className="text-[#5B7095] leading-relaxed font-medium [&>ul]:list-disc [&>ul]:pl-5 [&>p]:mb-4"
                      dangerouslySetInnerHTML={{ __html: course.aboutHtml }}
                    />
                  ) : (
                    <>
                      <p className="text-[#5B7095] leading-relaxed font-medium">
                        {course.description}
                      </p>
                      <p className="text-[#5B7095] leading-relaxed font-medium">
                        Designed by leading subject matter experts at the MOHAN Foundation, this program combines clinical training, counseling methodologies, and legal knowledge. Our portal offers highly interactive media modules, and we conduct periodic webinars and interactive live sessions.
                      </p>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'cpd' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xl font-extrabold text-[#1A2F5E]">CPD Accreditation</h3>
                  {course.cpdHtml ? (
                    <div 
                      className="text-[#5B7095] leading-relaxed font-medium [&>ul]:list-disc [&>ul]:pl-5 [&>p]:mb-4"
                      dangerouslySetInnerHTML={{ __html: course.cpdHtml }}
                    />
                  ) : (
                    <p className="text-[#5B7095] leading-relaxed font-medium">
                      {course.cpdAccreditation !== 'Not applicable.' 
                        ? `This training program is accredited by the CPD Standards Office, London, UK. It provides formal validation of professional development for healthcare practitioners. Credit allocation: ${course.cpdAccreditation}.`
                        : 'This course is structured as a professional development and awareness module. Though not offering formal CPD credits directly, it is highly recognized in health systems for training, induction, and general awareness.'
                      }
                    </p>
                  )}
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <Award className="text-green-600 shrink-0" size={24} />
                    <span className="text-xs text-[#5B7095] font-bold">
                      Formal CPD Certificates of Completion are recognized globally across clinical, nursing, and administrative healthcare ecosystems.
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'objectives' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xl font-extrabold text-[#1A2F5E] mb-2">Objectives</h3>
                  {course.objectivesHtml ? (
                    <div 
                      className="text-[#5B7095] leading-relaxed font-medium [&>ul]:list-disc [&>ul]:pl-5 [&>p]:mb-4"
                      dangerouslySetInnerHTML={{ __html: course.objectivesHtml }}
                    />
                  ) : (
                    <>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">To equip healthcare professionals to handle the key areas in transplant coordination.</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        {course.objectives?.map((obj, i) => (
                          <li key={i} className="flex gap-2.5 items-start p-3 rounded-xl bg-orange-50/30 border border-orange-100/40">
                            <CheckCircle className="text-mf-red shrink-0 mt-0.5" size={16} />
                            <span className="text-sm text-[#1A2F5E] font-semibold leading-snug">{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="text-xl font-extrabold text-[#1A2F5E]">Course Curriculum</h3>
                  {course.curriculumHtml ? (
                    <div 
                      className="text-[#5B7095] leading-relaxed font-medium [&>ul]:list-disc [&>ul]:pl-5 [&>p]:mb-4"
                      dangerouslySetInnerHTML={{ __html: course.curriculumHtml }}
                    />
                  ) : (
                    <div className="space-y-4">
                      {curriculum.map((m, i) => (
                        <div key={i} className="border border-gray-100 rounded-2xl p-4 bg-[#FAF9F5]/40 hover:bg-[#FAF9F5]/80 transition-colors shadow-sm">
                          <h4 className="font-extrabold text-[#1A2F5E] text-sm mb-2">{m.title}</h4>
                          <ul className="space-y-1 ml-4 list-disc text-xs text-[#5B7095] font-semibold">
                            {m.topics.map((t, idx) => (
                              <li key={idx}>{t}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'who' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xl font-extrabold text-[#1A2F5E]">Who Can Join</h3>
                  <div className="p-4 bg-blue-50/40 border border-blue-100 rounded-2xl">
                    <h4 className="font-black text-[#1A2F5E] text-xs uppercase tracking-wider mb-1">Eligible Criteria:</h4>
                    {course.eligibilityHtml ? (
                      <div 
                        className="text-sm font-bold text-[#1a387c] [&>ul]:list-disc [&>ul]:pl-4 [&>p]:mb-2 [&>div>ol]:list-decimal [&>div>ol]:pl-4"
                        dangerouslySetInnerHTML={{ __html: course.eligibilityHtml }}
                      />
                    ) : (
                      <p className="text-sm font-bold text-[#1a387c]">{course.eligibility}</p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                    Designed for doctors, transplant coordinators, nursing staff, clinical supervisors, hospital administrators, medical social workers, and any professional looking to establish credentials in organ donation systems.
                  </p>
                </div>
              )}

              {activeTab === 'faculty' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xl font-extrabold text-[#1A2F5E]">Faculty and Experts</h3>
                  <p className="text-[#5B7095] leading-relaxed font-medium">
                    Our distinguished faculty consists of senior advisors and medical practitioners from MOHAN Foundation, as well as guest lectures by globally recognized transplant specialists, ICU consultants, neurologists, legal consultants, and senior coordinators.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-mf-red/10 text-mf-red flex items-center justify-center font-bold text-sm">MF</div>
                      <div>
                        <h5 className="font-bold text-[#1A2F5E] text-xs">MOHAN Advisory Panel</h5>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Clinical & Counseling Specialists</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-[#1A2F5E]/10 text-[#1A2F5E] flex items-center justify-center font-bold text-sm">MD</div>
                      <div>
                        <h5 className="font-bold text-[#1A2F5E] text-xs">ICU & Neurological Experts</h5>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Brain Death Consultants</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xl font-extrabold text-[#1A2F5E]">Contact Session & Mentoring</h3>
                  <p className="text-[#5B7095] leading-relaxed font-medium">
                    Webinars and live discussion sessions are conducted periodically (e.g. bi-weekly or monthly). During these sessions, students get to interact with course experts, share case study scenarios, review medical-legal documentation, and practice family approach protocols.
                  </p>
                  <p className="text-[#5B7095] leading-relaxed font-medium">
                    Attendance in interactive sessions is highly recommended to clarify doubts and prepare for final assessments.
                  </p>
                </div>
              )}
            </div>

            {/* Testimonials/Feedback Card */}
            <div className="bg-white rounded-[24px] border border-gray-100 p-6 md:p-8 shadow-sm mt-8 relative">
              <h3 className="text-xl font-extrabold text-[#1A2F5E] mb-6">Feedback</h3>
              
              <div className="relative overflow-hidden min-h-[160px]">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-0.5 text-yellow-500 text-lg">
                    {[...Array(testimonialsList[feedbackIndex].rating)].map((_, idx) => (
                      <span key={idx}>★</span>
                    ))}
                  </div>
                  
                  <div className="text-[11px] font-black text-mf-red tracking-wider uppercase mb-1 flex items-center gap-2">
                    <span>{testimonialsList[feedbackIndex].courseCode}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-mf-red/30"></span>
                    <span className="text-gray-400 font-bold">{testimonialsList[feedbackIndex].period}</span>
                  </div>

                  <p className="text-[#5B7095] leading-relaxed italic text-sm font-semibold">
                    &ldquo;{testimonialsList[feedbackIndex].text}&rdquo;
                  </p>

                  <div className="flex items-center gap-3.5 pt-4 border-t border-gray-50 mt-4">
                    <div className="w-10 h-10 rounded-full bg-[#1A2F5E]/5 text-[#1A2F5E] flex items-center justify-center font-bold text-sm">
                      {testimonialsList[feedbackIndex].name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#1A2F5E] text-xs">{testimonialsList[feedbackIndex].name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{testimonialsList[feedbackIndex].role} &bull; {testimonialsList[feedbackIndex].location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="absolute top-6 right-6 md:right-8 flex gap-2">
                <button 
                  onClick={handlePrevFeedback}
                  className="w-9 h-9 rounded-full bg-slate-50 border border-gray-100 flex items-center justify-center text-[#1A2F5E] hover:bg-mf-red hover:text-white transition-all cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={handleNextFeedback}
                  className="w-9 h-9 rounded-full bg-slate-50 border border-gray-100 flex items-center justify-center text-[#1A2F5E] hover:bg-mf-red hover:text-white transition-all cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </div>

          {/* Sidebar Area */}
          <div className="w-full lg:w-[32%] space-y-6 lg:sticky lg:top-[125px]">
            
            {/* Quick Course Highlights Card */}
            <div className="bg-white border border-gray-100 shadow-sm rounded-[24px] p-6 space-y-5">
              <h3 className="text-md font-extrabold text-[#1A2F5E] border-b border-gray-50 pb-3 uppercase tracking-wider">
                Course Highlights
              </h3>
              
              <ul className="space-y-3.5">
                <li className="flex gap-3 items-start">
                  <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={16} />
                  <span className="text-xs text-[#5B7095] font-bold leading-snug">
                    {course.cpdAccreditation && course.cpdAccreditation !== 'Not applicable.'
                      ? `CPD Accredited (${course.cpdAccreditation})`
                      : 'Professional Standards Endorsed'}
                  </span>
                </li>

                <li className="flex gap-3 items-start">
                  <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={16} />
                  <span className="text-xs text-[#5B7095] font-bold leading-snug">
                    {course.certificate || 'Certificate of Completion'}
                  </span>
                </li>

                <li className="flex gap-3 items-start">
                  <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={16} />
                  <span className="text-xs text-[#5B7095] font-bold leading-snug">
                    Online Access & Interactive Study Portal
                  </span>
                </li>

                <li className="flex gap-3 items-start">
                  <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={16} />
                  <span className="text-xs text-[#5B7095] font-bold leading-snug">
                    {isProfessional ? 'Tailored for Healthcare Professionals' : 'Accessible for the General Public'}
                  </span>
                </li>

                <li className="flex gap-3 items-start">
                  <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={16} />
                  <span className="text-xs text-[#5B7095] font-bold leading-snug">
                    Organ Donation & Transplantation Education
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-[#1A2F5E] text-white shadow-sm rounded-[24px] p-6 space-y-4 relative overflow-hidden">
              <div className="absolute bottom-[-50px] right-[-50px] w-28 h-28 bg-white/5 rounded-full blur-xl pointer-events-none" />
              
              <h4 className="text-xs font-black uppercase tracking-widest text-white/90">
                Contact Support
              </h4>
              
              <div className="space-y-3 text-xs text-white/80 font-bold">
                <p className="flex items-center gap-2">
                  <span className="text-[#C8303A]">@</span>
                  <a href="mailto:elearning@mohanfoundation.org" className="hover:text-white transition-colors">
                    elearning@mohanfoundation.org
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#C8303A]">&phone;</span>
                  <a href="tel:+916374773957" className="hover:text-white transition-colors">
                    +91-63747-73957
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-mf-red flex items-center justify-center text-[7px] font-black text-white shrink-0">
                    TF
                  </span>
                  <span>Toll Free: 1800-103-7100</span>
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Similar Courses Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 mt-16 pt-12 border-t border-gray-100">
        <h3 className="font-serif text-2xl font-black text-[#1A2F5E] mb-8">
          Similar Courses
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarCourses.slice(0, 4).map((c) => (
            <div 
              key={c.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full group hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="aspect-video relative overflow-hidden bg-gray-100 shrink-0">
                <Image 
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 250px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>

              {/* Card info */}
              <div className="p-4 flex flex-col grow">
                <div className="text-[10px] font-black text-[#4F46E5] uppercase tracking-wider mb-2">
                  Registration Open
                </div>

                <h4 className="font-extrabold text-[#1A2F5E] text-xs line-clamp-2 leading-snug mb-3 grow hover:text-mf-red">
                  <Link href={`/courses/${c.id}`}>
                    {c.title}
                  </Link>
                </h4>

                <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold mb-4">
                  <span className="flex items-center gap-1"><Clock size={10} /> {c.weeks || 4} Week{(c.weeks || 4) > 1 ? 's' : ''}</span>
                  <span className="text-mf-red font-black text-xs">{c.price}</span>
                </div>

                <Link 
                  href={`/courses/${c.id}`}
                  className="text-[10px] font-bold text-gray-400 hover:text-[#1A2F5E] underline mb-4 block"
                >
                  Learn about Organ Donation & Transplant
                </Link>

                <Link 
                  href={`/register?course=${encodeURIComponent(c.title)}`}
                  className="w-full bg-[#1A2F5E] hover:bg-[#2A4580] text-white py-2 rounded-full font-extrabold text-[10px] tracking-wide transition-colors text-center shadow-sm"
                >
                  Register Now
                </Link>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal 
        isOpen={isEnquiryOpen} 
        onClose={() => setIsEnquiryOpen(false)} 
      />
    </div>
  );
}
