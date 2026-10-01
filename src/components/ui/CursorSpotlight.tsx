"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      setIsHovering(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button"
      );
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 hidden dark:block"
      animate={{
        opacity: 1,
      }}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isHovering ? "opacity-100" : "opacity-50"}`}
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.1), transparent 80%)`,
        }}
      />
    </motion.div>
  );
}
