'use client';

import { useState, useEffect } from 'react';
import { X, MapPin, Mail, Phone, Globe, Share2, Users, ExternalLink, Send } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    course: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email Address is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email Address is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        course: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#0b1a35]/60 backdrop-blur-sm transition-opacity duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={handleClose}></div>

      {/* Modal Content */}
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] animate-in fade-in zoom-in-95 duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-2 bg-gray-100 md:bg-white md:hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-full transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* LEFT SIDE: Contact Details */}
        <div className="w-full md:w-[40%] bg-[#203c7c] text-white p-8 md:p-12 flex flex-col justify-between overflow-y-auto">
          <div>
            <h2 className="text-3xl font-extrabold mb-8 text-white">Get in Touch</h2>
            
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 items-start">
                <MapPin className="text-[#d3222a] mt-1 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-lg mb-1">Address</h4>
                  <p className="text-white/70 leading-relaxed text-sm">
                    MOHAN Foundation<br />
                    3rd Floor, Toshniwal Building,<br />
                    267, Kilpauk Garden Road,<br />
                    Chennai - 600 010, India
                  </p>
                </div>
              </div>

              <a href="mailto:elearning@mohanfoundation.org" className="flex gap-4 items-start group">
                <Mail className="text-[#d3222a] mt-1 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-lg mb-1">Email</h4>
                  <div className="text-white/70 group-hover:text-white transition-colors text-sm">
                    elearning@mohanfoundation.org
                  </div>
                </div>
              </a>

              <a href="tel:+916374773957" className="flex gap-4 items-start group">
                <Phone className="text-[#d3222a] mt-1 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-lg mb-1">Phone</h4>
                  <div className="text-white/70 group-hover:text-white transition-colors text-sm block mb-1">
                    +91-63747-73957
                  </div>
                </div>
              </a>

              <a href="tel:18001037100" className="flex gap-4 items-start group">
                <div className="mt-1 shrink-0 bg-[#d3222a] rounded-full p-1 text-white flex items-center justify-center w-6 h-6">
                  <Phone size={14} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Toll Free</h4>
                  <div className="text-white/70 group-hover:text-white transition-colors text-sm font-semibold">
                    1800-103-7100
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-12">
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {[Globe, Share2, Users, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#d3222a] flex items-center justify-center transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Enquiry Form */}
        <div className="w-full md:w-[60%] p-8 md:p-12 overflow-y-auto bg-gray-50">
          <h2 className="text-3xl font-extrabold text-[#1a2744] mb-2">Send us a Message</h2>
          <p className="text-gray-500 mb-8 text-sm">Please fill out the form below and our team will get back to you.</p>

          {isSuccess ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Send className="text-green-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-green-700 leading-relaxed mb-6">
                Thank you for contacting MOHAN Foundation. Our team will get back to you shortly.
              </p>
              <button 
                onClick={handleClose}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1.5">Full Name <span className="text-[#d3222a]">*</span></label>
                  <input 
                    type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#203c7c]/20 focus:outline-none transition-colors ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <span className="text-red-500 text-xs mt-1 font-medium">{errors.fullName}</span>}
                </div>

                {/* Email Address */}
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1.5">Email Address <span className="text-[#d3222a]">*</span></label>
                  <input 
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#203c7c]/20 focus:outline-none transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="text-red-500 text-xs mt-1 font-medium">{errors.email}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone Number */}
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1.5">Phone Number <span className="text-[#d3222a]">*</span></label>
                  <input 
                    type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#203c7c]/20 focus:outline-none transition-colors ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <span className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</span>}
                </div>

                {/* Organization */}
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1.5">Organization / Hospital</label>
                  <input 
                    type="text" name="organization" value={formData.organization} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#203c7c]/20 focus:outline-none transition-colors"
                    placeholder="Optional"
                  />
                </div>
              </div>

              {/* Course Interested In */}
              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-700 mb-1.5">Course Interested In</label>
                <select 
                  name="course" value={formData.course} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#203c7c]/20 focus:outline-none transition-colors"
                >
                  <option value="">Select a course (Optional)</option>
                  <option value="Professionals">Courses for Professionals</option>
                  <option value="General">Courses for General Public</option>
                  <option value="Surgical">Surgical Retrieval Courses</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Subject */}
              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-700 mb-1.5">Subject</label>
                <input 
                  type="text" name="subject" value={formData.subject} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#203c7c]/20 focus:outline-none transition-colors"
                  placeholder="Optional"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-700 mb-1.5">Message <span className="text-[#d3222a]">*</span></label>
                <textarea 
                  name="message" value={formData.message} onChange={handleChange} rows={4}
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#203c7c]/20 focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}
                  placeholder="How can we help you?"
                ></textarea>
                {errors.message && <span className="text-red-500 text-xs mt-1 font-medium">{errors.message}</span>}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 bg-[#d3222a] hover:bg-red-800 text-white font-bold py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>Submit Enquiry <Send size={18} /></>
                  )}
                </button>
                <button 
                  type="button" 
                  onClick={handleClose}
                  className="px-6 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}
