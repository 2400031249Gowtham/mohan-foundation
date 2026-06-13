'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate, PanInfo } from 'framer-motion';

interface Infinite3DCarouselProps<T> {
  items: T[];
  renderCard: (item: T, isActive: boolean, isDesktop: boolean) => React.ReactNode;
  cardWidthDesktop?: number;
  autoPlayInterval?: number;
}

export default function Infinite3DCarousel<T extends { uniqueKey?: string, id?: string | number }>({
  items,
  renderCard,
  cardWidthDesktop = 420,
  autoPlayInterval = 5000,
}: Infinite3DCarouselProps<T>) {
  const [isMobile, setIsMobile] = useState(false);
  const [itemWidth, setItemWidth] = useState(cardWidthDesktop);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Ensure enough items for infinite loop visually
  const displayItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    let arr = [...items];
    while (arr.length < 5) {
      arr = [...arr, ...items];
    }
    return arr.map((item, index) => ({ ...item, _loopId: `${item.uniqueKey || item.id}-${index}` }));
  }, [items]);

  const TOTAL_WIDTH = displayItems.length * itemWidth;

  const panX = useMotionValue(0);
  // Momentum physics settings as requested
  const springX = useSpring(panX, { stiffness: 120, damping: 20, mass: 0.8 });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // For mobile, the width is the screen width minus a small peek
      setItemWidth(mobile ? window.innerWidth * 0.85 : cardWidthDesktop);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cardWidthDesktop]);

  const handleMobileScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    // Mobile width is 85vw, plus 16px gap
    const cardW = window.innerWidth * 0.85 + 16;
    const index = Math.round(scrollLeft / cardW);
    if (index !== mobileActiveIndex) {
      setMobileActiveIndex(index);
    }
  };

  // Track active index based on drag position
  useEffect(() => {
    return springX.on("change", (v) => {
      if (TOTAL_WIDTH === 0) return;
      let normalized = ((-v % TOTAL_WIDTH) + TOTAL_WIDTH) % TOTAL_WIDTH;
      let currentIndex = Math.round(normalized / itemWidth) % displayItems.length;
      if (currentIndex < 0) currentIndex += displayItems.length;
      if (activeIndex !== currentIndex) {
        setActiveIndex(currentIndex);
      }
    });
  }, [springX, TOTAL_WIDTH, itemWidth, displayItems.length, activeIndex]);

  // Auto Rotation
  useEffect(() => {
    if (isHovered || displayItems.length === 0) return;
    const interval = setInterval(() => {
      const currentX = panX.get();
      const targetX = currentX - itemWidth;
      animate(panX, targetX, { type: "spring", stiffness: 120, damping: 20, mass: 0.8 });
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isHovered, panX, itemWidth, autoPlayInterval, displayItems.length]);

  const handlePanStart = () => {
    // Optionally stop any active animations
  };

  const handlePan = (e: any, info: PanInfo) => {
    panX.set(panX.get() + info.delta.x);
  };

  const handlePanEnd = (e: any, info: PanInfo) => {
    const currentX = panX.get();
    const velocity = info.velocity.x;
    const projectedX = currentX + velocity * 0.2; 
    const nearestSnap = Math.round(projectedX / itemWidth) * itemWidth;
    animate(panX, nearestSnap, { type: "spring", stiffness: 120, damping: 20, mass: 0.8 });
  };

  const CardRenderer = ({ item, index }: { item: any, index: number }) => {
    const distance = useTransform(springX, (x) => {
      const currentOffset = x + index * itemWidth;
      const normalized = ((currentOffset % TOTAL_WIDTH) + TOTAL_WIDTH) % TOTAL_WIDTH;
      return normalized > TOTAL_WIDTH / 2 ? normalized - TOTAL_WIDTH : normalized;
    });

    // We configure transforms based on desktop vs mobile
    // Desktop mapping
    const deskInput = [-itemWidth * 2, -itemWidth, 0, itemWidth, itemWidth * 2];
    const deskScale = useTransform(distance, deskInput, [0.75, 0.85, 1, 0.85, 0.75], { clamp: false });
    const deskOpacity = useTransform(distance, deskInput, [0.45, 0.65, 1, 0.65, 0.45], { clamp: false });
    const deskRotateY = useTransform(distance, deskInput, [10, 15, 0, -15, -10], { clamp: false });
    const deskX = useTransform(distance, deskInput, [-itemWidth * 1.2, -itemWidth * 0.7, 0, itemWidth * 0.7, itemWidth * 1.2], { clamp: false });
    const deskZ = useTransform(distance, deskInput, [-40, 40, 120, 40, -40], { clamp: false });
    const deskZIndex = useTransform(distance, deskInput, [30, 40, 50, 40, 30]);

    // Mobile mapping (pure horizontal slider, no 3D)
    const mobInput = [-itemWidth, 0, itemWidth];
    const mobScale = useTransform(distance, mobInput, [0.95, 1, 0.95], { clamp: false });
    const mobOpacity = useTransform(distance, mobInput, [0.65, 1, 0.65], { clamp: false });
    const mobX = distance;
    const mobZ = useMotionValue(0);
    const mobRotateY = useMotionValue(0);
    const mobZIndex = useTransform(distance, mobInput, [40, 50, 40]);

    const isActive = activeIndex === index;

    return (
      <motion.div
        onClick={() => {
          const currentDistance = distance.get();
          if (Math.abs(currentDistance) > 10) {
            animate(panX, panX.get() - currentDistance, { type: "spring", stiffness: 120, damping: 20, mass: 0.8 });
          }
        }}
        style={{
          position: 'absolute',
          width: itemWidth,
          left: '50%',
          marginLeft: -itemWidth / 2,
          scale: isMobile ? mobScale : deskScale,
          opacity: isMobile ? mobOpacity : deskOpacity,
          rotateY: isMobile ? mobRotateY : deskRotateY,
          x: isMobile ? mobX : deskX,
          z: isMobile ? mobZ : deskZ,
          zIndex: isMobile ? mobZIndex : deskZIndex,
        }}
        className="flex justify-center items-center cursor-pointer"
      >
        <motion.div 
          animate={isActive ? { y: [0, -6, 0] } : { y: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full p-4" // Padding acts as the visual gap
        >
          {renderCard(item, isActive, !isMobile)}
        </motion.div>
      </motion.div>
    );
  };

  if (displayItems.length === 0) return null;

  if (isMobile) {
    return (
      <div className="w-full flex flex-col items-center">
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
        <div 
          ref={scrollRef}
          onScroll={handleMobileScroll}
          className="w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar px-[7.5vw] py-8 gap-4"
        >
          {items.map((item, index) => {
            const isActive = index === mobileActiveIndex;
            return (
              <div 
                key={item.uniqueKey || item.id || index} 
                className={`flex-shrink-0 w-[85vw] max-w-[420px] snap-center transition-all duration-300 ease-out ${isActive ? 'scale-100 opacity-100' : 'scale-[0.96] opacity-[0.8]'}`}
              >
                {/* Wrap in padding identical to desktop to keep card sizing consistent */}
                <div className="w-full h-full pb-6">
                  {renderCard(item, isActive, false)}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Pagination indicators */}
        <div className="flex items-center justify-center gap-2 mt-2 relative z-50">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (scrollRef.current) {
                  const cardW = window.innerWidth * 0.85 + 16;
                  scrollRef.current.scrollTo({ left: idx * cardW, behavior: 'smooth' });
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${mobileActiveIndex === idx ? 'w-6 bg-mf-red' : 'w-2 bg-mf-red/20'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center hidden md:flex">
      <motion.div
        className="relative w-full h-[650px] overflow-hidden flex justify-center items-center cursor-grab active:cursor-grabbing"
        style={{ perspective: 1800, transformStyle: "preserve-3d" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        {displayItems.map((item, index) => (
          <CardRenderer key={item._loopId} item={item} index={index} />
        ))}
      </motion.div>

      {/* Pagination indicators */}
      <div className="flex items-center justify-center gap-2 mt-4 relative z-50">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              const targetX = -idx * itemWidth;
              animate(panX, targetX, { type: "spring", stiffness: 120, damping: 20, mass: 0.8 });
            }}
            className={`h-2 rounded-full transition-all duration-300 ${activeIndex % items.length === idx ? 'w-6 bg-mf-red' : 'w-2 bg-mf-red/20'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
