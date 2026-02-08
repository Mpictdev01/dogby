"use client";

import ParallaxHero from "@/components/ParallaxHero";
import Navbar from "@/components/Navbar";
import RubiksCube from "@/components/RubiksCube";
import { RetroButton } from "@/components/RetroButton";
import { Copy, ShoppingCart } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

import Footer from "@/components/Footer";

import Preloader from "@/components/Preloader";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const ca = "0x1234...5678"; // Placeholder CA

  // CTA Image Settings (Fixed)
  const ctaScale = 1.5;
  const ctaX = 0;
  const ctaY = 0;

  // About Image Settings (Fixed)
  const aboutScale = 0.8;
  const aboutX = 250;
  const aboutY = -210;

  const handleCopy = () => {
    navigator.clipboard.writeText(ca);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="bg-[#05000A] min-h-screen text-white overflow-x-hidden">
      <Preloader />
      <Navbar />
      <ParallaxHero />
      

      

      

      


      {/* 3D Meme Cube & About Section */}
      <section className="container mx-auto px-6 py-20 min-h-[50vh] flex flex-col items-center justify-center relative">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-6xl relative z-10">
            {/* LEFT: Rubik's Cube */}
            <div className="flex justify-center md:justify-end">
                 <RubiksCube />
            </div>

            {/* RIGHT: About Section */}
            <div className="text-left space-y-6 relative">
                 {/* About Image */}
                 <div 
                    className="absolute pointer-events-none z-0"
                    style={{
                        transform: `translate(${aboutX}px, ${aboutY}px) scale(${aboutScale})`,
                        top: 0,
                        left: 0
                    }}
                 >
                     <img src="/about.png" alt="About Decoration" className="opacity-80" />
                 </div>

                <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-[#fafafa] uppercase">
                        ABOUT <span className="text-purple-500">DOGBY</span>
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                        Meet Dogby, the squishiest meme token on the blockchain. 
                        He's pink, he's round, and he's here to take over the moon with pure cuteness and community vibes.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        {/* Copy CA Button */}
                        <RetroButton onClick={handleCopy} className={clsx(copied && "bg-green-600 border-green-400 shadow-green-400")}>
                            <Copy size={20} />
                            {copied ? "Copied!" : "Copy CA"}
                        </RetroButton>

                        {/* Buy Button */}
                        <RetroButton className="bg-black">
                            <ShoppingCart size={20} />
                            Buy Now
                        </RetroButton>
                    </div>
                </div>
            </div>
        </div>

      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 pb-20 flex justify-center relative z-10">
          <div 
            className="relative w-full max-w-5xl"
            style={{
                transform: `translate(${ctaX}px, ${ctaY}px) scale(${ctaScale})`
            }}
          >
              <img src="/cta.png" alt="Join the Movement" className="w-full h-auto object-contain transition-transform duration-300" />
          </div>
      </section>

      <div className="relative z-20">
        <Footer />
      </div>
    </main>
  );
}
