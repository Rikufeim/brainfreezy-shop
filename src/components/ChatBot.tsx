import { motion } from "framer-motion";
import icyMascot from "@/assets/icy-mascot.png";

export default function ChatBot() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 w-24 h-24"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    >
      <img
        src={icyMascot}
        alt="ICY"
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}
