import AboutUsSection from "@/components/AboutUsSection";
import FAQSection from "@/components/FAQSection";
import KnowledgeEcosystem from "@/components/KnowledgeEcosystem";
import FooterSection from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import ThrivingSection from "@/components/QoutesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TickerSection from "@/components/TickerSection";
import ScrollReveal from "@/components/ScrollReveal";

import FeaturedCourses from "@/components/FeaturedCourses";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-mf-red selection:text-white">
      <div id="home" className="relative z-10">
        <HeroSection />
        <TickerSection />
      </div>
      
      <ScrollReveal>
        <FeaturedCourses />
      </ScrollReveal>
      
      {/*
      <ScrollReveal>
        <KnowledgeEcosystem />
      </ScrollReveal>
      */}
      
      <ScrollReveal>
        <ThrivingSection />
      </ScrollReveal>
      
      <ScrollReveal>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
      </ScrollReveal>
      
      <ScrollReveal>
        <div id="faq">
          <FAQSection />
        </div>
      </ScrollReveal>
      
      <ScrollReveal>
        <div id="about">
          <AboutUsSection />
        </div>
      </ScrollReveal>
      
      <ScrollReveal>
        <FooterSection />
      </ScrollReveal>
    </main>
  );
}
