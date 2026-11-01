"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number; // degrees
  enableGlare?: boolean;
}

export default function TiltCard({
  children,
  className = "",
  maxRotation = 8,
  enableGlare = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const springConfig = { damping: 20, stiffness: 180, mass: 0.1 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;

    rotateX.set(-yPct * maxRotation);
    rotateY.set(xPct * maxRotation);

    if (enableGlare) {
      setGlarePosition({
        x: (mouseX / width) * 100,
        y: (mouseY / height) * 100,
        opacity: 0.25,
      });
    }
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    if (enableGlare) {
      setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative perspective-1000 ${className}`}
    >
      {children}

      {/* Subtle Glare reflection overlay */}
      {enableGlare && (
        <div
          className="absolute inset-0 rounded-inherit pointer-events-none transition-opacity duration-300 z-20"
          style={{
            opacity: glarePosition.opacity,
            background: `radial-gradient(circle 280px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4), transparent 80%)`,
          }}
        />
      )}
    </motion.div>
  );
}
