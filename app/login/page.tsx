'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import DnaBackground from '@/components/DnaBackground';
import { ArrowRight, Mail, Lock, CheckSquare, Square } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center font-sans bg-[#1E2B5C] relative overflow-hidden py-20 px-4">
      {/* Background Elements */}
      <DnaBackground className="absolute inset-0 opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D89A2B]/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D63B45]/20 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />
      
      <div className="container-fluid relative z-10 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/40 shadow-[0_30px_60px_rgba(0,0,0,0.3)] rounded-[32px] p-8 md:p-12"
        >
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-6">
              <img src="/logo.png" alt="MOHAN Foundation" className="h-14 mx-auto object-contain drop-shadow-md" />
            </Link>
            <h1 className="text-2xl font-extrabold text-[#1E2B5C]">Members Area</h1>
            <p className="text-gray-500 text-sm mt-2">Login to access your CPD Accreditation dashboard.</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#1E2B5C] ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D89A2B] focus:border-[#D89A2B] outline-none transition-all text-[#1E2B5C]"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#1E2B5C] ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D89A2B] focus:border-[#D89A2B] outline-none transition-all text-[#1E2B5C]"
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setRememberMe(!rememberMe)}>
              <div className="text-[#D89A2B] transition-transform group-hover:scale-110">
                {rememberMe ? <CheckSquare size={20} className="text-[#D63B45]" /> : <Square size={20} className="text-gray-300 group-hover:text-[#D89A2B]" />}
              </div>
              <span className="text-sm text-gray-600 font-medium select-none">Remember me</span>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#D63B45] hover:bg-[#B22A33] text-white py-3.5 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 shadow-[0_10px_20px_rgba(214,59,69,0.2)] group mt-8"
            >
              Login <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-medium">
            <a href="#" className="text-gray-500 hover:text-[#D89A2B] transition-colors">Lost your password?</a>
            <div className="text-gray-400">
              New here? <Link href="/register" className="text-[#1E2B5C] hover:text-[#D63B45] transition-colors ml-1 font-bold">Register</Link>
            </div>
          </div>

        </motion.div>
      </div>
    </main>
  );
}
