'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import DnaBackground from '@/components/DnaBackground';
import { 
  User, Mail, Lock, CheckSquare, Square, BookOpen, Calendar, 
  MapPin, Phone, CheckCircle, GraduationCap, Building, Briefcase, 
  Globe, ShieldAlert, Check, ShieldCheck, ChevronDown
} from 'lucide-react';
import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { allCourses } from '@/data/courses';

function RegisterForm() {
  const searchParams = useSearchParams();
  const initialCourseParam = searchParams.get('course') || '';

  // Resolve course by either ID or title
  const initialCourse = allCourses.find(
    (c) => c.id === initialCourseParam || c.title.toLowerCase() === decodeURIComponent(initialCourseParam).toLowerCase()
  ) || allCourses[0];

  // State to hold active course ID
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourse.id);
  const activeCourse = allCourses.find((c) => c.id === selectedCourseId) || allCourses[0];

  // Form Fields State
  const [formData, setFormData] = useState({
    title: 'Dr.',
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    country: 'India',
    state: '',
    city: '',
    qualification: '',
    occupation: '',
    organization: '',
    regNo: '',
    password: '',
    confirmPassword: '',
  });

  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Sync state if initial query param resolves later
  useEffect(() => {
    if (initialCourseParam) {
      const found = allCourses.find(
        (c) => c.id === initialCourseParam || c.title.toLowerCase() === decodeURIComponent(initialCourseParam).toLowerCase()
      );
      if (found) {
        setSelectedCourseId(found.id);
      }
    }
  }, [initialCourseParam]);

  // Compute dynamic India and International Pricing
  const getPricing = (priceStr: string) => {
    const numeric = parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 999;
    if (numeric === 199) return { india: '₹199', intl: '$4.99' };
    if (numeric === 499) return { india: '₹499', intl: '$12.99' };
    if (numeric === 799) return { india: '₹799', intl: '$19.99' };
    if (numeric === 999) return { india: '₹999', intl: '$24.99' };
    if (numeric === 4500) return { india: '₹4,500', intl: '$119.99' };
    if (numeric === 4999) return { india: '₹4,999', intl: '$129.99' };
    if (numeric === 15000) return { india: '₹15,000', intl: '$399.99' };
    
    // Auto-calculate for custom rates
    const usd = Math.round(numeric / 40);
    return { india: priceStr, intl: `$${usd > 0 ? usd - 0.01 : '9.99'}` };
  };

  const pricing = getPricing(activeCourse.price);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender selection is required';
    if (!formData.qualification) newErrors.qualification = 'Highest qualification is required';
    if (!formData.occupation) newErrors.occupation = 'Profession / Occupation is required';
    if (!formData.organization.trim()) newErrors.organization = 'Institution / Hospital name is required';
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!consent) {
      newErrors.consent = 'You must consent to the communications policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementsByName(firstErrorKey)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    // Simulate successful API registration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRegistered(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#F8F4F1] pt-[120px] pb-24 px-4 md:px-8 relative overflow-hidden font-sans">
      <DnaBackground className="absolute inset-0 opacity-[0.06] mix-blend-multiply pointer-events-none" />
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D63B45]/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D89A2B]/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {isRegistered ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl mx-auto bg-white shadow-[0_20px_60px_rgba(26,47,94,0.06)] rounded-[40px] p-8 md:p-16 border border-white/60 text-center"
          >
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <ShieldCheck className="text-green-600 animate-pulse" size={56} />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1A2F5E] mb-4">Registration Successful!</h1>
            <p className="text-gray-500 text-lg mb-8 max-w-lg mx-auto">
              Thank you for enrolling. We have sent a confirmation email containing your credentials and activation link to:
              <br />
              <strong className="text-mf-navy font-bold">{formData.email}</strong>
            </p>

            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 text-left mb-8 space-y-3">
              <h3 className="font-extrabold text-[#1A2F5E] border-b pb-2 text-md">Registration Details</h3>
              <p className="text-sm text-gray-600"><span className="font-bold">Name:</span> {formData.title} {formData.firstName} {formData.lastName}</p>
              <p className="text-sm text-gray-600"><span className="font-bold">Course:</span> {activeCourse.title}</p>
              <p className="text-sm text-gray-600"><span className="font-bold">Institution:</span> {formData.organization}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/login"
                className="bg-mf-red hover:bg-mf-red-light text-white font-extrabold py-4 px-8 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
              >
                Go to Login Page
              </Link>
              <Link 
                href="/"
                className="bg-[#1A2F5E] hover:bg-[#2A4580] text-white font-extrabold py-4 px-8 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
              >
                Back to Homepage
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="w-full">
            {/* Header Title Area */}
            <div className="mb-12">
              <div className="inline-block bg-[#EEDADB] text-mf-red px-4 py-1.5 rounded-full text-[0.7rem] font-black tracking-wider uppercase mb-3 border border-mf-red/10">
                APPLICATION FORM
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-black text-[#1A2F5E] tracking-tight mb-2">
                Course Registration
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-gray-500 font-bold text-lg">Registering for:</span>
                
                {/* Dynamically styled dropdown to select/switch course on registration page */}
                <div className="relative inline-block max-w-full">
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="appearance-none bg-white/80 border border-gray-200 text-[#1A2F5E] font-black py-2 pl-4 pr-10 rounded-xl cursor-pointer hover:border-mf-red focus:outline-none focus:ring-2 focus:ring-mf-red transition-all max-w-[280px] md:max-w-xl truncate text-[1rem] shadow-sm"
                  >
                    {allCourses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* Grid Form Container */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              {/* LEFT COLUMN: Main Form Cards */}
              <form onSubmit={handleSubmit} className="w-full lg:w-[65%] space-y-6">
                
                {/* Card 1: Personal Information */}
                <div className="bg-white shadow-[0_8px_30px_rgba(30,43,92,0.03)] border border-white/60 rounded-[30px] p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="w-8 h-8 rounded-full bg-[#EEDADB] text-mf-red flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <h2 className="text-lg font-extrabold text-[#1A2F5E]">Personal Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    {/* Title */}
                    <div className="md:col-span-1 flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">Title</label>
                      <div className="relative">
                        <select
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full appearance-none px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mf-gold/50 focus:border-mf-gold outline-none transition-all text-[#1A2F5E] font-medium"
                        >
                          <option value="Dr.">Dr.</option>
                          <option value="Mr.">Mr.</option>
                          <option value="Ms.">Ms.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Prof.">Prof.</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                          <ChevronDown size={14} />
                        </div>
                      </div>
                    </div>

                    {/* First Name */}
                    <div className="md:col-span-2.5 flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-mf-gold/50 focus:border-mf-gold outline-none transition-all text-[#1A2F5E] font-medium ${errors.firstName ? 'border-red-400' : 'border-gray-200'}`}
                      />
                      {errors.firstName && <span className="text-red-500 text-[10px] font-bold mt-0.5">{errors.firstName}</span>}
                    </div>

                    {/* Last Name */}
                    <div className="md:col-span-2.5 flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-mf-gold/50 focus:border-mf-gold outline-none transition-all text-[#1A2F5E] font-medium ${errors.lastName ? 'border-red-400' : 'border-gray-200'}`}
                      />
                      {errors.lastName && <span className="text-red-500 text-[10px] font-bold mt-0.5">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date of Birth */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">Date of Birth *</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-mf-gold/50 focus:border-mf-gold outline-none transition-all text-[#1A2F5E] font-medium ${errors.dob ? 'border-red-400' : 'border-gray-200'}`}
                        />
                      </div>
                      {errors.dob && <span className="text-red-500 text-[10px] font-bold mt-0.5">{errors.dob}</span>}
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">Gender *</label>
                      <div className="relative">
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className={`w-full appearance-none px-4 py-3 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-mf-gold/50 focus:border-mf-gold outline-none transition-all text-[#1A2F5E] font-medium ${errors.gender ? 'border-red-400' : 'border-gray-200'}`}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                          <ChevronDown size={14} />
                        </div>
                      </div>
                      {errors.gender && <span className="text-red-500 text-[10px] font-bold mt-0.5">{errors.gender}</span>}
                    </div>
                  </div>
                </div>

                {/* Card 2: Contact Information */}
                <div className="bg-white shadow-[0_8px_30px_rgba(30,43,92,0.03)] border border-white/60 rounded-[30px] p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="w-8 h-8 rounded-full bg-[#FCF0D9] text-[#D89A2B] flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <h2 className="text-lg font-extrabold text-[#1A2F5E]">Contact Details</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">Email Address *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <Mail size={16} />
                        </span>
                        <input
                          type="email"
                          name="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-mf-gold/50 focus:border-mf-gold outline-none transition-all text-[#1A2F5E] font-medium ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                        />
                      </div>
                      {errors.email && <span className="text-red-500 text-[10px] font-bold mt-0.5">{errors.email}</span>}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">Phone Number *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <Phone size={16} />
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-mf-gold/50 focus:border-mf-gold outline-none transition-all text-[#1A2F5E] font-medium ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
                        />
                      </div>
                      {errors.phone && <span className="text-red-500 text-[10px] font-bold mt-0.5">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Country */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">Country *</label>
                      <div className="relative">
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full appearance-none px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mf-gold/50 focus:border-mf-gold outline-none transition-all text-[#1A2F5E] font-medium"
                        >
                          <option value="India">India</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                          <option value="Singapore">Singapore</option>
                          <option value="UAE">UAE</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                          <ChevronDown size={14} />
                        </div>
                      </div>
                    </div>

                    {/* State */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">State</label>
                      <input
                        type="text"
                        name="state"
                        placeholder="Tamil Nadu"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mf-gold/50 focus:border-mf-gold outline-none transition-all text-[#1A2F5E] font-medium"
                      />
                    </div>

                    {/* City */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="Chennai"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mf-gold/50 focus:border-mf-gold outline-none transition-all text-[#1A2F5E] font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Card 3: Professional & Academic Details */}
                <div className="bg-white shadow-[0_8px_30px_rgba(30,43,92,0.03)] border border-white/60 rounded-[30px] p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="w-8 h-8 rounded-full bg-[#D4E8F8] text-[#2A4580] flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <h2 className="text-lg font-extrabold text-[#1A2F5E]">Professional & Academic Details</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Highest Qualification */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">Highest Qualification *</label>
                      <div className="relative">
                        <select
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleInputChange}
                          className={`w-full appearance-none px-4 py-3 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-mf-gold/50 focus:border-mf-gold outline-none transition-all text-[#1A2F5E] font-medium ${errors.qualification ? 'border-red-400' : 'border-gray-200'}`}
                        >
                          <option value="">Select Qualification</option>
                          <option value="MBBS">MBBS</option>
                          <option value="MD / MS">MD / MS</option>
                          <option value="BDS / MDS">BDS / MDS</option>
                          <option value="B.Sc Nursing / GNM">B.Sc Nursing / GNM</option>
                          <option value="BSW / MSW">BSW / MSW (Social Work)</option>
                          <option value="Life Sciences Graduate">Life Sciences Graduate</option>
                          <option value="Law Graduate (LLB/LLM)">Law Graduate (LLB/LLM)</option>
                          <option value="Post Graduate (Others)">Post Graduate (Others)</option>
                          <option value="Undergraduate Student">Undergraduate Student</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                          <ChevronDown size={14} />
                        </div>
                      </div>
                      {errors.qualification && <span className="text-red-500 text-[10px] font-bold mt-0.5">{errors.qualification}</span>}
                    </div>

                    {/* Profession / Occupation */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">Occupation / Profession *</label>
                      <div className="relative">
                        <select
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleInputChange}
                          className={`w-full appearance-none px-4 py-3 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-mf-gold/50 focus:border-mf-gold outline-none transition-all text-[#1A2F5E] font-medium ${errors.occupation ? 'border-red-400' : 'border-gray-200'}`}
                        >
                          <option value="">Select Occupation</option>
                          <option value="Doctor">Doctor</option>
                          <option value="Nurse">Nurse</option>
                          <option value="Transplant Coordinator">Transplant Coordinator</option>
                          <option value="Grief Counselor / Social Worker">Grief Counselor / Social Worker</option>
                          <option value="Hospital Administrator">Hospital Administrator</option>
                          <option value="Medical Student">Medical/Allied Health Student</option>
                          <option value="NGO Representative">NGO Representative</option>
                          <option value="Advocate / General Public">Advocate / General Public</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                          <ChevronDown size={14} />
                        </div>
                      </div>
                      {errors.occupation && <span className="text-red-500 text-[10px] font-bold mt-0.5">{errors.occupation}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Organization */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">Organisation / Hospital / College *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <Building size={16} />
                        </span>
                        <input
                          type="text"
                          name="organization"
                          placeholder="Fortis Hospital / Madras Medical College"
                          value={formData.organization}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-mf-gold/50 focus:border-mf-gold outline-none transition-all text-[#1A2F5E] font-medium ${errors.organization ? 'border-red-400' : 'border-gray-200'}`}
                        />
                      </div>
                      {errors.organization && <span className="text-red-500 text-[10px] font-bold mt-0.5">{errors.organization}</span>}
                    </div>

                    {/* Registration No. */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">Medical Council Registration No. (If Applicable)</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <GraduationCap size={16} />
                        </span>
                        <input
                          type="text"
                          name="regNo"
                          placeholder="Registration Number"
                          value={formData.regNo}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mf-gold/50 focus:border-mf-gold outline-none transition-all text-[#1A2F5E] font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 4: Account Security & Consent */}
                <div className="bg-white shadow-[0_8px_30px_rgba(30,43,92,0.03)] border border-white/60 rounded-[30px] p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="w-8 h-8 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <h2 className="text-lg font-extrabold text-[#1A2F5E]">Account Credentials</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Create Password */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">Create Password *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <Lock size={16} />
                        </span>
                        <input
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-mf-gold/50 focus:border-mf-gold outline-none transition-all text-[#1A2F5E] font-medium ${errors.password ? 'border-red-400' : 'border-gray-200'}`}
                        />
                      </div>
                      {errors.password && <span className="text-red-500 text-[10px] font-bold mt-0.5">{errors.password}</span>}
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">Confirm Password *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <Lock size={16} />
                        </span>
                        <input
                          type="password"
                          name="confirmPassword"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-mf-gold/50 focus:border-mf-gold outline-none transition-all text-[#1A2F5E] font-medium ${errors.confirmPassword ? 'border-red-400' : 'border-gray-200'}`}
                        />
                      </div>
                      {errors.confirmPassword && <span className="text-red-500 text-[10px] font-bold mt-0.5">{errors.confirmPassword}</span>}
                    </div>
                  </div>

                  {/* Consent Box */}
                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">Email/SMS Consent *</label>
                    <div 
                      className={`flex items-start gap-3.5 p-4 rounded-2xl cursor-pointer transition-all border ${consent ? 'bg-[#FAFDF9] border-[#A5D6A7]' : 'bg-gray-50/50 border-gray-100 hover:border-gray-200'}`}
                      onClick={() => {
                        setConsent(!consent);
                        setErrors((prev) => ({ ...prev, consent: '' }));
                      }}
                    >
                      <div className="text-mf-red shrink-0 mt-0.5">
                        {consent ? (
                          <div className="w-5 h-5 rounded-md bg-[#2E7D32] flex items-center justify-center text-white">
                            <Check size={14} />
                          </div>
                        ) : (
                          <Square size={20} className="text-gray-300 hover:text-mf-navy" />
                        )}
                      </div>
                      <div>
                        <p className="text-[12px] leading-relaxed text-gray-500 font-medium select-none">
                          I consent to the privacy policy provided by MOHAN Foundation. By providing my contact details, I agree to receive communications regarding my course enrollment and progress updates via email and SMS. I acknowledge I can unsubscribe at any time.
                        </p>
                      </div>
                    </div>
                    {errors.consent && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.consent}</p>}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-mf-red hover:bg-[#B22A33] text-white py-4 rounded-2xl font-extrabold text-lg transition-all hover:-translate-y-0.5 shadow-[0_12px_24px_rgba(200,48,58,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Submit Application Form</>
                  )}
                </button>

              </form>

              {/* RIGHT COLUMN: Sidebar (Price & Highlights) */}
              <div className="w-full lg:w-[35%] space-y-6 lg:sticky lg:top-[125px]">
                
                {/* Course Fee Card */}
                <div className="bg-white border border-white/60 shadow-[0_8px_30px_rgba(30,43,92,0.03)] rounded-[30px] p-6 space-y-4">
                  <span className="text-[10px] font-black tracking-wider text-gray-400 uppercase">
                    COURSE FEE
                  </span>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline border-b border-gray-50 pb-2">
                      <span className="text-3xl font-serif font-black text-mf-red">
                        {pricing.india}
                      </span>
                      <span className="text-xs font-bold text-gray-400">
                        (India)
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-bold text-[#1A2F5E]">
                        {pricing.intl}
                      </span>
                      <span className="text-xs font-bold text-gray-400">
                        (Intl)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Course Highlights Card */}
                <div className="bg-white border border-white/60 shadow-[0_8px_30px_rgba(30,43,92,0.03)] rounded-[30px] p-6 space-y-6">
                  <h3 className="text-md font-extrabold text-[#1A2F5E] border-b border-gray-100 pb-3">
                    Course Highlights
                  </h3>
                  
                  <ul className="space-y-4">
                    {/* CPD Accreditation bullet */}
                    <li className="flex gap-3 items-start">
                      <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-gray-600 font-bold leading-tight">
                        {activeCourse.cpdAccreditation && activeCourse.cpdAccreditation !== 'Not applicable.'
                          ? `CPD Accredited (${activeCourse.cpdAccreditation})`
                          : 'Professional Standards Endorsed'}
                      </span>
                    </li>

                    {/* Certificate Provided bullet */}
                    <li className="flex gap-3 items-start">
                      <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-gray-600 font-bold leading-tight">
                        {activeCourse.certificate || 'Certificate of Completion'}
                      </span>
                    </li>

                    {/* Online Access bullet */}
                    <li className="flex gap-3 items-start">
                      <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-gray-600 font-bold leading-tight">
                        Online Access & Interactive Study Portal
                      </span>
                    </li>

                    {/* Eligibility bullet */}
                    <li className="flex gap-3 items-start">
                      <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-gray-600 font-bold leading-tight">
                        {activeCourse.tag.includes('Professional') || activeCourse.id !== '9' && activeCourse.id !== '10' && activeCourse.id !== '11' && activeCourse.id !== '12'
                          ? 'Tailored for Healthcare Professionals'
                          : 'Accessible for the General Public'}
                      </span>
                    </li>

                    {/* Subject/Topic bullet */}
                    <li className="flex gap-3 items-start">
                      <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-gray-600 font-bold leading-tight">
                        Organ Donation & Transplantation Education
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Contact Support Card */}
                <div className="bg-[#1A2F5E] text-white shadow-[0_8px_30px_rgba(30,43,92,0.03)] rounded-[30px] p-6 space-y-4 relative overflow-hidden">
                  <div className="absolute bottom-[-50px] right-[-50px] w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
                  
                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-white/90">
                    Contact Support
                  </h4>
                  
                  <div className="space-y-2.5 text-xs text-white/80 font-medium">
                    <p className="flex items-center gap-2">
                      <Mail size={14} className="text-mf-red-light" />
                      <a href="mailto:elearning@mohanfoundation.org" className="hover:text-white transition-colors">
                        elearning@mohanfoundation.org
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={14} className="text-mf-red-light" />
                      <a href="tel:+916374773957" className="hover:text-white transition-colors">
                        +91-63747-73957
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-mf-red-light flex items-center justify-center text-[8px] font-black text-white shrink-0">
                        TF
                      </span>
                      <span>Toll Free: 1800-103-7100</span>
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F8F4F1] font-bold text-[#1A2F5E]">Loading registration portal...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
