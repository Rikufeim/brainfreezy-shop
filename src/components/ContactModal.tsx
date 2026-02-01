import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Topic = "custom-web-app" | "custom-landing-page" | "custom-tracker" | null;

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic>(null);
  const [details, setDetails] = useState("");
  const [email, setEmail] = useState("");

  const topics = [
    { id: "custom-web-app" as Topic, label: "Custom Web App", description: "Full-stack web applications tailored to your needs" },
    { id: "custom-landing-page" as Topic, label: "Custom Landing Page", description: "High-converting landing pages for your products" },
    { id: "custom-tracker" as Topic, label: "Custom Tracker", description: "Analytics and tracking solutions for your business" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email sending logic
    console.log({ selectedTopic, details, email });
    alert("Message sent! We'll be in touch soon.");
    onClose();
    // Reset form
    setSelectedTopic(null);
    setDetails("");
    setEmail("");
  };

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
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="min-h-full flex items-start justify-center p-6 pt-20">
              <div className="relative w-full max-w-3xl">
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
                    Let's Talk
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-muted-foreground text-lg"
                  >
                    Tell us about your project
                  </motion.p>
                </div>

                {/* Form */}
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  {/* Topic Selection */}
                  <div>
                    <label className="block text-sm font-display uppercase tracking-[0.2em] mb-4 text-foreground">
                      What's it about?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {topics.map((topic, index) => (
                        <motion.button
                          key={topic.id}
                          type="button"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          onClick={() => setSelectedTopic(topic.id)}
                          className={`p-6 rounded-base border-2 border-border text-left transition-all
                                      ${selectedTopic === topic.id 
                                        ? 'bg-main text-mtext shadow-shadow translate-x-boxShadowX translate-y-boxShadowY' 
                                        : 'bg-card hover:border-white/25'
                                      }`}
                        >
                          <h3 className="font-display font-bold mb-2 text-lg">
                            {topic.label}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {topic.description}
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <label htmlFor="details" className="block text-sm font-display uppercase tracking-[0.2em] mb-3 text-foreground">
                      Details
                    </label>
                    <textarea
                      id="details"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      required
                      rows={5}
                      placeholder="Tell us more about your project..."
                      className="w-full px-4 py-3 bg-card border-2 border-border rounded-base
                                 text-foreground placeholder:text-muted-foreground
                                 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
                                 transition-all resize-none"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-display uppercase tracking-[0.2em] mb-3 text-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-card border-2 border-border rounded-base
                                 text-foreground placeholder:text-muted-foreground
                                 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
                                 transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="neutral"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!selectedTopic || !details.trim() || !email.trim()}
                      className="uppercase tracking-[0.2em] font-display"
                    >
                      Send Message
                    </Button>
                  </div>
                </motion.form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
