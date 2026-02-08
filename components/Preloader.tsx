"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  // Final Synchronized Settings
  // Scale: 1.8 (Requested)
  // Pos X: 0 (True Center per comment "pas di tengah secara horizontal")
  // Pos Y: -60 (Adjusted to sit above the progress bar which is at translate-y-32)
  const scale = 1.8;
  const posX = 0; 
  const posY = -60; 

  useEffect(() => {
    // Progress Bar Animation (Exact 3s to match CSS)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1; // 100 steps * 30ms = 3000ms
      });
    }, 30);

    // Minimum animation duration (3s)
    const minTimePromise = new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    const loadPromise = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve(true);
      } else {
        window.addEventListener("load", () => resolve(true), { once: true });
      }
    });

    Promise.all([minTimePromise, loadPromise]).then(() => {
      setProgress(100); 
      // Fade out immediately after landing + load
      setFadingOut(true);
      setTimeout(() => {
        setMounted(false);
        // Allow scrolling again
        document.body.style.overflow = "";
      }, 1000);
    });

    // Lock scrolling on mount
    document.body.style.overflow = "hidden";

    return () => {
      clearInterval(interval);
      // Safety cleanup
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden transition-opacity duration-1000 ease-in-out",
        fadingOut ? "opacity-0" : "opacity-100"
      )}
    >
      {/* Balloon Wrapper */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <div 
            className="absolute left-1/2 w-32 md:w-48 animate-balloon-enter" 
            style={{ 
                transform: `translateX(calc(-50% + ${posX}%)) translateY(calc(-50% + ${posY}px)) scale(${scale})` 
            }}
        >
           <img
            src="/preloader.png"
            alt="Loading..."
            className="w-full h-auto animate-balloon-float"
          />
        </div>
      </div>

      {/* Retro Progress Bar */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-32 z-50 w-64 md:w-80">
        <div className="relative w-full h-8 bg-[#252525] border-2 border-[#fafafa] rounded-[10px] shadow-[3px_3px_0px_#fafafa] overflow-hidden">
            {/* Fill */}
            <div 
                className="h-full bg-[#fafafa] transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-black mix-blend-screen uppercase tracking-wider">
                    Loading {Math.round(progress)}%
                </span>
            </div>
        </div>
      </div>
    </div>
  );
}
