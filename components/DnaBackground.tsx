'use client';
import React from 'react';

export default function DnaBackground({ className = '' }: { className?: string }) {
  // Number of base pairs in the DNA strand
  const pairs = Array.from({ length: 30 });
  
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-[1] opacity-[0.08] ${className}`}>
      {/* Left DNA Strand */}
      <div className="absolute top-[-10%] left-[-5%] md:left-[-2%] w-[120px] h-[120%] flex flex-col justify-between py-10 -rotate-[15deg]">
        {pairs.map((_, i) => {
          const delay = `${i * -0.2}s`;
          return (
            <div key={i} className="relative w-full h-[20px] will-change-transform">
              {/* Strand connection line */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 left-2 right-2 h-[2px] bg-gradient-to-r from-mf-red to-mf-navy origin-center"
                style={{
                  animation: `dna-scale 3s ease-in-out infinite`,
                  animationDelay: delay
                }}
              />
              {/* Left node */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-3 rounded-full bg-mf-red"
                style={{
                  animation: `dna-move-right 3s ease-in-out infinite`,
                  animationDelay: delay
                }}
              />
              {/* Right node */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 right-0 w-3 h-3 rounded-full bg-mf-navy"
                style={{
                  animation: `dna-move-left 3s ease-in-out infinite`,
                  animationDelay: delay
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Right DNA Strand */}
      <div className="absolute top-[-10%] right-[-5%] md:right-[-2%] w-[180px] h-[120%] flex flex-col justify-between py-10 rotate-[20deg]">
        {pairs.map((_, i) => {
          const delay = `${i * -0.25}s`;
          return (
            <div key={`r-${i}`} className="relative w-full h-[25px] will-change-transform">
              {/* Strand connection line */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 left-2 right-2 h-[2px] bg-gradient-to-r from-mf-navy to-[#10B981] origin-center"
                style={{
                  animation: `dna-scale-right 3.5s ease-in-out infinite`,
                  animationDelay: delay
                }}
              />
              {/* Left node */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-4 rounded-full bg-mf-navy"
                style={{
                  animation: `dna-move-right-large 3.5s ease-in-out infinite`,
                  animationDelay: delay
                }}
              />
              {/* Right node */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 right-0 w-4 h-4 rounded-full bg-[#10B981]"
                style={{
                  animation: `dna-move-left-large 3.5s ease-in-out infinite`,
                  animationDelay: delay
                }}
              />
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes dna-move-right {
          0%, 100% { transform: translate3d(0, -50%, 0) scale(1); z-index: 10; opacity: 1; }
          50% { transform: translate3d(108px, -50%, 0) scale(0.5); z-index: 0; opacity: 0.5; }
        }
        @keyframes dna-move-left {
          0%, 100% { transform: translate3d(0, -50%, 0) scale(0.5); z-index: 0; opacity: 0.5; }
          50% { transform: translate3d(-108px, -50%, 0) scale(1); z-index: 10; opacity: 1; }
        }
        @keyframes dna-scale {
          0%, 100% { transform: translateY(-50%) scaleX(1); opacity: 0.7; }
          50% { transform: translateY(-50%) scaleX(0.1); opacity: 0.2; }
        }

        @keyframes dna-move-right-large {
          0%, 100% { transform: translate3d(0, -50%, 0) scale(1); z-index: 10; opacity: 1; }
          50% { transform: translate3d(164px, -50%, 0) scale(0.5); z-index: 0; opacity: 0.5; }
        }
        @keyframes dna-move-left-large {
          0%, 100% { transform: translate3d(0, -50%, 0) scale(0.5); z-index: 0; opacity: 0.5; }
          50% { transform: translate3d(-164px, -50%, 0) scale(1); z-index: 10; opacity: 1; }
        }
        @keyframes dna-scale-right {
          0%, 100% { transform: translateY(-50%) scaleX(1); opacity: 0.7; }
          50% { transform: translateY(-50%) scaleX(0.1); opacity: 0.2; }
        }
      `}} />
    </div>
  );
}
