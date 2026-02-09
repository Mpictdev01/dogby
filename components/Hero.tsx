"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Copy } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import clsx from "clsx";
import { useProjectConfig } from "@/lib/useProjectConfig";

export default function Hero() {
	const [copied, setCopied] = useState(false);
	const { config, loading } = useProjectConfig();

	const ca = config?.contract_address || null;

	const handleCopy = () => {
		if (!ca) return;
		navigator.clipboard.writeText(ca);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	// Buy button URL generator
	const getBuyUrl = () => {
		if (!config?.buy_platform || !ca) return null;
		if (config.buy_platform === "pumpfun") {
			return `https://pump.fun/coin/${ca}`;
		} else if (config.buy_platform === "jup") {
			return `https://jup.ag/swap/SOL-${ca}`;
		}
		return null;
	};

	// Chart URL - use dexscreener_url directly
	const chartUrl = config?.dexscreener_url || null;

	return (
		<section className="relative min-h-screen w-full bg-[radial-gradient(circle_at_center,#2D0B5A_0%,#0B0118_60%,#05000A_100%)] overflow-hidden flex flex-col">
			{/* Background Texture/Grain can be added here as an overlay */}
			<div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>

			<Navbar />

			<div className="container mx-auto px-6 pt-32 lg:pt-0 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
				{/* Left Side: Content */}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="flex-1 text-center lg:text-left z-10">
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{
							duration: 0.5,
							delay: 0.5,
							type: "spring",
							stiffness: 100,
						}}
						className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
						<span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
						<span className="text-sm font-semibold text-green-300 tracking-wide uppercase">
							Zero Brain, Max Gain
						</span>
					</motion.div>

					<h1 className="text-6xl md:text-8xl font-black text-white leading-[1.1] mb-6 drop-shadow-2xl">
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">
							MEME
						</span>
						<br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 [text-shadow:0_0_30px_rgba(168,85,247,0.5)]">
							COING
						</span>
					</h1>

					<p className="text-lg text-gray-300/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
						The only coin you need to go directly to the moon without checking
						the charts. Pure vibes, literally zero utility.
					</p>

					{/* CA Box */}
					<motion.div
						whileHover={{ scale: 1.02 }}
						onClick={handleCopy}
						className="group relative flex items-center justify-between max-w-md mx-auto lg:mx-0 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-purple-500/50 rounded-xl p-3 mb-10 cursor-pointer transition-all duration-300">
						<div className="flex flex-col items-start pl-2">
							<span className="text-xs text-gray-500 font-mono uppercase tracking-widest">
								Contract Address
							</span>
							<span className="text-white/90 font-mono text-sm sm:text-base truncate">
								{loading ? "Loading..." : ca || "Coming Soon"}
							</span>
						</div>
						<div className="p-2 rounded-lg bg-white/10 group-hover:bg-purple-500/20 transition-colors">
							<Copy
								size={18}
								className={clsx(
									"text-gray-400 group-hover:text-purple-300",
									copied && "text-green-400",
								)}
							/>
						</div>
						{copied && (
							<motion.span
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0 }}
								className="absolute -top-8 right-0 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">
								Copied!
							</motion.span>
						)}
					</motion.div>

					{/* Buttons */}
					<div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
						{getBuyUrl() && (
							<motion.a
								href={getBuyUrl()!}
								target="_blank"
								rel="noopener noreferrer"
								whileHover={{
									scale: 1.05,
									boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
								}}
								whileTap={{ scale: 0.95 }}
								className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#A855F7] to-[#EC4899] text-white font-bold text-lg rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2">
								Buy Now <ArrowRight size={20} />
							</motion.a>
						)}
						{chartUrl && (
							<motion.a
								href={chartUrl}
								target="_blank"
								rel="noopener noreferrer"
								whileHover={{
									scale: 1.05,
									backgroundColor: "rgba(255, 255, 255, 0.1)",
								}}
								whileTap={{ scale: 0.95 }}
								className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/20 hover:border-white/40 text-white font-bold text-lg rounded-full flex items-center justify-center gap-2 transition-colors">
								Live Chart <BarChart2 size={20} />
							</motion.a>
						)}
					</div>
				</motion.div>

				{/* Right Side: Mascot Image (Floating) */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8 }}
					className="flex-1 flex justify-center z-10 relative">
					{/* Background Glow behind mascot */}
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-600/30 rounded-full blur-[100px] animate-pulse"></div>

					<motion.div
						animate={{ y: [0, -30, 0] }}
						transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
						className="relative">
						{/* Placeholder for Mascot Image */}
						<div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.4)] relative overflow-hidden group">
							<span className="text-9xl group-hover:scale-110 transition-transform duration-500">
								🚀
							</span>
							<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
						</div>

						{/* Floating Elements/Coins around mascot */}
						<motion.div
							animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: "easeInOut",
								delay: 0.5,
							}}
							className="absolute -top-10 -right-10 w-16 h-16 bg-yellow-400 rounded-full border-4 border-yellow-200 shadow-lg flex items-center justify-center text-3xl">
							💰
						</motion.div>
						<motion.div
							animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
							transition={{
								duration: 5,
								repeat: Infinity,
								ease: "easeInOut",
								delay: 1,
							}}
							className="absolute bottom-10 -left-5 w-20 h-20 bg-green-400 rounded-full border-4 border-green-200 shadow-lg flex items-center justify-center text-4xl">
							📈
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
