"use client";

import ParallaxHero from "@/components/ParallaxHero";
import Navbar from "@/components/Navbar";
import RubiksCube from "@/components/RubiksCube";
import { RetroButton } from "@/components/RetroButton";
import { Copy, ArrowRight } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

import Footer from "@/components/Footer";

import Preloader from "@/components/Preloader";
import PositionController from "@/components/PositionController";
import { useProjectConfig } from "@/lib/useProjectConfig";

export default function Home() {
	const { config } = useProjectConfig();
	const [copied, setCopied] = useState(false);
	const ca = config?.contract_address || "Coming Soon";

	// Buy button URL generator (same as Hero.tsx)
	const getBuyUrl = () => {
		if (!config?.buy_platform || !ca) return null;
		if (config.buy_platform === "pumpfun") {
			return `https://pump.fun/coin/${ca}`;
		} else if (config.buy_platform === "jup") {
			return `https://jup.ag/swap/SOL-${ca}`;
		}
		return null;
	};

	// Hero Image Position settings (responsive units)
	const [heroScale, setHeroScale] = useState(1.2);
	const [heroX, setHeroX] = useState(0); // vw
	const [heroY, setHeroY] = useState(11); // vh
	const [heroSize, setHeroSize] = useState(55); // vh
	const [triggerWidth, setTriggerWidth] = useState(40); // % of hero
	const [triggerHeight, setTriggerHeight] = useState(75); // % of hero
	const [triggerY, setTriggerY] = useState(5); // % offset

	const handleControlChange = (key: string, value: number) => {
		switch (key) {
			case "heroScale":
				setHeroScale(value);
				break;
			case "heroX":
				setHeroX(value);
				break;
			case "heroY":
				setHeroY(value);
				break;
			case "heroSize":
				setHeroSize(value);
				break;
			case "triggerWidth":
				setTriggerWidth(value);
				break;
			case "triggerHeight":
				setTriggerHeight(value);
				break;
			case "triggerY":
				setTriggerY(value);
				break;
		}
	};

	const heroSettings = {
		heroScale,
		heroX,
		heroY,
		heroSize,
		triggerWidth,
		triggerHeight,
		triggerY,
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(ca);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<main className="bg-[#05000A] min-h-screen text-white overflow-x-hidden">
			<Preloader />
			<Navbar />
			<ParallaxHero settings={heroSettings} />

			{/* Position Controller - Hidden
			<PositionController
				values={heroSettings}
				onChange={handleControlChange}
			/>
			*/}

			{/* 3D Meme Cube & About Section */}
			<section className="container mx-auto px-6 py-20 min-h-[50vh] flex flex-col items-center justify-center relative overflow-visible">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center w-full max-w-7xl relative z-10">
					{/* LEFT: Rubik's Cube */}
					<div className="flex justify-center">
						<RubiksCube />
					</div>

					{/* MIDDLE: About Text */}
					<div className="text-left space-y-6">
						<h2 className="text-4xl md:text-5xl font-black text-[#fafafa] uppercase">
							ABOUT <span className="text-purple-500">DOGBY</span>
						</h2>
						<p className="text-lg text-gray-300 leading-relaxed max-w-lg text-justify">
							Meet Dogby — a fluffy pink pup with cheeks so squishy, legends say
							one boop grants eternal happiness. Born from stardust and belly
							rubs, he bounces through the cosmos spreading joy, chaos, and an
							unstoppable wave of cuteness wherever he goes.
						</p>

						<div className="flex flex-wrap gap-4 pt-4">
							{/* Copy CA Button */}
							<RetroButton
								onClick={handleCopy}
								className={clsx(
									copied && "bg-green-600 border-green-400 shadow-green-400",
								)}>
								<Copy size={20} />
								{copied ? "Copied!" : "Copy CA"}
							</RetroButton>

							{/* Buy Button */}
							<RetroButton
								className="bg-black"
								onClick={() => {
									const url = getBuyUrl();
									if (url) window.open(url, "_blank");
								}}>
								<ArrowRight size={20} />
								Buy Now
							</RetroButton>
						</div>
					</div>

					{/* RIGHT: About Image */}
					<div className="flex justify-center items-center overflow-visible">
						<img
							src="/about.png"
							alt="About Decoration"
							className="w-full max-w-[300px] h-auto opacity-90 scale-150"
						/>
					</div>
				</div>
			</section>

			{/* CTA Section - Full Width */}
			<section className="relative w-full min-h-[60vh] overflow-hidden">
				{/* Background Image - fills entire section */}
				<div
					className="absolute inset-0 z-0"
					style={{
						backgroundImage: "url('/cta-bg.png')",
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
				/>
				{/* Gradient overlays for blending */}
				<div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#05000A] via-transparent to-[#05000A]" />

				{/* CTA Content - Full Width */}
				<div className="relative z-10 w-full flex items-center justify-center">
					<img
						src="/cta.png"
						alt="Join the Movement"
						className="w-full max-w-none h-auto object-contain"
					/>
				</div>

				{/* Footer overlaying bottom of CTA */}
				<div className="absolute bottom-0 left-0 right-0 z-20">
					<Footer />
				</div>
			</section>
		</main>
	);
}
