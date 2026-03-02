import { ArrowRight } from "lucide-react";
import { useState, Suspense, lazy } from "react";
import { Link } from "react-router-dom";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

export function VibeCodeDitheringCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden min-h-[480px] md:min-h-[520px] flex flex-col items-center justify-center duration-500 w-full">
        {/* Black fade at top */}
        <div className="absolute top-0 left-0 right-0 h-32 md:h-48 z-[5] pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, transparent 100%)" }} />
        <Suspense fallback={<div className="absolute inset-0 bg-black/20" />}>
          <div className="absolute inset-0 z-0 pointer-events-none opacity-35 mix-blend-screen">
            <Dithering
              colorBack="#00000000"
              colorFront="#22d3ee"
              shape="warp"
              type="4x4"
              speed={isHovered ? 0.6 : 0.2}
              className="size-full"
              minPixelRatio={1}
            />
          </div>
        </Suspense>

        <div className="relative z-10 px-6 max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-400 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            Lifetime Access
          </div>

          <h2 className="font-black text-4xl md:text-6xl lg:text-7xl tracking-tight text-white mb-6 leading-[1.05] uppercase">
            Learn the <br />
            <span className="text-cyan-400">Vibe Code</span>
          </h2>

          <p className="text-white/70 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
            Build, launch, and sell faster than everyone else. Lifetime access courses for creators
            and builders.
          </p>

          <Link
            to="/templates"
            className="group inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/5 px-8 text-sm font-bold text-white uppercase tracking-widest transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:border-cyan-400 hover:scale-105 active:scale-95"
          >
            <span>View Templates</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
