import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CONTACT_METHODS, BUDGET_RANGES, DEPOSIT_AMOUNT, DEPOSIT_CURRENCY } from "@/lib/config";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const briefSchema = z.object({
  details: z.string().min(20, "Please provide at least 20 characters"),
  contactMethod: z.string().min(1, "Please select a contact method"),
  contactValue: z.string().min(3, "Please provide your contact info"),
  budgetRange: z.string().optional(),
  deadline: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the deposit requirement",
  }),
  // Honeypot field
  website: z.string().max(0).optional(),
});

type BriefFormData = z.infer<typeof briefSchema>;

interface BriefFormProps {
  service: string;
  onBack: () => void;
  onSubmit: (data: BriefFormData) => Promise<void>;
  isSubmitting: boolean;
}

export default function BriefForm({ service, onBack, onSubmit, isSubmitting }: BriefFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BriefFormData>({
    resolver: zodResolver(briefSchema),
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onBack}
          disabled={isSubmitting}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-[0.15em]">
            Project Brief
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Selected: <span className="text-foreground">{service}</span>
          </p>
        </div>
      </div>

      {/* Deposit Notice */}
      <div className="bg-card border-2 border-border rounded-base p-4">
        <p className="text-sm font-display uppercase tracking-[0.15em] mb-2">
          Deposit Required: {DEPOSIT_AMOUNT}{DEPOSIT_CURRENCY === "EUR" ? "€" : "$"}
        </p>
        <p className="text-xs text-muted-foreground">
          Deposit is credited toward your project if we work together.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          {...register("website")}
          style={{ position: "absolute", left: "-9999px" }}
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Details */}
        <div>
          <label htmlFor="details" className="block text-sm font-display uppercase tracking-[0.15em] mb-2">
            Project Details *
          </label>
          <textarea
            id="details"
            {...register("details")}
            rows={4}
            placeholder="Describe your project, goals, and requirements..."
            className="w-full px-4 py-3 bg-card border-2 border-border rounded-base
                       text-foreground placeholder:text-muted-foreground
                       focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/25
                       transition-all resize-none"
          />
          {errors.details && (
            <p className="text-sm text-red-400 mt-1">{errors.details.message}</p>
          )}
        </div>

        {/* Contact Method */}
        <div>
          <label htmlFor="contactMethod" className="block text-sm font-display uppercase tracking-[0.15em] mb-2">
            Contact Method *
          </label>
          <select
            id="contactMethod"
            {...register("contactMethod")}
            className="w-full px-4 py-3 bg-card border-2 border-border rounded-base
                       text-foreground focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/25
                       transition-all"
          >
            <option value="">Select method...</option>
            {CONTACT_METHODS.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
          {errors.contactMethod && (
            <p className="text-sm text-red-400 mt-1">{errors.contactMethod.message}</p>
          )}
        </div>

        {/* Contact Value */}
        <div>
          <label htmlFor="contactValue" className="block text-sm font-display uppercase tracking-[0.15em] mb-2">
            Contact Info *
          </label>
          <input
            id="contactValue"
            type="text"
            {...register("contactValue")}
            placeholder="@username or email address"
            className="w-full px-4 py-3 bg-card border-2 border-border rounded-base
                       text-foreground placeholder:text-muted-foreground
                       focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/25
                       transition-all"
          />
          {errors.contactValue && (
            <p className="text-sm text-red-400 mt-1">{errors.contactValue.message}</p>
          )}
        </div>

        {/* Budget Range */}
        <div>
          <label htmlFor="budgetRange" className="block text-sm font-display uppercase tracking-[0.15em] mb-2">
            Budget Range
          </label>
          <select
            id="budgetRange"
            {...register("budgetRange")}
            className="w-full px-4 py-3 bg-card border-2 border-border rounded-base
                       text-foreground focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/25
                       transition-all"
          >
            <option value="">Select budget...</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Deadline */}
        <div>
          <label htmlFor="deadline" className="block text-sm font-display uppercase tracking-[0.15em] mb-2">
            Deadline
          </label>
          <input
            id="deadline"
            type="date"
            {...register("deadline")}
            className="w-full px-4 py-3 bg-card border-2 border-border rounded-base
                       text-foreground focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/25
                       transition-all"
          />
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            {...register("consent")}
            className="mt-1 h-4 w-4 rounded border-2 border-border bg-card
                       checked:bg-white checked:border-white
                       focus:ring-2 focus:ring-white/40"
          />
          <label htmlFor="consent" className="text-sm text-muted-foreground flex-1">
            I understand a deposit is required to book
          </label>
        </div>
        {errors.consent && (
          <p className="text-sm text-red-400 mt-1">{errors.consent.message}</p>
        )}

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="neutral"
            onClick={onBack}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="uppercase tracking-[0.15em] font-display min-w-[200px]"
          >
            {isSubmitting ? "Processing..." : "Submit & Pay Deposit"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
