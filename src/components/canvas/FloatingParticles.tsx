"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  driftX: number;
  driftY: number;
}

const COLORS = [
  "rgba(99, 102, 241, 0.5)",   // indigo
  "rgba(168, 85, 247, 0.45)",  // purple
  "rgba(34, 211, 238, 0.4)",   // cyan
  "rgba(129, 140, 248, 0.5)",  // indigo-light
];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 6 + Math.random() * 10,
    delay: Math.random() * 6,
    color: COLORS[i % COLORS.length],
    driftX: (Math.random() - 0.5) * 60,
    driftY: (Math.random() - 0.5) * 60,
  }));
}

export default function FloatingParticles({ count = 60 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles(count));
  }, [count]);

  return (
    <div
      className="absolute inset-0 w-full h-full -z-20 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            filter: "blur(1px)",
          }}
          animate={{
            x: [0, p.driftX, -p.driftX * 0.5, 0],
            y: [0, p.driftY, -p.driftY * 0.5, 0],
            opacity: [0.2, 0.7, 0.4, 0.2],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
