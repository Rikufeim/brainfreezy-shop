"use client";

import React, { useEffect, useId, useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SparklesCore } from "@/components/ui/sparkles";

export const Cover = ({
  children,
  className,
  variant = "default",
}: {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "cta";
}) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [beamPositions, setBeamPositions] = useState<number[]>([]);

  useEffect(() => {
    if (!ref.current) return;

    setContainerWidth(ref.current.clientWidth ?? 0);

    const height = ref.current.clientHeight ?? 0;
    const numberOfBeams = Math.max(4, Math.floor(height / 10));
    const positions = Array.from(
      { length: numberOfBeams },
      (_, i) => (i + 1) * (height / (numberOfBeams + 1))
    );
    setBeamPositions(positions);
  }, [hovered]);

  const isCta = variant === "cta";

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={ref}
      animate={{ opacity: hovered ? 1 : 0.85 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={isCta ? {
        background: "linear-gradient(135deg, #000000 0%, #00000090 10%, #000000 25%, #00000080 40%, #63636345 55%, #63636325 70%, #f3f3f330 85%, #000000 100%)",
        filter: "brightness(1.05)",
      } : undefined}
      className={cn(
        "relative inline-block px-2 py-2 rounded-sm transition duration-200",
        !isCta && "bg-gradient-to-b from-sky-200/20 via-cyan-200/10 to-transparent",
        !isCta && "ring-1 ring-white/10",
        !isCta && "hover:ring-white/20",
        !isCta && "backdrop-blur-sm",
        className
      )}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.2 } }}
            className="h-full w-full overflow-hidden absolute inset-0 rounded-sm"
          >
            <motion.div
              animate={{ translateX: ["-50%", "0%"] }}
              transition={{
                translateX: { duration: 10, ease: "linear", repeat: Infinity },
              }}
              className="w-[200%] h-full flex"
            >
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1.1}
                particleDensity={450}
                className="w-full h-full"
                // snow/ice particles
                particleColor="#E0F2FE"
                speed={2.2}
              />
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1.1}
                particleDensity={450}
                className="w-full h-full"
                particleColor="#E0F2FE"
                speed={2.2}
              />
            </motion.div>

            {/* subtle frost glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-sky-400/10 to-cyan-400/0" />
          </motion.div>
        )}
      </AnimatePresence>

      {beamPositions.map((position, index) => (
        <Beam
          key={index}
          hovered={hovered}
          duration={Math.random() * 2 + 1}
          delay={Math.random() * 2 + 1}
          width={containerWidth}
          style={{ top: `${position}px` }}
        />
      ))}

      <motion.span
        key={String(hovered)}
        animate={{
          scale: hovered ? 0.92 : 1,
          x: hovered ? [0, -18, 18, -18, 18, 0] : 0,
          y: hovered ? [0, 18, -18, 18, -18, 0] : 0,
          filter: hovered ? "drop-shadow(0 0 18px rgba(56,189,248,0.35))" : "none",
        }}
        exit={{ filter: "none", scale: 1, x: 0, y: 0 }}
        transition={{
          duration: 0.2,
          x: { duration: 0.2, repeat: Infinity, repeatType: "loop" },
          y: { duration: 0.2, repeat: Infinity, repeatType: "loop" },
          scale: { duration: 0.2 },
          filter: { duration: 0.2 },
        }}
        className={cn(
          "inline-block relative z-20 transition duration-200",
          "text-white",
          className
        )}
      >
        {children}
      </motion.span>
    </motion.div>
  );
};

export const Beam = ({
  className,
  delay,
  duration,
  hovered,
  width = 600,
  ...svgProps
}: {
  className?: string;
  delay?: number;
  duration?: number;
  hovered?: boolean;
  width?: number;
} & React.ComponentProps<typeof motion.svg>) => {
  const id = useId();

  return (
    <motion.svg
      width={width ?? "600"}
      height="1"
      viewBox={`0 0 ${width ?? "600"} 1`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute inset-x-0 w-full", className)}
      {...svgProps}
    >
      <motion.path d={`M0 0.5H${width ?? "600"}`} stroke={`url(#svgGradient-${id})`} />

      <defs>
        <motion.linearGradient
          id={`svgGradient-${id}`}
          key={String(hovered)}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: hovered ? "-10%" : "-5%", y1: 0, y2: 0 }}
          animate={{ x1: "110%", x2: hovered ? "100%" : "105%", y1: 0, y2: 0 }}
          transition={{
            duration: hovered ? 0.5 : duration ?? 2,
            ease: "linear",
            repeat: Infinity,
            delay: hovered ? Math.random() * (1 - 0.2) + 0.2 : 0,
            repeatDelay: hovered ? Math.random() * (2 - 1) + 1 : delay ?? 1,
          }}
        >
          {/* icy beam: cyan -> sky -> transparent */}
          <stop stopColor="#22D3EE" stopOpacity="0" />
          <stop stopColor="#38BDF8" stopOpacity="1" />
          <stop offset="1" stopColor="#38BDF8" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  );
};
