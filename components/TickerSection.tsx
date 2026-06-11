const items = [
  "Educational Grants Supported by TATA TRUSTS",
  "Empowering Students Across India",
  "CPD Accredited Since 2025",
  "Trusted by 12,000+ Healthcare Professionals",
  "National Reach — Organ Donation Awareness",
  "Pioneering India's Transplant Education Since 1997",
];

export default function TickerSection() {
  // Duplicate so the second copy fills in seamlessly as the first exits left
  const doubled = [...items, ...items];

  return (
    <div 
      className="relative overflow-hidden py-3 select-none bg-[rgba(255,255,255,0.75)] backdrop-blur-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
      style={{
        borderTop: '1px solid rgba(217,58,67,0.12)',
        borderBottom: '1px solid rgba(217,58,67,0.12)'
      }}
    >
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#FAF8F4] to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#FAF8F4] to-transparent" />

      <div className="flex whitespace-nowrap" style={{ animation: 'ticker 30s linear infinite', width: 'max-content' }}>
        {doubled.map((text, i) => (
          <span key={i} className="inline-flex items-center gap-3 flex-shrink-0 px-8">
            {/* Red dot separator */}
            <span className="w-1.5 h-1.5 bg-[#D93A43] rounded-full flex-shrink-0" />
            <span className="text-[#16213E] font-semibold text-[0.8rem] uppercase tracking-wider">
              {text}
            </span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
