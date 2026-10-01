"use client";

import React from "react";

interface TerminalMockupProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function TerminalMockup({
  children,
  title = "tushar@macbook:~",
  className = "",
}: TerminalMockupProps) {
  return (
    <div
      className={`relative w-full rounded-xl border border-border bg-card/90 backdrop-blur-md shadow-2xl overflow-hidden font-mono text-sm leading-relaxed ${className}`}
      style={{
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35), 0 0 30px rgba(16, 185, 129, 0.02)",
      }}
    >
      {/* OS X Style Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/20 border-b border-border select-none">
        <div className="flex items-center gap-2">
          {/* Mac controls */}
          <span className="w-3 h-3 rounded-full bg-[#EF4444] inline-block opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-[#F59E0B] inline-block opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-[#10B981] inline-block opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
        </div>
        <div className="text-xs text-muted font-medium select-none truncate max-w-[60%]">
          {title}
        </div>
        <div className="w-12" /> {/* spacer to balance controls */}
      </div>

      {/* Terminal Content Panel */}
      <div className="relative p-6 max-h-[500px] overflow-y-auto overflow-x-hidden text-emerald-400/90 selection:bg-emerald-500/30 selection:text-white">
        {/* Subtle Scanline Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.015] z-30"
          style={{
            backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
            backgroundSize: "100% 4px, 6px 100%",
          }}
        />
        {children}
      </div>
    </div>
  );
}
