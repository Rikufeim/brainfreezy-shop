import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { courses, guides, bundles, memberships } from "@/data/products";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Category = "all" | "courses" | "guides" | "bundles" | "memberships";

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All Products" },
  { id: "courses", label: "Courses" },
  { id: "guides", label: "PDF Guides" },
  { id: "bundles", label: "Bundles" },
  { id: "memberships", label: "Membership" },
];

export default function ShopModal({ isOpen, onClose }: ShopModalProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const getProducts = () => {
    switch (activeCategory) {
      case "courses":
        return courses;
      case "guides":
        return guides;
      case "bundles":
        return bundles;
      case "memberships":
        return memberships;
      default:
        return [...courses, ...guides, ...bundles, ...memberships];
    }
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
              <div className="relative w-full max-w-6xl">
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
                <div className="text-center mb-8">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-display text-4xl md:text-5xl font-bold uppercase tracking-luxury mb-4"
                  >
                    Shop
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-muted-foreground text-lg"
                  >
                    Your gateway to financial freedom and digital mastery
                  </motion.p>
                </div>

                {/* Category tabs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap justify-center gap-3 mb-10"
                >
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(category.id)}
                      className="uppercase tracking-[0.2em] font-display"
                    >
                      {category.label}
                    </Button>
                  ))}
                </motion.div>

                {/* Products grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                  {getProducts().map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
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
