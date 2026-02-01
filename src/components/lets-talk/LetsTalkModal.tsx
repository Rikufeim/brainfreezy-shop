import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServicePicker from "./ServicePicker";
import BriefForm from "./BriefForm";
import { createLead, createCheckout } from "@/lib/api";
import { SERVICES } from "@/lib/config";

interface LetsTalkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "service" | "brief";

export default function LetsTalkModal({ isOpen, onClose }: LetsTalkModalProps) {
  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setStep("brief");
  };

  const handleBack = () => {
    setStep("service");
  };

  const handleBriefSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Step 1: Create lead
      const { leadId } = await createLead({
        service: selectedService,
        details: data.details,
        contactMethod: data.contactMethod,
        contactValue: data.contactValue,
        budgetRange: data.budgetRange,
        deadline: data.deadline,
        consent: data.consent,
      });

      // Step 2: Create checkout session
      const { checkoutUrl } = await createCheckout(leadId);

      // Step 3: Redirect to checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Submission error:", error);
      alert(error instanceof Error ? error.message : "Failed to submit. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setStep("service");
      setSelectedService("");
      onClose();
    }
  };

  const serviceLabel = SERVICES.find((s) => s.id === selectedService)?.label || "";

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
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="relative w-full max-w-2xl bg-black border-2 border-border rounded-base p-8 max-h-[90vh] overflow-y-auto scrollbar-hide">
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="absolute top-4 right-4"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </Button>

                {/* Content */}
                <div className="mt-4">
                  {step === "service" && <ServicePicker onSelect={handleServiceSelect} />}
                  {step === "brief" && (
                    <BriefForm
                      service={serviceLabel}
                      onBack={handleBack}
                      onSubmit={handleBriefSubmit}
                      isSubmitting={isSubmitting}
                    />
                  )}
                </div>
              </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
