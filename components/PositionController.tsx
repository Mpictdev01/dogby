"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ControllerProps {
	values: {
		heroScale: number;
		heroX: number; // vw
		heroY: number; // vh
		heroSize: number; // vh
		triggerWidth: number; // % of hero
		triggerHeight: number; // % of hero
		triggerY: number; // % offset
	};
	onChange: (key: string, value: number) => void;
}

export default function PositionController({
	values,
	onChange,
}: ControllerProps) {
	const [isOpen, setIsOpen] = useState(true);
	const [activeTab, setActiveTab] = useState<"hero" | "trigger">("hero");

	if (!isOpen) {
		return (
			<motion.button
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => setIsOpen(true)}
				className="fixed bottom-4 right-4 z-[9999] bg-purple-600 text-white px-4 py-3 rounded-xl shadow-lg hover:bg-purple-700 transition-colors font-bold">
				🎛️ Open Controller
			</motion.button>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 50, scale: 0.9 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: 50, scale: 0.9 }}
			transition={{ type: "spring", damping: 20, stiffness: 300 }}
			className="fixed bottom-4 right-4 z-[9999] bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl p-5 w-80 shadow-2xl">
			{/* Header */}
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
					🎛️ Position Controller
				</h3>
				<motion.button
					whileHover={{ scale: 1.2, rotate: 90 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsOpen(false)}
					className="text-white/60 hover:text-white text-lg w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
					✕
				</motion.button>
			</div>

			{/* Tabs */}
			<div className="flex gap-2 mb-4">
				<button
					onClick={() => setActiveTab("hero")}
					className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold uppercase transition-all ${
						activeTab === "hero"
							? "bg-purple-600 text-white"
							: "bg-white/10 text-white/60 hover:bg-white/20"
					}`}>
					🖼️ Hero Image
				</button>
				<button
					onClick={() => setActiveTab("trigger")}
					className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold uppercase transition-all ${
						activeTab === "trigger"
							? "bg-pink-600 text-white"
							: "bg-white/10 text-white/60 hover:bg-white/20"
					}`}>
					📦 Trigger Zone
				</button>
			</div>

			<AnimatePresence mode="wait">
				{activeTab === "hero" && (
					<motion.div
						key="hero"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 20 }}
						transition={{ duration: 0.2 }}>
						<h4 className="text-purple-400 text-xs font-semibold mb-3 uppercase">
							Hero Image Settings (Responsive)
						</h4>
						<div className="space-y-3">
							<SliderControl
								label="Scale"
								value={values.heroScale}
								min={0.5}
								max={2}
								step={0.05}
								unit="x"
								color="purple"
								onChange={(v) => onChange("heroScale", v)}
							/>
							<SliderControl
								label="X Offset"
								value={values.heroX}
								min={-30}
								max={30}
								step={1}
								unit="vw"
								color="purple"
								onChange={(v) => onChange("heroX", v)}
							/>
							<SliderControl
								label="Y Offset"
								value={values.heroY}
								min={-30}
								max={30}
								step={1}
								unit="vh"
								color="purple"
								onChange={(v) => onChange("heroY", v)}
							/>
							<SliderControl
								label="Size"
								value={values.heroSize}
								min={30}
								max={90}
								step={1}
								unit="vh"
								color="purple"
								onChange={(v) => onChange("heroSize", v)}
							/>
						</div>
					</motion.div>
				)}

				{activeTab === "trigger" && (
					<motion.div
						key="trigger"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.2 }}>
						<h4 className="text-pink-400 text-xs font-semibold mb-3 uppercase">
							Hover Trigger Zone (%)
						</h4>
						<div className="space-y-3">
							<SliderControl
								label="Width"
								value={values.triggerWidth}
								min={10}
								max={100}
								step={5}
								unit="%"
								color="pink"
								onChange={(v) => onChange("triggerWidth", v)}
							/>
							<SliderControl
								label="Height"
								value={values.triggerHeight}
								min={10}
								max={100}
								step={5}
								unit="%"
								color="pink"
								onChange={(v) => onChange("triggerHeight", v)}
							/>
							<SliderControl
								label="Y Offset"
								value={values.triggerY}
								min={-50}
								max={50}
								step={1}
								unit="%"
								color="pink"
								onChange={(v) => onChange("triggerY", v)}
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Copy Values Button */}
			<motion.button
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				onClick={() => {
					const code = `// Hero Image Settings (Responsive)
const heroScale = ${values.heroScale};
const heroX = ${values.heroX}; // vw
const heroY = ${values.heroY}; // vh
const heroSize = ${values.heroSize}; // vh

// Trigger Zone Settings (% of hero)
const triggerWidth = ${values.triggerWidth}; // %
const triggerHeight = ${values.triggerHeight}; // %
const triggerY = ${values.triggerY}; // %`;
					navigator.clipboard.writeText(code);
					alert("Values copied to clipboard!");
				}}
				className="mt-5 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs font-semibold py-3 rounded-xl transition-all shadow-lg">
				📋 Copy Values
			</motion.button>
		</motion.div>
	);
}

// Reusable Slider Component
function SliderControl({
	label,
	value,
	min,
	max,
	step,
	unit,
	color,
	onChange,
}: {
	label: string;
	value: number;
	min: number;
	max: number;
	step: number;
	unit: string;
	color: "purple" | "pink";
	onChange: (v: number) => void;
}) {
	return (
		<div className="flex items-center gap-3">
			<span className="text-white/60 text-xs w-16">{label}</span>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(parseFloat(e.target.value))}
				className={`flex-1 accent-${color}-500 h-2 rounded-full`}
				style={{ accentColor: color === "purple" ? "#a855f7" : "#ec4899" }}
			/>
			<motion.span
				key={value}
				initial={{
					scale: 1.2,
					color: color === "purple" ? "#a855f7" : "#ec4899",
				}}
				animate={{ scale: 1, color: "#ffffff" }}
				className="text-white text-xs w-14 text-right font-mono">
				{value}
				{unit}
			</motion.span>
		</div>
	);
}
