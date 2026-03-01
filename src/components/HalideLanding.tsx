import React, { useEffect, useRef, useState, Suspense, lazy } from "react";
import beymflowLogo from "@/assets/beymflow-logo.png";
import StarfieldBackground from "@/components/StarfieldBackground";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

const HalideLanding: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;
      canvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-25 + x / 2}deg)`;
    };

    canvas.style.opacity = "0";
    canvas.style.transform = "rotateX(90deg) rotateZ(0deg) scale(0.8)";

    const timeout = setTimeout(() => {
      canvas.style.transition = "all 2.5s cubic-bezier(0.16, 1, 0.3, 1)";
      canvas.style.opacity = "1";
      canvas.style.transform = "rotateX(55deg) rotateZ(-25deg) scale(1)";
    }, 300);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <style>{`
        .halide-vibe-body {
          background-color: #000 !important;
          color: #fff;
          font-family: 'Syncopate', sans-serif;
          overflow: hidden;
          min-height: 100vh;
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .halide-vibe-grain {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 100;
          opacity: 0.04;
        }

        .halide-viewport {
          perspective: 2000px;
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .halide-canvas-link {
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }
        .halide-canvas-3d {
          position: relative;
          width: min(800px, 90vw);
          height: min(500px, 56vw);
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .halide-canvas-inner {
          position: absolute;
          inset: 0;
          background: #000;
        }

        .halide-interface-grid {
          position: absolute;
          inset: 0;
          padding: 2rem clamp(1rem, 4vw, 4rem);
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto 1fr auto;
          z-index: 10;
          pointer-events: none;
        }

        .halide-hero-title {
          grid-column: 1 / -1;
          align-self: center;
          font-size: clamp(2.5rem, 8vw, 8rem);
          line-height: 0.85;
          letter-spacing: -0.04em;
          mix-blend-mode: difference;
        }

        .halide-cta-button {
          pointer-events: auto;
          background: #000;
          color: #fff;
          padding: 0.875rem 1.75rem;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          clip-path: polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%);
          transition: 0.3s;
        }

        .halide-cta-button:hover {
          background: #22d3ee;
          transform: translateY(-5px);
        }
      `}</style>

      <div
        className="halide-vibe-body"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <filter id="halide-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>

        <div className="halide-vibe-grain" style={{ filter: "url(#halide-grain)" }} />

        <div className="absolute inset-0 z-[1]">
          <StarfieldBackground transparentBg sparse />
        </div>

        <Suspense fallback={null}>
          <div className="absolute inset-0 z-[2] pointer-events-none opacity-35 mix-blend-screen">
            <Dithering
              colorBack="#00000000"
              colorFront="#404040"
              shape="warp"
              type="4x4"
              speed={isHovered ? 0.6 : 0.2}
              className="size-full"
              minPixelRatio={1}
            />
          </div>
        </Suspense>

        {/* Turkoosi yläosassa → musta harmaa alaosassa sulavasti */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(34, 211, 238, 0.18) 0%, rgba(34, 211, 238, 0.06) 25%, transparent 55%, rgba(0,0,0,0.3) 100%)",
          }}
        />

        <div className="halide-interface-grid">
          <div style={{ fontWeight: 700, fontSize: "0.75rem", color: "#fff" }}>VIBE_CODE</div>
          <div style={{ textAlign: "right", fontFamily: "monospace", color: "#22d3ee", fontSize: "0.65rem" }}>
            <div>BEYMFLOW</div>
            <div>PROMPTS · COLORS · BACKGROUNDS</div>
          </div>

          <h1 className="halide-hero-title">
            VIBE CODE
            <br />
            <span style={{ color: "#22d3ee" }}>APP</span>
          </h1>

          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#fff" }}>
              <p>Create prompts, color codes, and visuals in seconds.</p>
            </div>
            <a
              href="https://beymflow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="halide-cta-button"
            >
              EXPLORE BEYMFLOW
            </a>
          </div>
        </div>

        <div className="halide-viewport">
          <a
            href="https://beymflow.com"
            target="_blank"
            rel="noopener noreferrer"
            className="halide-canvas-link"
          >
          <div className="halide-canvas-3d" ref={canvasRef}>
            <div className="halide-canvas-inner" />
            <div
              className="halide-logo-overlay"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "translateZ(80px)",
                pointerEvents: "none",
              }}
            >
              <img
                src={beymflowLogo}
                alt="Beymflow"
                style={{
                  maxWidth: "40%",
                  maxHeight: "45%",
                  objectFit: "contain",
                  filter: "brightness(1.1) drop-shadow(0 0 20px rgba(0,0,0,0.5))",
                }}
              />
            </div>
          </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default HalideLanding;
