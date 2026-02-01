import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/config";

interface ServicePickerProps {
  onSelect: (serviceId: string) => void;
}

export default function ServicePicker({ onSelect }: ServicePickerProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl md:text-4xl font-bold uppercase tracking-[0.2em] mb-4"
        >
          Choose Your Service
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-base"
        >
          Select the service you're interested in
        </motion.p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {SERVICES.map((service, index) => (
          <motion.button
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => onSelect(service.id)}
            className="group p-6 rounded-base border-2 border-border text-left transition-all
                       hover:bg-white/5 hover:border-white/25 hover:translate-x-1 hover:translate-y-1"
          >
            <h3 className="font-display font-bold mb-2 text-lg group-hover:text-white transition-colors">
              {service.label}
            </h3>
            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
