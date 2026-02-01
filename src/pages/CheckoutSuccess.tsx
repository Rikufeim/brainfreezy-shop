import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLead } from "@/lib/api";
import type { Lead } from "@/lib/leadsStore";

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get("lead");
  const [lead, setLead] = useState<Lead | null>(null);

  useEffect(() => {
    if (leadId) {
      const foundLead = getLead(leadId);
      if (foundLead) {
        setLead(foundLead);
      }
    }
  }, [leadId]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-card border-2 border-border rounded-base p-8 md:p-12 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-3xl md:text-4xl font-bold uppercase tracking-[0.2em] mb-4"
          >
            Request Received
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg mb-8"
          >
            Thank you for your interest. Your deposit has been processed.
          </motion.p>

          {/* Lead Details (if available) */}
          {lead && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-base p-6 mb-8 text-left"
            >
              <h3 className="font-display text-sm uppercase tracking-[0.15em] text-muted-foreground mb-4">
                Your Request
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">Service:</span>{" "}
                  <span className="text-foreground font-medium">{lead.service}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Contact via:</span>{" "}
                  <span className="text-foreground font-medium capitalize">{lead.contactMethod}</span>
                </p>
                {lead.budgetRange && (
                  <p>
                    <span className="text-muted-foreground">Budget:</span>{" "}
                    <span className="text-foreground font-medium">{lead.budgetRange}</span>
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Next Step */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="border-t border-border pt-8 mt-8"
          >
            <h3 className="font-display text-xl font-bold uppercase tracking-[0.15em] mb-4">
              Next: Pick a Time
            </h3>
            <p className="text-muted-foreground mb-6">
              Schedule a discovery call to discuss your project in detail
            </p>
            <Button asChild size="lg" className="uppercase tracking-[0.15em] font-display">
              <Link to="/book">
                <Calendar className="w-4 h-4 mr-2" />
                Book a Call
              </Link>
            </Button>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
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
