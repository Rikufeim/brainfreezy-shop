import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VibeCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VibeCodeModal({ isOpen, onClose }: VibeCodeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className="relative w-full max-w-2xl">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute -top-12 right-0"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Header */}
              <div className="text-center mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-display text-4xl md:text-5xl font-bold uppercase tracking-[0.2em] mb-4"
                >
                  Vibe Code
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-muted-foreground text-lg"
                >
                  Choose your coding path
                </motion.p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Landing Pages */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="group bg-card rounded-xl p-8 border-2 border-border
                             transition-all duration-300 hover:border-white/25 cursor-pointer"
                  onClick={() => {
                    // Navigate to Landing Pages
                    window.location.href = '/landing-pages';
                  }}
                >
                  <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                    Landing Pages
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    High-converting landing page templates and designs for your products
                  </p>
                  <Button size="sm" className="w-full">
                    View Templates
                  </Button>
                </motion.div>

                {/* Prompts */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="group bg-card rounded-xl p-8 border-2 border-border
                             transition-all duration-300 hover:border-white/25 cursor-pointer"
                  onClick={() => {
                    // Navigate to Prompts page
                    window.location.href = '/prompts';
                  }}
                >
                  <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                    Prompts
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    AI-powered coding prompts and templates to accelerate your development workflow
                  </p>
                  <Button size="sm" className="w-full">
                    Browse Prompts
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
