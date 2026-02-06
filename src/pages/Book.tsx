import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Book() {
  const seamlessBackground = {
    background: `
      radial-gradient(ellipse at 20% 180vh, #00323440 0%, #00323418 20%, transparent 50%),
      radial-gradient(ellipse at 80% 150vh, #00000040 0%, #00000018 20%, transparent 50%),
      radial-gradient(ellipse at 50% 200vh, #0b0d5730 0%, #0b0d5712 25%, transparent 55%),
      radial-gradient(ellipse at 30% 170vh, #00151730 0%, #00151712 20%, transparent 45%),
      radial-gradient(ellipse at 20% 40%, #0b0d5740 0%, #0b0d5718 20%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, #00151740 0%, #00151718 20%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, #00000025 0%, #00000010 30%, transparent 65%),
      radial-gradient(circle at 30% 30%, #0b0d5725 0%, #0b0d5710 15%, transparent 35%),
      radial-gradient(circle at 70% 70%, #00151725 0%, #00151710 15%, transparent 35%),
      #000000
    `,
    filter: "brightness(1.6)",
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative">
      {/* Seamless Background */}
      <div className="fixed inset-0 pointer-events-none z-0" style={seamlessBackground} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full relative z-10"
      >
        <div className="bg-card border-2 border-border rounded-base p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl md:text-4xl font-bold uppercase tracking-[0.2em] mb-4"
            >
              Book a Discovery Call
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Let's discuss your project and how we can help
            </motion.p>
          </div>

          {/* Placeholder Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 mb-12"
          >
            <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-base">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm uppercase tracking-[0.1em] mb-1">
                  30-Minute Session
                </h3>
                <p className="text-sm text-muted-foreground">
                  Focused discussion about your requirements and goals
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-base">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Video className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm uppercase tracking-[0.1em] mb-1">
                  Video Call
                </h3>
                <p className="text-sm text-muted-foreground">
                  Via Google Meet, Zoom, or your preferred platform
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-base">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm uppercase tracking-[0.1em] mb-1">
                  Flexible Scheduling
                </h3>
                <p className="text-sm text-muted-foreground">
                  Choose a time that works best for you
                </p>
              </div>
            </div>
          </motion.div>

          {/* Placeholder Calendar Widget */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 border-2 border-dashed border-white/20 rounded-base p-12 text-center mb-8"
          >
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">
              Calendar integration coming soon
            </p>
            <p className="text-sm text-muted-foreground/60">
              In the meantime, we'll reach out via your preferred contact method
            </p>
          </motion.div>

          {/* Alternative Contact */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Prefer to schedule manually?
            </p>
            <Button variant="outline" size="sm">
              Contact via Email
            </Button>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
