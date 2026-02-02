import { motion } from "framer-motion";
import icyMascot from "@/assets/icy-mascot.png";

export default function ChatBot() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 w-24 h-24 cursor-pointer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        filter: "drop-shadow(0 4px 20px rgba(56, 189, 248, 0.4))",
      }}
    >
      <img
        src={icyMascot}
        alt="ICY"
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}
