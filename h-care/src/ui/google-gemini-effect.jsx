import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import React, { useRef, useState } from "react";

export const GoogleGeminiEffect = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [paths, setPaths] = useState([]);

  // Interpolation function
  const lerp = (a, b, t) => a + (b - a) * t;

  // Dynamically update path strings on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newPaths = [0, 1, 2, 3, 4].map((index) => {
      const yOffset = index * 40;
      const buttonLeft = 860;
      const buttonRight = 1060;

      const leftX = latest < 0.5
        ? lerp(0, buttonLeft, latest * 2)
        : lerp(buttonLeft, 0, (latest - 0.5) * 2);

      const rightX = latest < 0.5
        ? lerp(1920, buttonRight, latest * 2)
        : lerp(buttonRight, 1920, (latest - 0.5) * 2);

      const leftControl = latest < 0.5
        ? lerp(600, 920, latest * 2)
        : lerp(920, 600, (latest - 0.5) * 2);

      const rightControl = latest < 0.5
        ? lerp(1320, 1000, latest * 2)
        : lerp(1000, 1320, (latest - 0.5) * 2);

      return `M ${leftX} ${100 + yOffset} C ${leftControl} ${150 + yOffset}, ${rightControl} ${350 - yOffset}, ${rightX} ${100 + yOffset}`;
    });
    setPaths(newPaths);
  });

  return (
    <div ref={ref} className="relative w-full h-[500px] bg-transparent overflow-hidden z-0">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 px-6 py-2 rounded-full bg-white text-black font-semibold text-sm shadow-xl">
        ui.aceternity.com
      </div>

      <svg className="w-full h-full absolute top-0 left-0" viewBox="0 0 1920 500" preserveAspectRatio="none">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <linearGradient id="gradWhite" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="gradGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
          <linearGradient id="gradPink" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
        </defs>

        {paths.map((d, i) => {
          const colors = [
            "url(#gradBlue)",
            "url(#gradBlue)",
            "url(#gradWhite)",
            "url(#gradGold)",
            "url(#gradPink)",
          ];
          return (
            <motion.path
              key={i}
              d={d}
              stroke={colors[i]}
              strokeWidth="1.5"
              fill="none"
              filter="url(#glow)"
            />
          );
        })}
      </svg>
    </div>
  );
};
