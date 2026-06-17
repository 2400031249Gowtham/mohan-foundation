'use client';

import { useState } from 'react';
import { MapPin, Mail, Phone, Globe, Share2, Users, ExternalLink, Send, X } from 'lucide-react';
import FooterSection from '@/components/FooterSection';

export default function EnquireUsPage() {
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
  const [isMapPopupOpen, setIsMapPopupOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
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

  return (
    <main className="min-h-screen flex flex-col bg-[#FAFAF7] pt-[100px] font-sans">
      
      {/* HERO SECTION */}
      <section className="bg-[#FFFFFF] text-[#0F172A] py-20 px-8 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0B1420]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#0B1420]/5 border border-[#0B1420]/10 px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold tracking-[0.08em] mb-6 text-[#64748B]">
            CONTACT US
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,4vw,4rem)] font-bold mb-4 leading-[1.1]">Enquire Us</h1>
          <p className="text-[1.1rem] text-[#64748B] leading-[1.6]">
            Get in touch with MOHAN Foundation regarding courses, certifications, CPD training, organ donation education programs, and partnerships.
          </p>
        </div>
      </section>

      {/* CONTACT + ENQUIRY FORM SECTION */}
      <section className="py-24 px-8 relative z-10 -mt-10">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="bg-[#FFFFFF] rounded-[32px] p-3 md:p-4 shadow-[0_10px_40px_rgba(15,23,42,0.08)] border border-[#0F172A]/[0.08] flex flex-col lg:flex-row gap-4">
            
            {/* LEFT COLUMN: Contact Details */}
            <div className="w-full lg:w-[40%] bg-[#0B1420] text-[#FFFFFF] rounded-[24px] p-10 relative overflow-hidden flex flex-col justify-between">
              {/* Box Decor */}
              <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-[#FFFFFF]/5 rounded-tl-[100px] rounded-br-[24px] pointer-events-none" />
              <div className="absolute top-[-50px] left-[-50px] w-[150px] h-[150px] bg-[#10B981]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <h3 className="font-bold text-[1.5rem] mb-2 text-[#FFFFFF]">Get in Touch</h3>
                <p className="text-[#FFFFFF]/80 text-[0.95rem] leading-[1.6] mb-10">
                  Have questions about our CPD courses? We're here to help you get the answers.
                </p>
                
                <div className="flex flex-col gap-8">
                  {/* Address */}
                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#10B981] transition-colors">
                      <MapPin size={18} className="text-[#FFFFFF]" />
                    </div>
                    <div>
                      <div className="text-[0.85rem] font-bold text-[#FFFFFF]/60 uppercase tracking-[0.05em] mb-1">Address</div>
                      <p className="text-[#FFFFFF] text-[0.95rem] leading-[1.6]">
                        MOHAN Foundation<br />
                        3rd Floor, Toshniwal Building,<br />
                        267, Kilpauk Garden Road,<br />
                        Chennai - 600 010, India
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <a href="mailto:elearning@mohanfoundation.org" className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#10B981] transition-colors">
                      <Mail size={18} className="text-[#FFFFFF]" />
                    </div>
                    <div>
                      <div className="text-[0.85rem] font-bold text-[#FFFFFF]/60 uppercase tracking-[0.05em] mb-1">Email Address</div>
                      <div className="text-[#FFFFFF] text-[0.95rem] group-hover:text-[#10B981] transition-colors font-medium block mb-1">
                        elearning@mohanfoundation.org
                      </div>
                    </div>
                  </a>

                  {/* Phone */}
                  <a href="tel:+916374773957" className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#10B981] transition-colors">
                      <Phone size={18} className="text-[#FFFFFF]" />
                    </div>
                    <div>
                      <div className="text-[0.85rem] font-bold text-[#FFFFFF]/60 uppercase tracking-[0.05em] mb-1">Phone</div>
                      <div className="text-[#FFFFFF] text-[0.95rem] group-hover:text-[#10B981] transition-colors font-medium block mb-1">
                        +91-63747-73957
                      </div>
                    </div>
                  </a>

                  {/* Toll Free */}
                  <a href="tel:18001037100" className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-[#FFFFFF] fill-white" />
                    </div>
                    <div>
                      <div className="text-[0.85rem] font-bold text-[#FFFFFF]/60 uppercase tracking-[0.05em] mb-1">Toll Free</div>
                      <div className="text-[#FFFFFF] text-[1.1rem] group-hover:text-[#10B981] transition-colors font-black tracking-wider">
                        1800-103-7100
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                <h4 className="text-[0.85rem] font-bold text-[#FFFFFF]/60 uppercase tracking-[0.05em] mb-4">Connect With Us</h4>
                <div className="flex gap-3">
                  {[
                    { Icon: Globe, href: "https://mohanfoundation.org" },
                    { Icon: Share2, href: "https://facebook.com/mohanfoundation" },
                    { Icon: Users, href: "https://linkedin.com/company/mohanfoundation" },
                    { Icon: ExternalLink, href: "https://mohanfoundation.org/about" }
                  ].map(({ Icon, href }, i) => (
                    <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#10B981] hover:-translate-y-1 flex items-center justify-center transition-all duration-300">
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Form */}
            <div className="w-full lg:w-[60%] p-8 lg:p-12 relative">
              <h3 className="font-bold text-[#0F172A] text-[1.8rem] mb-2 leading-tight">Send a Message</h3>
              <p className="text-[#64748B] text-[0.95rem] mb-8">Please fill out the form below and our team will get back to you promptly.</p>

              {isSuccess ? (
                <div className="bg-[#ECFDF5] border border-[#10B981]/20 text-[#047857] p-10 rounded-[24px] flex flex-col items-center justify-center text-center animate-in fade-in duration-500 h-[80%]">
                  <div className="w-20 h-20 bg-[#FFFFFF] rounded-full flex items-center justify-center mb-5 shadow-sm">
                    <Send className="text-[#10B981]" size={32} />
                  </div>
                  <h3 className="text-2xl font-black mb-2">Message Sent!</h3>
                  <p className="text-[#047857]/80 leading-relaxed mb-8">
                    Thank you for contacting MOHAN Foundation. Our e-learning team will contact you shortly.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="bg-[#10B981] hover:bg-[#059669] text-[#FFFFFF] font-bold py-3.5 px-8 rounded-full transition-colors shadow-lg shadow-[#10B981]/20"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="flex flex-col">
                      <label className="text-[0.8rem] font-bold text-[#0F172A] uppercase tracking-[0.05em] mb-2">Full Name <span className="text-[#B91C1C]">*</span></label>
                      <input 
                        type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                        className={`w-full px-5 py-3.5 text-[#475569] placeholder:text-[#94A3B8] rounded-[14px] bg-[#FFFFFF] border focus:ring-2 focus:ring-[#10B981]/15 focus:border-[#10B981] focus:bg-[#FFFFFF] outline-none transition-all ${errors.fullName ? 'border-[#B91C1C] bg-[#FEF2F2]' : 'border-[#DCE3EA]'}`}
                        placeholder="John Doe"
                      />
                      {errors.fullName && <span className="text-[#B91C1C] text-xs mt-1.5 font-bold">{errors.fullName}</span>}
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col">
                      <label className="text-[0.8rem] font-bold text-[#0F172A] uppercase tracking-[0.05em] mb-2">Email Address <span className="text-[#B91C1C]">*</span></label>
                      <input 
                        type="email" name="email" value={formData.email} onChange={handleChange}
                        className={`w-full px-5 py-3.5 text-[#475569] placeholder:text-[#94A3B8] rounded-[14px] bg-[#FFFFFF] border focus:ring-2 focus:ring-[#10B981]/15 focus:border-[#10B981] focus:bg-[#FFFFFF] outline-none transition-all ${errors.email ? 'border-[#B91C1C] bg-[#FEF2F2]' : 'border-[#DCE3EA]'}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <span className="text-[#B91C1C] text-xs mt-1.5 font-bold">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone Number */}
                    <div className="flex flex-col">
                      <label className="text-[0.8rem] font-bold text-[#0F172A] uppercase tracking-[0.05em] mb-2">Phone Number <span className="text-[#B91C1C]">*</span></label>
                      <input 
                        type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        className={`w-full px-5 py-3.5 text-[#475569] placeholder:text-[#94A3B8] rounded-[14px] bg-[#FFFFFF] border focus:ring-2 focus:ring-[#10B981]/15 focus:border-[#10B981] focus:bg-[#FFFFFF] outline-none transition-all ${errors.phone ? 'border-[#B91C1C] bg-[#FEF2F2]' : 'border-[#DCE3EA]'}`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && <span className="text-[#B91C1C] text-xs mt-1.5 font-bold">{errors.phone}</span>}
                    </div>

                    {/* Organization */}
                    <div className="flex flex-col">
                      <label className="text-[0.8rem] font-bold text-[#0F172A] uppercase tracking-[0.05em] mb-2">Organization</label>
                      <input 
                        type="text" name="organization" value={formData.organization} onChange={handleChange}
                        className="w-full px-5 py-3.5 text-[#475569] placeholder:text-[#94A3B8] rounded-[14px] bg-[#FFFFFF] border border-[#DCE3EA] focus:ring-2 focus:ring-[#10B981]/15 focus:border-[#10B981] focus:bg-[#FFFFFF] outline-none transition-all"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Course */}
                    <div className="flex flex-col">
                      <label className="text-[0.8rem] font-bold text-[#0F172A] uppercase tracking-[0.05em] mb-2">Course of Interest</label>
                      <select 
                        name="course" value={formData.course} onChange={handleChange}
                        className="w-full px-5 py-3.5 text-[#475569] placeholder:text-[#94A3B8] rounded-[14px] bg-[#FFFFFF] border border-[#DCE3EA] focus:ring-2 focus:ring-[#10B981]/15 focus:border-[#10B981] focus:bg-[#FFFFFF] outline-none transition-all appearance-none cursor-pointer"
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
                      <label className="text-[0.8rem] font-bold text-[#0F172A] uppercase tracking-[0.05em] mb-2">Subject</label>
                      <input 
                        type="text" name="subject" value={formData.subject} onChange={handleChange}
                        className="w-full px-5 py-3.5 text-[#475569] placeholder:text-[#94A3B8] rounded-[14px] bg-[#FFFFFF] border border-[#DCE3EA] focus:ring-2 focus:ring-[#10B981]/15 focus:border-[#10B981] focus:bg-[#FFFFFF] outline-none transition-all"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col">
                    <label className="text-[0.8rem] font-bold text-[#0F172A] uppercase tracking-[0.05em] mb-2">Message <span className="text-[#B91C1C]">*</span></label>
                    <textarea 
                      name="message" value={formData.message} onChange={handleChange} rows={4}
                      className={`w-full px-5 py-3.5 text-[#475569] placeholder:text-[#94A3B8] rounded-[14px] bg-[#FFFFFF] border focus:ring-2 focus:ring-[#10B981]/15 focus:border-[#10B981] focus:bg-[#FFFFFF] outline-none transition-all resize-none ${errors.message ? 'border-[#B91C1C] bg-[#FEF2F2]' : 'border-[#DCE3EA]'}`}
                      placeholder="How can we help you?"
                    ></textarea>
                    {errors.message && <span className="text-[#B91C1C] text-xs mt-1.5 font-bold">{errors.message}</span>}
                  </div>

                  {/* Button */}
                  <div className="mt-2">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-[#10B981] hover:bg-[#059669] text-[#FFFFFF] font-bold py-4 px-6 rounded-[14px] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(16,185,129,0.2)] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(16,185,129,0.3)] disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? (
                        <span className="w-5 h-5 border-2 border-[#FFFFFF]/30 border-t-[#FFFFFF] rounded-full animate-spin"></span>
                      ) : (
                        <>Submit Enquiry <Send size={18} /></>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION MAP SECTION */}
      <section className="bg-[#FFFFFF] py-24 border-t border-[#0F172A]/[0.08]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-bold text-[#0F172A] leading-[1.1]">Our Location</h2>
            <p className="text-[#64748B] mt-4">Visit our headquarters in Chennai, India.</p>
          </div>
          
          <div className="w-full h-[500px] bg-[#FAFAF7] rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(15,23,42,0.08)] border border-[#0F172A]/[0.08] relative group flex items-center justify-center">
            
            {/* Embedded Google Map Background */}
            <div className="absolute inset-0 pointer-events-none">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.197940193165!2d80.2343936750763!3d13.086657887239454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266710b17849d%3A0xcb1b5906daecb8cb!2sMOHAN%20Foundation!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 scale-[1.2]"
                title="MOHAN Foundation Location"
              ></iframe>
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#0B1420]/5 pointer-events-none transition-colors group-hover:bg-transparent duration-500"></div>

            {/* Custom Marker */}
            <div className="absolute z-10" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -100%)' }}>
              <button 
                onClick={() => setIsMapPopupOpen(true)}
                className="relative group/marker flex flex-col items-center cursor-pointer"
              >
                <div className="bg-[#10B981] p-4 rounded-full text-[#FFFFFF] shadow-[0_10px_20px_rgba(16,185,129,0.4)] group-hover/marker:-translate-y-2 group-hover/marker:scale-110 transition-all duration-300">
                  <MapPin size={32} fill="currentColor" className="text-[#FFFFFF]" />
                </div>
                {/* Marker shadow */}
                <div className="w-8 h-2.5 bg-[#0B1420]/30 rounded-full mt-2 blur-[3px] group-hover/marker:scale-75 group-hover/marker:opacity-50 transition-all duration-300"></div>
                
                {/* Label */}
                <span className="absolute top-[110%] mt-2 whitespace-nowrap bg-[#FFFFFF] px-4 py-1.5 rounded-[10px] text-[0.8rem] font-bold text-[#0F172A] shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-[#0F172A]/[0.08] opacity-0 group-hover/marker:opacity-100 group-hover/marker:translate-y-1 transition-all pointer-events-none">
                  MOHAN Foundation HQ
                </span>
              </button>
            </div>

            {/* Information Popup */}
            {isMapPopupOpen && (
              <div className="absolute z-20 bg-[#FFFFFF] rounded-[24px] shadow-[0_20px_60px_rgba(15,23,42,0.15)] border border-[#0F172A]/[0.08] p-8 w-[350px] top-1/2 left-1/2 -translate-y-full -translate-x-1/2 mb-12 animate-in zoom-in duration-300 text-left">
                <button 
                  onClick={() => setIsMapPopupOpen(false)}
                  className="absolute top-5 right-5 text-[#64748B] hover:text-[#B91C1C] hover:bg-[#B91C1C]/5 p-1 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                
                <h3 className="font-extrabold text-[1.2rem] text-[#0F172A] mb-4">MOHAN Foundation</h3>
                
                <div className="flex flex-col gap-4 text-[0.9rem] text-[#64748B] mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#10B981] shrink-0 mt-0.5" />
                    <p className="leading-snug">
                      3rd Floor, Toshniwal Building<br />
                      267, Kilpauk Garden Road<br />
                      Chennai – 600010
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-[#10B981] shrink-0" />
                    <p>Phone: <a href="tel:+914426447000" className="hover:text-[#10B981] font-medium transition-colors">+91 44 2644 7000</a></p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-[#10B981] shrink-0" />
                    <p>Toll Free: <a href="tel:18001037100" className="hover:text-[#10B981] font-medium transition-colors">1800 103 7100</a></p>
                  </div>
                </div>

                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=MOHAN+Foundation+Headquarters,+267,+Kilpauk+Garden+Road,+Chennai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0B1420] hover:bg-[#162235] text-[#FFFFFF] font-bold py-3.5 px-4 rounded-[12px] transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <MapPin size={18} />
                  Get Directions
                </a>
              </div>
            )}

            {/* "Open in Maps" Button */}
            <div className="absolute bottom-6 right-6 z-10">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=MOHAN+Foundation,+267,+Kilpauk+Garden+Road,+Chennai"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFFFFF] hover:bg-[#FAFAF7] text-[#0F172A] font-bold py-3 px-6 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center gap-2 transition-all hover:-translate-y-0.5 border border-[#0F172A]/[0.08] text-[0.85rem]"
              >
                <Globe size={16} className="text-[#10B981]" />
                Open in Maps
              </a>
            </div>

          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
