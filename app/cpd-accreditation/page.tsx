'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import FooterSection from '@/components/FooterSection';
import DnaBackground from '@/components/DnaBackground';
import { ArrowRight, Heart, Award, Users, Scale, Stethoscope } from 'lucide-react';

const activities = [
  { title: "Transplant Coordination Professional Certificate", icon: Stethoscope },
  { title: "Post Graduate Diploma in Transplant Coordination & Grief Counselling", icon: Award },
  { title: "Brainstem Death – Identification, Certification and Donor Optimization", icon: Heart },
  { title: "Legal Aspects of Organ Donation and Transplantation", icon: Scale },
  { title: "Family Counselling and Conversations on Organ Donation", icon: Users },
];

export default function CPDAccreditationPage() {
  return (
    <main className="min-h-screen flex flex-col font-sans bg-[#F8F4F1]">

      {/* HERO SECTION */}
      <section
        className="relative pt-[120px] pb-24 md:pt-[150px] md:pb-32 overflow-hidden"
        style={{ background: 'linear-gradient(90deg, #5B2333 0%, #7A2940 50%, #A23B4B 100%)' }}
      >
        <DnaBackground className="absolute inset-0 opacity-20" />

        {/* Particle Glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D89A2B]/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="container-fluid relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full md:w-[60%] text-white text-center md:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">MOHAN Foundation</h1>
              <div className="w-24 h-1 bg-[#D89A2B] mb-6 mx-auto md:mx-0"></div>
              <h2 className="text-xl md:text-2xl font-medium text-white/90 mb-8 tracking-wide">CPD Standards Office Provider Number: 50809</h2>
              <Link
                href="/enquire-us"
                className="inline-flex items-center gap-2 bg-[#1E2B5C] hover:bg-[#131b3a] text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-1 shadow-[0_10px_30px_rgba(30,43,92,0.3)] group"
              >
                Send an enquiry <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Right: Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="w-full md:w-[40%] flex justify-center md:justify-end"
            >
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative"
              >
                {/* Halo Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  className="absolute inset-[-20px] rounded-full border border-[#D89A2B]/30 border-dashed"
                ></motion.div>
                {/* Glow */}
                <div className="absolute inset-0 bg-[#D89A2B]/30 blur-[40px] rounded-full"></div>
                <img
                  src="/cdp-logo.jpg"
                  alt="Accredited CPD"
                  className="relative z-10 w-[250px] md:w-[350px] h-[250px] md:h-[350px] object-cover rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/10"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DESCRIPTION & ACTIVITIES SECTION */}
      <section className="py-20 md:py-28 relative">
        <div className="container-fluid max-w-6xl mx-auto">
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_30px_60px_rgba(30,43,92,0.05)] rounded-[32px] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-12 lg:gap-20">

            {/* 40% Logo Area */}
            <div className="w-full md:w-[40%] flex flex-col items-center md:items-start shrink-0">
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                src="/logo.png"
                alt="MOHAN Foundation"
                className="w-[200px] md:w-[280px] h-auto drop-shadow-xl sticky top-32"
              />
            </div>

            {/* 60% Content Area */}
            <div className="w-full md:w-[60%] flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {["Education & Training Centres", "Events & Networking", "Health & Safety"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    className="bg-[#1E2B5C]/5 text-[#1E2B5C] px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wide border border-[#1E2B5C]/10"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl font-extrabold text-[#1E2B5C] mb-6"
              >
                Description:
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#1E2B5C]/80 space-y-5 mb-12 leading-relaxed"
              >
                <p>MOHAN (Multi Organ Harvesting Aid Network) Foundation is a pioneering Not-for-profit, Non-Governmental Organization dedicated to creating a supportive ecosystem for deceased organ donations in India. Established in Chennai, the Foundation has been saving lives since 1997.</p>
                <p>The Foundation is dedicated to promoting and facilitating ethical organ donation and transplantation. Its efforts focus on creating awareness, training healthcare professionals, counselling and supporting families, building networks with stakeholders, and liaising with governments on policy-making.</p>
                <p>As part of its training initiatives, MOHAN Foundation is offering a series of online courses tailored of transplant coordinators, medical and paramedical professionals and hospital administrators. A few online courses are offered for the general public as well.</p>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-2xl font-extrabold text-[#1E2B5C] mb-8"
              >
                Accredited Activities:
              </motion.h3>

              <div className="flex flex-col gap-4">
                {activities.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,1)" }}
                    className="flex items-center gap-4 bg-white/50 p-4 rounded-xl border border-[#1E2B5C]/10 shadow-[0_5px_15px_rgba(30,43,92,0.02)] relative overflow-hidden group cursor-default transition-all duration-300"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D63B45] group-hover:w-1.5 transition-all duration-300"></div>
                    <div className="w-10 h-10 rounded-full bg-[#1E2B5C]/5 flex items-center justify-center shrink-0 group-hover:bg-[#D63B45]/10 transition-colors duration-300 ml-2">
                      <activity.icon className="text-[#1E2B5C] group-hover:text-[#D63B45] w-5 h-5 transition-colors duration-300" />
                    </div>
                    <span className="font-semibold text-[#1E2B5C] leading-snug">{activity.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FURTHER INFORMATION CTA */}
      <section className="pb-24 px-4">
        <div className="container-fluid max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#1E2B5C] rounded-[32px] p-10 md:p-16 text-center relative overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#D63B45]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#D89A2B]/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8">Further Information</h2>
              <Link
                href="/"
                className="inline-flex items-center gap-3 bg-[#D89A2B] text-[#1E2B5C] px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(216,154,43,0.4)] hover:bg-[#c98f28] group"
              >
                Visit MOHAN eLearning Portal <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
