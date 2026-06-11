'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, Send, CheckCircle, ChevronDown, ChevronUp, AlertCircle, RefreshCw } from 'lucide-react';
import FooterSection from '@/components/FooterSection';

export default function RegisterPage() {
  const initialState = {
    title: 'Dr.',
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    phone: '',
    email: '',
    qualification: '',
    organization: '',
    designation: '',
    candidateType: 'Indian',
    course: '',
    message: '',
    termsAccepted: false,
    
    // Existing backend required fields
    fullName: '',
    subject: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [courseQueryName, setCourseQueryName] = useState('');
  const [termsOpen, setTermsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const courseQuery = params.get('course');
      if (courseQuery) {
        setCourseQueryName(courseQuery);
        setFormData(prev => ({ ...prev, course: courseQuery }));
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
      if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email Address is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email Address is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Mobile Number is required';
    if (!formData.course) newErrors.course = 'Please select a course';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms & conditions';
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to the first error
      const firstError = document.querySelector('.error-text');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Map first and last name to full name for existing backend
    const updatedData = {
      ...formData,
      fullName: `${formData.title} ${formData.firstName} ${formData.lastName}`.trim()
    };

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form but keep the course if it was set
      setFormData({
        ...initialState,
        course: updatedData.course
      });
    }, 1500);
  };

  const handleReset = () => {
    if(window.confirm('Are you sure you want to reset the entire form?')) {
      setFormData({
        ...initialState,
        course: courseQueryName
      });
      setErrors({});
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#f8fafc] pt-[120px]">
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#FAF8F4] to-[#F5F1EB] pt-16 pb-28 px-4 relative overflow-hidden">
        {/* Subtle DNA Background Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, #16213E 40px, #16213E 42px), repeating-linear-gradient(135deg, transparent, transparent 20px, #D93A43 20px, #D93A43 21px)',
            backgroundSize: '120px 120px',
            maskImage: 'radial-gradient(circle at center, black, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 70%)'
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-3xl">
            <span className="inline-block bg-[rgba(217,58,67,0.08)] text-[#D93A43] border border-[rgba(217,58,67,0.2)] text-xs font-bold px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Application Form
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#16213E]">Course Registration</h1>
            <h2 className="text-xl md:text-2xl text-[#475569] font-medium">
              {courseQueryName ? `Registering for: ${courseQueryName}` : 'Gift of Life – Organ Donation Certificate Programme'}
            </h2>
          </div>
          <div className="flex flex-col bg-[rgba(255,255,255,0.85)] p-4 rounded-2xl border border-[rgba(0,0,0,0.05)] backdrop-blur-[20px] min-w-[200px] shadow-sm">
            <span className="text-sm text-[#475569] font-semibold mb-1 uppercase tracking-wider">Course Fee</span>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-[#D93A43]">₹999 <span className="text-sm font-normal text-[#475569]">(India)</span></span>
              <div className="h-px w-full bg-gray-200 my-2"></div>
              <span className="text-xl font-bold text-[#D93A43]">$24.99 <span className="text-sm font-normal text-[#475569]">(Intl)</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRATION FORM SECTION */}
      <section className="px-4 -mt-16 pb-24 relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: FORM CARDS */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            
            {isSuccess ? (
              <div className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-500 border border-gray-50">
                <div className="w-20 h-20 bg-[#22C55E]/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="text-[#22C55E]" size={40} />
                </div>
                <h3 className="text-3xl font-extrabold text-[#1a2744] mb-3">Registration Successful!</h3>
                <p className="text-gray-600 leading-relaxed mb-8 max-w-md">
                  Thank you for registering. You should receive a confirmation email shortly with your login details.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="bg-[#203c7c] hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                >
                  Register Another Candidate
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                
                {/* SECTION 1: Personal Information */}
                <div className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-50 p-8">
                  <h3 className="text-xl font-extrabold text-[#1a2744] mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#D93A43]/10 text-[#D93A43] flex items-center justify-center text-sm">1</span>
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    <div className="col-span-1 md:col-span-3">
                      <label className="text-sm font-bold text-gray-700 mb-1.5 block">Title</label>
                      <select name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border text-gray-600 placeholder:text-gray-400 border-[#E5E7EB] bg-[#FFFFFF] focus:bg-white focus:border-[#D93A43] focus:ring-2 focus:ring-[#D93A43]/20 focus:outline-none transition-colors">
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Prof.">Prof.</option>
                      </select>
                    </div>
                    
                    <div className="col-span-1 md:col-span-4 flex flex-col">
                      <label className="text-sm font-bold text-gray-700 mb-1.5 block">First Name <span className="text-[#d3222a]">*</span></label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border text-gray-600 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:border-[#D93A43] focus:ring-[#D93A43]/20 focus:outline-none transition-colors ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB] bg-[#FFFFFF]'}`} placeholder="John" />
                      {errors.firstName && <span className="error-text text-red-500 text-xs mt-1 font-medium">{errors.firstName}</span>}
                    </div>

                    <div className="col-span-1 md:col-span-5 flex flex-col">
                      <label className="text-sm font-bold text-gray-700 mb-1.5 block">Last Name <span className="text-[#d3222a]">*</span></label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border text-gray-600 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:border-[#D93A43] focus:ring-[#D93A43]/20 focus:outline-none transition-colors ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB] bg-[#FFFFFF]'}`} placeholder="Doe" />
                      {errors.lastName && <span className="error-text text-red-500 text-xs mt-1 font-medium">{errors.lastName}</span>}
                    </div>

                    <div className="col-span-1 md:col-span-6 flex flex-col">
                      <label className="text-sm font-bold text-gray-700 mb-1.5 block">Date of Birth</label>
                      <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border text-gray-600 placeholder:text-gray-400 border-[#E5E7EB] bg-[#FFFFFF] focus:bg-white focus:border-[#D93A43] focus:ring-2 focus:ring-[#D93A43]/20 focus:outline-none transition-colors" />
                    </div>

                    <div className="col-span-1 md:col-span-6 flex flex-col">
                      <label className="text-sm font-bold text-gray-700 mb-1.5 block">Gender</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border text-gray-600 placeholder:text-gray-400 border-[#E5E7EB] bg-[#FFFFFF] focus:bg-white focus:border-[#D93A43] focus:ring-2 focus:ring-[#D93A43]/20 focus:outline-none transition-colors">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: Contact Information */}
                <div className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-50 p-8">
                  <h3 className="text-xl font-extrabold text-[#1a2744] mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#D93A43]/10 text-[#D93A43] flex items-center justify-center text-sm">2</span>
                    Contact Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="col-span-1 md:col-span-2 flex flex-col">
                      <label className="text-sm font-bold text-gray-700 mb-1.5 block">Address</label>
                      <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border text-gray-600 placeholder:text-gray-400 border-[#E5E7EB] bg-[#FFFFFF] focus:bg-white focus:border-[#D93A43] focus:ring-2 focus:ring-[#D93A43]/20 focus:outline-none transition-colors" placeholder="Street Address" />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-bold text-gray-700 mb-1.5 block">City</label>
                      <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border text-gray-600 placeholder:text-gray-400 border-[#E5E7EB] bg-[#FFFFFF] focus:bg-white focus:border-[#D93A43] focus:ring-2 focus:ring-[#D93A43]/20 focus:outline-none transition-colors" placeholder="City" />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-bold text-gray-700 mb-1.5 block">State / Province</label>
                      <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border text-gray-600 placeholder:text-gray-400 border-[#E5E7EB] bg-[#FFFFFF] focus:bg-white focus:border-[#D93A43] focus:ring-2 focus:ring-[#D93A43]/20 focus:outline-none transition-colors" placeholder="State" />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-bold text-gray-700 mb-1.5 block">Country</label>
                      <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border text-gray-600 placeholder:text-gray-400 border-[#E5E7EB] bg-[#FFFFFF] focus:bg-white focus:border-[#D93A43] focus:ring-2 focus:ring-[#D93A43]/20 focus:outline-none transition-colors" placeholder="Country" />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-bold text-gray-700 mb-1.5 block">Pin Code</label>
                      <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border text-gray-600 placeholder:text-gray-400 border-[#E5E7EB] bg-[#FFFFFF] focus:bg-white focus:border-[#D93A43] focus:ring-2 focus:ring-[#D93A43]/20 focus:outline-none transition-colors" placeholder="Postal Code" />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-bold text-gray-700 mb-1.5 block">Mobile Number <span className="text-[#d3222a]">*</span></label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border text-gray-600 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:border-[#D93A43] focus:ring-[#D93A43]/20 focus:outline-none transition-colors ${errors.phone ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB] bg-[#FFFFFF]'}`} placeholder="+91 98765 43210" />
                      {errors.phone && <span className="error-text text-red-500 text-xs mt-1 font-medium">{errors.phone}</span>}
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-bold text-gray-700 mb-1.5 block">Email Address <span className="text-[#d3222a]">*</span></label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border text-gray-600 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:border-[#D93A43] focus:ring-[#D93A43]/20 focus:outline-none transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB] bg-[#FFFFFF]'}`} placeholder="john@example.com" />
                      {errors.email && <span className="error-text text-red-500 text-xs mt-1 font-medium">{errors.email}</span>}
                    </div>
                  </div>
                </div>

                {/* SECTION 3: Professional Information */}
                <div className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-50 p-8">
                  <h3 className="text-xl font-extrabold text-[#1a2744] mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#D93A43]/10 text-[#D93A43] flex items-center justify-center text-sm">3</span>
                    Professional Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="col-span-1 md:col-span-2 flex flex-col">
                      <label className="text-sm font-bold text-gray-700 mb-1.5 block">Qualification</label>
                      <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border text-gray-600 placeholder:text-gray-400 border-[#E5E7EB] bg-[#FFFFFF] focus:bg-white focus:border-[#D93A43] focus:ring-2 focus:ring-[#D93A43]/20 focus:outline-none transition-colors" placeholder="e.g. MBBS, BSc Nursing" />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-bold text-gray-700 mb-1.5 block">Organization / Hospital Name</label>
                      <input type="text" name="organization" value={formData.organization} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border text-gray-600 placeholder:text-gray-400 border-[#E5E7EB] bg-[#FFFFFF] focus:bg-white focus:border-[#D93A43] focus:ring-2 focus:ring-[#D93A43]/20 focus:outline-none transition-colors" placeholder="Hospital/Institution Name" />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-bold text-gray-700 mb-1.5 block">Designation</label>
                      <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border text-gray-600 placeholder:text-gray-400 border-[#E5E7EB] bg-[#FFFFFF] focus:bg-white focus:border-[#D93A43] focus:ring-2 focus:ring-[#D93A43]/20 focus:outline-none transition-colors" placeholder="Job Title" />
                    </div>
                  </div>
                </div>

                {/* SECTION 4: Course Selection */}
                <div className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-50 p-8">
                  <h3 className="text-xl font-extrabold text-[#1a2744] mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#D93A43]/10 text-[#D93A43] flex items-center justify-center text-sm">4</span>
                    Course Selection
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-bold text-gray-700 block">Candidate Type</label>
                      <div className="flex flex-wrap gap-4">
                        <label className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-colors ${formData.candidateType === 'Indian' ? 'border-[#D93A43] bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                          <input type="radio" name="candidateType" value="Indian" checked={formData.candidateType === 'Indian'} onChange={handleChange} className="w-4 h-4 text-[#D93A43]" />
                          <span className="font-semibold text-gray-800">Indian Candidate</span>
                        </label>
                        <label className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-colors ${formData.candidateType === 'International' ? 'border-[#D93A43] bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                          <input type="radio" name="candidateType" value="International" checked={formData.candidateType === 'International'} onChange={handleChange} className="w-4 h-4 text-[#D93A43]" />
                          <span className="font-semibold text-gray-800">International Candidate</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-bold text-gray-700 mb-1.5 block">Select Course <span className="text-[#d3222a]">*</span></label>
                      <select name="course" value={formData.course} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border text-gray-600 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:border-[#D93A43] focus:ring-[#D93A43]/20 focus:outline-none transition-colors ${errors.course ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB] bg-[#FFFFFF]'}`}>
                        <option value="">Select a course to register for</option>
                        {formData.course && !["Professionals", "General", "Surgical", "Other"].includes(formData.course) && (
                          <option value={formData.course}>{formData.course}</option>
                        )}
                        <option value="Professionals">Courses for Professionals</option>
                        <option value="General">Courses for General Public</option>
                        <option value="Surgical">Surgical Retrieval Courses</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.course && <span className="error-text text-red-500 text-xs mt-1 font-medium">{errors.course}</span>}
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-bold text-gray-700 mb-1.5 block">Additional Comments</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border text-gray-600 placeholder:text-gray-400 border-[#E5E7EB] bg-[#FFFFFF] focus:bg-white focus:border-[#D93A43] focus:ring-2 focus:ring-[#D93A43]/20 focus:outline-none transition-colors resize-none" placeholder="Any specific requirements or questions?"></textarea>
                    </div>
                  </div>
                </div>

                {/* SECTION 5: Terms & Conditions */}
                <div className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-50 p-8 overflow-hidden">
                  <h3 className="text-xl font-extrabold text-[#1a2744] mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#D93A43]/10 text-[#D93A43] flex items-center justify-center text-sm">5</span>
                    Terms & Conditions
                  </h3>
                  
                  <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
                    <button 
                      type="button" 
                      onClick={() => setTermsOpen(!termsOpen)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-bold text-gray-800 flex items-center gap-2">
                        <AlertCircle size={18} className="text-[#D93A43]" />
                        MOHAN Foundation Terms & Conditions
                      </span>
                      {termsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    
                    <div className={`transition-all duration-300 ease-in-out ${termsOpen ? 'max-h-[400px] overflow-y-auto p-5 bg-white border-t border-gray-200' : 'max-h-0 overflow-hidden'}`}>
                      <div className="text-sm text-gray-600 space-y-4">
                        <p>1. By registering for this course, you agree to abide by the rules and regulations set forth by MOHAN Foundation.</p>
                        <p>2. The course fee is non-refundable and non-transferable under any circumstances once the payment is successful.</p>
                        <p>3. Access to the course material is restricted solely to the registered candidate. Sharing of credentials or material is strictly prohibited and will lead to cancellation of registration without refund.</p>
                        <p>4. Certification will only be provided upon successful completion of all required modules, assessments, and attendance criteria as specified for the respective course.</p>
                        <p>5. MOHAN Foundation reserves the right to modify the course content, duration, and schedule as deemed necessary for quality improvement.</p>
                      </div>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                    <input 
                      type="checkbox" 
                      name="termsAccepted" 
                      checked={formData.termsAccepted} 
                      onChange={handleChange} 
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-[#D93A43] focus:ring-[#D93A43]" 
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">I agree to the MOHAN Foundation Terms & Conditions <span className="text-[#d3222a]">*</span></span>
                      {errors.termsAccepted && <span className="error-text text-red-500 text-xs mt-1 font-medium">{errors.termsAccepted}</span>}
                    </div>
                  </label>
                </div>

                {/* BUTTONS */}
                <div className="flex flex-col-reverse sm:flex-row gap-4 mt-4">
                  <button 
                    type="button" 
                    onClick={handleReset}
                    className="w-full sm:w-1/3 border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={18} /> Reset Form
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full sm:w-2/3 bg-[#d3222a] hover:bg-red-800 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(211,34,42,0.4)] disabled:opacity-70 disabled:shadow-none"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>Proceed to Payment <Send size={18} /></>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>
          
          {/* RIGHT COLUMN: INFORMATION PANEL */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-50 p-6 lg:p-8 sticky top-32">
              <h3 className="text-xl font-extrabold text-[#1a2744] mb-6 border-b border-gray-100 pb-4">Course Highlights</h3>
              
              <ul className="flex flex-col gap-4 mb-8">
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle className="text-[#22C55E]" size={20} />
                  CPD Accredited
                </li>
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle className="text-[#22C55E]" size={20} />
                  Certificate Provided
                </li>
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle className="text-[#22C55E]" size={20} />
                  Online Access
                </li>
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle className="text-[#22C55E]" size={20} />
                  Healthcare Professionals
                </li>
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle className="text-[#22C55E]" size={20} />
                  Organ Donation Education
                </li>
              </ul>

              <h3 className="text-xl font-extrabold text-[#1a2744] mb-6 border-b border-gray-100 pb-4">Contact Support</h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-red-50 p-2 rounded-lg">
                    <Phone className="text-[#d3222a]" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">Helpline</h4>
                    <a href="tel:+919677202908" className="text-gray-600 hover:text-[#d3222a] transition-colors font-medium">
                      +91 96772 02908
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Mail className="text-[#D93A43]" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">Email Support</h4>
                    <a href="mailto:elearning@mohanfoundation.org" className="text-gray-600 hover:text-[#D93A43] transition-colors font-medium break-all">
                      elearning@mohanfoundation.org
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <FooterSection />
    </main>
  );
}
