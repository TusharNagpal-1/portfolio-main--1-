"use client";

import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute inset-0 bg-background transition-colors duration-500 mix-blend-multiply dark:mix-blend-normal" />
      
      {/* Orb 1: Indigo */}
      <motion.div
        animate={{
          x: ["0%", "20%", "-20%", "0%"],
          y: ["0%", "-20%", "20%", "0%"],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[100px] md:blur-[150px] mix-blend-screen"
      />

      {/* Orb 2: Cyan */}
      <motion.div
        animate={{
          x: ["0%", "-30%", "10%", "0%"],
          y: ["0%", "30%", "-10%", "0%"],
          scale: [1, 1.5, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/3 right-1/4 w-[40vw] h-[40vw] rounded-full bg-secondary/20 blur-[100px] md:blur-[150px] mix-blend-screen"
      />

      {/* Orb 3: Purple */}
      <motion.div
        animate={{
          x: ["0%", "15%", "-25%", "0%"],
          y: ["0%", "15%", "-15%", "0%"],
          scale: [1, 1.1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-1/4 left-1/3 w-[60vw] h-[40vw] rounded-full bg-accent/20 blur-[100px] md:blur-[150px] mix-blend-screen"
      />
      
      {/* Overlay to fade out bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
    </div>
  );
}
