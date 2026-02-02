import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import brainfreezyLogo from "@/assets/brainfreezy-logo-official.png";

export default function CometCardDemo() {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );

  const translateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-20px", "20px"]
  );
  const translateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["20px", "-20px"]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-distant transform-3d">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
        }}
        initial={{ scale: 1, z: 0 }}
        whileHover={{
          scale: 1.05,
          z: 50,
          transition: { duration: 0.2 },
        }}
        className="relative w-80 md:w-[450px] cursor-pointer"
      >
        <img
          loading="lazy"
          className="h-full w-full object-contain"
          alt="Brain Freezy Logo"
          src={brainfreezyLogo}
          style={{
            filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))",
          }}
        />
      </motion.div>
    </div>
  );
}
