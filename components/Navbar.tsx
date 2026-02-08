"use client";

import { motion } from "framer-motion";
import { Copy, ShoppingCart } from "lucide-react"; 
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

import { RetroButton } from "@/components/RetroButton";

// ... (rest of file) ...
            {/* Buy Button */}
            <RetroButton>
                <ShoppingCart size={18} />
                BUY
            </RetroButton>

export default function Navbar() {
  const [copied, setCopied] = useState(false);
  const ca = "0x1234...5678"; // Placeholder CA

  const handleCopy = () => {
    navigator.clipboard.writeText(ca);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-end px-6 py-4 bg-transparent">
        {/* Logo Area */}


        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">


            {/* Socials - X */}
            <RetroButton onClick={() => window.open('#twitter', '_blank')}>
                <div className="relative w-5 h-5">
                  <Image src="/icons/x.png" alt="X" fill className="object-contain brightness-0 invert" />
                </div>
            </RetroButton>
            
            {/* Socials - Telegram */}
            <RetroButton onClick={() => window.open('#telegram', '_blank')}>
                <div className="relative w-5 h-5">
                  <Image src="/icons/community.png" alt="Community" fill className="object-contain brightness-0 invert" />
                </div>
            </RetroButton>
            
            {/* Socials - Dex */}
            <RetroButton onClick={() => window.open('#dex', '_blank')}>
                <div className="relative w-5 h-5">
                  <Image src="/icons/dex.png" alt="Dex" fill className="object-contain brightness-0 invert" />
                </div>
            </RetroButton>


        </div>

        {/* Mobile Menu Toggle (Simplified for now) */}
         <div className="md:hidden">
            <RetroButton>Menu</RetroButton>
         </div>
    </nav>
  );
}
