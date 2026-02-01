import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { courses } from "@/data/products";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";

interface CoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CoursesModal({ isOpen, onClose }: CoursesModalProps) {
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
              <div className="relative w-full max-w-5xl">
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
                    className="font-display text-4xl md:text-5xl font-bold uppercase tracking-luxury mb-4"
                  >
                    Courses
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-muted-foreground text-lg"
                  >
                    Master crypto trading and vibe coding with our premium courses
                  </motion.p>
                </div>

                {/* Course grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course, index) => (
                    <ProductCard key={course.id} product={course} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
