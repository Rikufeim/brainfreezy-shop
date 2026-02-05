import { motion } from "framer-motion";

export default function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* Main headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="font-display text-4xl md:text-6xl lg:text-7xl font-bold 
                   uppercase tracking-wide-luxury mb-6 mt-32"
      >
        <span className="text-foreground">Multiply</span>
        <span className="block text-2xl md:text-3xl lg:text-4xl mt-4 text-muted-foreground font-light tracking-luxury">
          Master Crypto & Vibe Coding
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-xl mb-12"
      >
        Learn. Build. Scale. Dominate.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="flex flex-col sm:flex-row gap-6"
      >
        <motion.a
          href="#courses"
          className="px-8 py-4 rounded-lg text-white font-black text-sm tracking-widest uppercase
                     border-2 border-zinc-800 shadow-[5px_5px_0px_0px_#27272a]
                     hover:shadow-[7px_7px_0px_0px_#27272a] hover:-translate-y-1 hover:-translate-x-1
                     active:shadow-[0px_0px_0px_0px_#27272a] active:translate-y-2 active:translate-x-2
                     transition-all duration-150 flex items-center justify-center min-w-[180px]"
          style={{
            background: "linear-gradient(135deg, #000000 0%, #00000090 10%, #000000 25%, #00000080 40%, #63636345 55%, #63636325 70%, #f3f3f330 85%, #000000 100%)",
            filter: "brightness(1.05)",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Learning
        </motion.a>
        <motion.a
          href="#about"
          className="px-8 py-4 rounded-lg text-white/70 font-black text-sm tracking-widest uppercase
                     border-2 border-zinc-800/50 shadow-[5px_5px_0px_0px_#18181b]
                     hover:shadow-[7px_7px_0px_0px_#18181b] hover:-translate-y-1 hover:-translate-x-1
                     active:shadow-[0px_0px_0px_0px_#18181b] active:translate-y-2 active:translate-x-2
                     transition-all duration-150 flex items-center justify-center min-w-[180px] bg-black"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.a>
      </motion.div>

      {/* Logo placeholder at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div
          className="w-16 h-16 rounded-full border-2 border-primary/50 
                     flex items-center justify-center cursor-pointer
                     transition-all duration-300 hover:border-primary hover:glow-purple-sm"
        >
          <span className="font-display text-2xl font-bold text-primary">M</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2 tracking-luxury uppercase">
          Your Logo
        </p>
      </motion.div>
    </div>
  );
}
