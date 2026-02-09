"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface HeroSettings {
	heroScale: number;
	heroX: number; // percentage of viewport width
	heroY: number; // percentage of viewport height
	heroSize: number; // percentage of viewport height
	triggerWidth: number; // percentage of hero size
	triggerHeight: number; // percentage of hero size
	triggerY: number; // percentage offset
}

interface ParallaxHeroProps {
	settings?: HeroSettings;
}

export default function ParallaxHero({ settings }: ParallaxHeroProps) {
	// Default settings using percentages for responsiveness
	const heroScale = settings?.heroScale ?? 1.0;
	const heroX = settings?.heroX ?? 0; // % of viewport width
	const heroY = settings?.heroY ?? 0; // % of viewport height
	const heroSize = settings?.heroSize ?? 55; // % of viewport height
	const triggerWidth = settings?.triggerWidth ?? 40; // % of hero size
	const triggerHeight = settings?.triggerHeight ?? 75; // % of hero size
	const triggerY = settings?.triggerY ?? 5; // % offset

	// Fixed settings
	const parallaxStrength = 4;

	// Hover State (Controlled by Trigger Zone)
	const [isHovered, setIsHovered] = useState(false);

	const x = useMotionValue(0);
	const y = useMotionValue(0);

	// Smooth out the mouse movement
	const springConfig = { damping: 20, stiffness: 100 };
	const springX = useSpring(x, springConfig);
	const springY = useSpring(y, springConfig);

	// Calculate movements based on strength - ONLY Layer 1 moves
	const xLayer1 = useTransform(
		springX,
		[-0.5, 0.5],
		[`-${parallaxStrength * 0.2}%`, `${parallaxStrength * 0.2}%`],
	);
	const yLayer1 = useTransform(
		springY,
		[-0.5, 0.5],
		[`-${parallaxStrength * 0.2}%`, `${parallaxStrength * 0.2}%`],
	);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const normalizedX = e.clientX / window.innerWidth - 0.5;
			const normalizedY = e.clientY / window.innerHeight - 0.5;

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
				className="absolute inset-0 z-0">
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

			{/* Foreground Hero Layer - RESPONSIVE with viewport units */}
			<div className="absolute inset-0 z-20 flex items-center justify-center">
				{/* Hero Text - Centered slightly above */}
				<div className="absolute top-[15%] left-1/2 -translate-x-1/2 z-30 text-center">
					<h1
						className="text-7xl md:text-9xl font-black text-white uppercase tracking-wider"
						style={{
							WebkitTextStroke: "6px #000000",
							paintOrder: "stroke fill",
						}}>
						DOGBY
					</h1>
					<p className="text-xl md:text-2xl text-white/80 mt-2 font-medium tracking-widest uppercase">
						The Squishiest Pup in the Cosmos
					</p>
				</div>

				<motion.div
					animate={{
						scale: heroScale,
						x: `${heroX}vw`,
						y: `${heroY}vh`,
					}}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					className="relative"
					style={{
						width: `${heroSize}vh`,
						height: `${heroSize}vh`,
					}}>
					{/* 
                TRIGGER ZONE 
                - Controls isHovered state
                - Uses percentage of hero size for responsiveness
             */}
					<div
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
						style={{
							width: `${triggerWidth}%`,
							height: `${triggerHeight}%`,
							marginTop: `${triggerY}%`,
						}}
						className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 cursor-pointer"
					/>

					{/* Base Hero Image (hero.png) */}
					<div
						className={`relative w-full h-full ${isHovered ? "hidden" : "block"}`}>
						<Image
							src="/hero.png"
							alt="Hero Foreground"
							fill
							className="object-contain"
							priority
						/>
					</div>

					{/* Hover Hero Image (hero-2.png) - Instant Swap */}
					<div
						className={`absolute inset-0 w-full h-full ${isHovered ? "block" : "hidden"}`}>
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
