"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useProjectConfig } from "@/lib/useProjectConfig";

export default function Navbar() {
	const { config, loading } = useProjectConfig();

	return (
		<nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-end px-6 py-4 bg-transparent">
			{/* Logo Area */}

			{/* Desktop Actions */}
			<div className="hidden md:flex items-center gap-3">
				{/* Socials - X */}
				{config?.twitter_url && (
					<button
						onClick={() => window.open(config.twitter_url, "_blank")}
						className="w-11 h-11 flex items-center justify-center rounded-lg border-2 border-[#fafafa] bg-[#252525] shadow-[3px_3px_0px_#fafafa] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer">
						<div className="relative w-5 h-5">
							<Image
								src="/icons/x.png"
								alt="X"
								fill
								className="object-contain brightness-0 invert"
							/>
						</div>
					</button>
				)}

				{/* Socials - Telegram */}
				{config?.telegram_url && (
					<button
						onClick={() => window.open(config.telegram_url, "_blank")}
						className="w-11 h-11 flex items-center justify-center rounded-lg border-2 border-[#fafafa] bg-[#252525] shadow-[3px_3px_0px_#fafafa] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer">
						<div className="relative w-5 h-5">
							<Image
								src="/icons/community.png"
								alt="Telegram"
								fill
								className="object-contain brightness-0 invert"
							/>
						</div>
					</button>
				)}

				{/* Socials - Dex */}
				{config?.dexscreener_url && (
					<button
						onClick={() => window.open(config.dexscreener_url, "_blank")}
						className="w-11 h-11 flex items-center justify-center rounded-lg border-2 border-[#fafafa] bg-[#252525] shadow-[3px_3px_0px_#fafafa] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer">
						<div className="relative w-5 h-5">
							<Image
								src="/icons/dex.png"
								alt="Dex"
								fill
								className="object-contain brightness-0 invert"
							/>
						</div>
					</button>
				)}

				{/* Community Button */}
				{config?.community_url && (
					<button
						onClick={() => window.open(config.community_url, "_blank")}
						className="w-11 h-11 flex items-center justify-center rounded-lg border-2 border-[#fafafa] bg-[#252525] shadow-[3px_3px_0px_#fafafa] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer">
						<div className="relative w-5 h-5">
							<Image
								src="/icons/community.png"
								alt="Community"
								fill
								className="object-contain brightness-0 invert"
							/>
						</div>
					</button>
				)}
			</div>

			{/* Mobile Menu Toggle (Simplified for now) */}
			<div className="md:hidden">
				<button className="text-[1rem] font-bold text-[#fafafa] uppercase px-4 py-2 rounded-[10px] border-2 border-[#fafafa] bg-[#252525] shadow-[3px_3px_0px_#fafafa] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer">
					Menu
				</button>
			</div>
		</nav>
	);
}
