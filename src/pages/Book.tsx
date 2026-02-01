import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Book() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full"
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
