import * as React from "react";

/**
 * Full-screen frosted glass overlay that follows pointer.
 * Uses the same SVG turbulence/displacement technique as FrostedTextReveal
 * but applied as a translucent surface across the entire section.
 */
export default function FrostedOverlay() {
  const id = React.useId();
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 0.5, y: 0.5 });
  const [active, setActive] = React.useState(false);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
      y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)),
    });
  };

  return (
    <div
      ref={ref}
      className="absolute inset-0 z-[2]"
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onPointerMove={onMove}
    >
      {/* Frosted layer */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(200,245,255,0.04) 0%, rgba(56,189,248,0.06) 40%, rgba(0,18,38,0.12) 100%)",
          WebkitMaskImage: active
            ? `radial-gradient(circle 280px at ${pos.x * 100}% ${pos.y * 100}%, transparent 0%, rgba(0,0,0,0.7) 40%, black 100%)`
            : "radial-gradient(circle 180px at 50% 50%, transparent 0%, rgba(0,0,0,0.7) 40%, black 100%)",
          maskImage: active
            ? `radial-gradient(circle 280px at ${pos.x * 100}% ${pos.y * 100}%, transparent 0%, rgba(0,0,0,0.7) 40%, black 100%)`
            : "radial-gradient(circle 180px at 50% 50%, transparent 0%, rgba(0,0,0,0.7) 40%, black 100%)",
          filter: `url(#frost-overlay-${id})`,
          pointerEvents: "none",
        }}
      />

      {/* SVG frost filter */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id={`frost-overlay-${id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="1.2" result="blurred" />
            <feColorMatrix
              in="blurred"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.85 0"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
