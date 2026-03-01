import { useMemo } from "react";


const COLORS = {
  white: "rgba(255, 255, 255, 0.65)",
  cyan: "rgba(34, 211, 238, 0.6)",
};

const ANIMATIONS = ["animate-twinkle-subtle", "animate-twinkle-medium", "animate-twinkle-slow", "animate-twinkle-float"] as const;

export default function StarfieldBackground({
  transparentBg = false,
  sparse = false,
}: {
  transparentBg?: boolean;
  sparse?: boolean;
}) {
  const starCount = sparse ? 55 : 220;
  const stars = useMemo(() => {
    const result: Array<{
      id: number;
      left: string;
      top: string;
      size: number;
      color: string;
      animation: (typeof ANIMATIONS)[number];
      delay: number;
      glow?: boolean;
    }> = [];
    const r = () => Math.random();

    for (let i = 0; i < starCount; i++) {
      const rand = r();
      let size: number;
      let color: string;
      let glow = false;

      if (rand < 0.02) {
        size = 4;
        color = COLORS.white;
        glow = true;
      } else if (rand < 0.12) {
        size = 3;
        color = r() > 0.3 ? COLORS.white : COLORS.cyan;
      } else if (rand < 0.4) {
        size = 2;
        color = r() > 0.5 ? COLORS.white : COLORS.cyan;
      } else {
        size = 2;
        color = r() > 0.6 ? COLORS.white : COLORS.cyan;
      }

      result.push({
        id: i,
        left: `${r() * 100}%`,
        top: `${r() * 100}%`,
        size,
        color,
        animation: ANIMATIONS[Math.floor(r() * 4)],
        delay: r() * 5,
        glow,
      });
    }
    return result;
  }, [starCount]);

  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden ${transparentBg ? "bg-transparent" : "bg-black"}`}
      aria-hidden="true"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full ${star.animation}`}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            minWidth: star.size,
            minHeight: star.size,
            backgroundColor: star.color,
            animationDelay: `${star.delay}s`,
            boxShadow: star.glow
              ? `0 0 ${star.size * 2}px ${star.color}, 0 0 ${star.size * 4}px rgba(34,211,238,0.15)`
              : undefined,
          }}
        />
      ))}
    </div>
  );
}
