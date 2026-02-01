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
        className="flex flex-col sm:flex-row gap-4"
      >
        <a
          href="#courses"
          className="px-8 py-4 bg-primary text-primary-foreground rounded-full 
                     font-display uppercase tracking-luxury text-sm
                     transition-all duration-300 glow-purple
                     hover:glow-purple-lg hover:scale-105"
        >
          Start Learning
        </a>
        <a
          href="#about"
          className="px-8 py-4 border border-foreground/30 text-foreground rounded-full 
                     font-display uppercase tracking-luxury text-sm
                     transition-all duration-300
                     hover:border-primary hover:text-primary hover:glow-purple-sm"
        >
          Learn More
        </a>
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
