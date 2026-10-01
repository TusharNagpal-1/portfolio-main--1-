"use client";

import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
      {/* Dark/Light base with grain or grid to give texture */}
      <div className="absolute inset-0 bg-background/80 z-0" />

      {/* Floating Animated Orbs utilizing Radial Gradients for 0-lag Blur */}
      <motion.div
        className="absolute top-[10%] left-[10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full"
        style={{ 
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0) 60%)",
            willChange: "transform"
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 50, 0],
          scale: [1, 1.1, 0.95, 1],
          rotate: [0, 90, 180, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-[20%] right-[5%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full"
        style={{ 
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0) 60%)",
            willChange: "transform"
        }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 80, -40, 0],
          scale: [1, 1.15, 0.85, 1],
          rotate: [360, 180, 90, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-[-10%] left-[20%] w-[65vw] h-[65vw] max-w-[800px] max-h-[800px] rounded-full"
        style={{ 
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.12) 0%, rgba(34, 211, 238, 0) 60%)",
            willChange: "transform"
        }}
        animate={{
          x: [0, 50, -60, 0],
          y: [0, 40, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Subtle Grid Pattern Overlay to add depth to the orbs */}
      <div 
        className="absolute inset-0 z-10 opacity-[0.04] dark:opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
