"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type FrostedTextRevealProps = {
  text: string;
  className?: string;          // applied to wrapper
  textClassName?: string;      // applied to both text layers
  brushSize?: number;          // px radius of wipe
  intensity?: number;          // 0..1 opacity of frost
};

export function FrostedTextReveal({
  text,
  className,
  textClassName,
  brushSize = 90,
  intensity = 0.85,
}: FrostedTextRevealProps) {
  const id = React.useId();

  const rootRef = React.useRef<HTMLSpanElement>(null);
  const [pos, setPos] = React.useState({ x: 0.5, y: 0.5 });
  const [active, setActive] = React.useState(false);

  // reduced motion: don't continuously track pointer
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const onMove = (e: React.PointerEvent) => {
    if (prefersReducedMotion) return;
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setPos({ x: Math.min(1, Math.max(0, x)), y: Math.min(1, Math.max(0, y)) });
  };

  return (
    <span
      ref={rootRef}
      className={cn("relative inline-block align-baseline", className)}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onPointerMove={onMove}
    >
      {/* Base text */}
      <span className={cn("relative z-10", textClassName)}>{text}</span>

      {/* Frost overlay (masked) */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-20",
          // subtle glow/edge for the frost
          "drop-shadow-[0_0_14px_rgba(56,189,248,0.25)]"
        )}
        style={
          {
            // CSS variables used by mask + filters
            ["--fx" as any]: `${pos.x * 100}%`,
            ["--fy" as any]: `${pos.y * 100}%`,
            ["--brush" as any]: `${brushSize}px`,
            ["--frostOpacity" as any]: intensity,
          } as React.CSSProperties
        }
      >
        <span
          className={cn(
            "absolute inset-0",
            // frosty fill (bluish/white)
            "text-white/90",
            textClassName,
            "select-none"
          )}
          style={{
            // The mask "wipes" frost where the radial gradient is transparent.
            // When not active, keep mask centered and small reveal.
            WebkitMaskImage: active
              ? "radial-gradient(circle var(--brush) at var(--fx) var(--fy), transparent 0%, rgba(0,0,0,0.95) 60%, black 100%)"
              : "radial-gradient(circle calc(var(--brush) * 0.55) at 50% 50%, transparent 0%, rgba(0,0,0,0.95) 60%, black 100%)",
            maskImage: active
              ? "radial-gradient(circle var(--brush) at var(--fx) var(--fy), transparent 0%, rgba(0,0,0,0.95) 60%, black 100%)"
              : "radial-gradient(circle calc(var(--brush) * 0.55) at 50% 50%, transparent 0%, rgba(0,0,0,0.95) 60%, black 100%)",
            opacity: "var(--frostOpacity)" as any,
            filter: `url(#frost-${id})`,
          }}
        >
          {text}
        </span>

        {/* Hidden SVG defs (filters) */}
        <svg className="absolute h-0 w-0" aria-hidden="true">
          <defs>
            {/* Frost texture: turbulence + displacement + blur + slight posterize */}
            <filter id={`frost-${id}`} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="2"
                seed="2"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="18"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
              <feGaussianBlur in="displaced" stdDeviation="0.6" result="blurred" />
              <feColorMatrix
                in="blurred"
                type="matrix"
                values="
                  1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 0.95 0"
                result="alphaTight"
              />
              <feMerge>
                <feMergeNode in="alphaTight" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </span>
    </span>
  );
}
