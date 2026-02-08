"use client";

import clsx from "clsx";

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const RetroButton = ({ children, onClick, className, ...props }: RetroButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "text-[1rem] md:text-[1.2rem] font-bold text-[#fafafa] uppercase px-4 py-2 md:px-6 md:py-2.5 rounded-[10px] border-2 border-[#fafafa] bg-[#252525] shadow-[3px_3px_0px_#fafafa] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all cursor-pointer flex items-center gap-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
