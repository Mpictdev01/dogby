"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ParallaxHero() {
  // Fixed settings
  const parallaxStrength = 4;
  const heroScale = 1.0;

  // Finalized Hover Area Settings
  const boxWidth = 250;
  const boxHeight = 460;
  const boxY = 20;

  // Hover State (Controlled by Trigger Zone)
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement
  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Calculate movements based on strength - ONLY Layer 1 moves
  const xLayer1 = useTransform(springX, [-0.5, 0.5], [`-${parallaxStrength * 0.2}%`, `${parallaxStrength * 0.2}%`]);
  const yLayer1 = useTransform(springY, [-0.5, 0.5], [`-${parallaxStrength * 0.2}%`, `${parallaxStrength * 0.2}%`]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth) - 0.5;
      const normalizedY = (e.clientY / window.innerHeight) - 0.5;
      
      x.set(normalizedX);
      y.set(normalizedY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-[#2D0B5A] flex items-center justify-center">
      
      {/* Background Layer (Furthest) - MOVING */}
      <motion.div 
        style={{ x: xLayer1, y: yLayer1, scale: 1.15 }} 
        className="absolute inset-0 z-0"
      >
        <Image
          src="/layer-1.png"
          alt="Layer 1 Background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Middle Layer - STATIC */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/layer-2.webp"
          alt="Layer 2 Middle"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Foreground Hero Layer - STATIC SIZE, VISUAL ONLY */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <motion.div 
          animate={{ scale: heroScale }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px]"
        >
             {/* 
                TRIGGER ZONE 
                - Controls isHovered state
                - Invisible (no border)
             */}
             <div 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ 
                    width: boxWidth, 
                    height: boxHeight, 
                    marginTop: boxY 
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 cursor-pointer"
             />

          {/* Base Hero Image */}
          <div className={`relative w-full h-full ${isHovered ? 'hidden' : 'block'}`}>
             <Image
                src="/hero.png"
                alt="Hero Foreground"
                fill
                className="object-contain"
                priority
            />
          </div>
         
          {/* Hover Hero Image - Instant Swap */}
          <div className={`absolute inset-0 w-full h-full ${isHovered ? 'block' : 'hidden'}`}>
            <Image
                src="/hero-2.png"
                alt="Hero Foreground Hover"
                fill
                className="object-contain"
                priority
            />
          </div>

        </motion.div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#05000A] to-transparent z-30 pointer-events-none" />
    </div>
  );
}
