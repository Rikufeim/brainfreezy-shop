import { motion } from "framer-motion";
import StarfieldBackground from "@/components/StarfieldBackground";

interface ArcticBackgroundProps {
  animateZoom?: boolean;
}

export default function ArcticBackground({ animateZoom = false }: ArcticBackgroundProps) {
  const content = (
    <div className="absolute inset-0 bg-black overflow-hidden">
      <StarfieldBackground transparentBg />
    </div>
  );

  if (animateZoom) {
    return (
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        initial={{ scale: 1 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-black">
      <StarfieldBackground transparentBg />
    </div>
  );
}
