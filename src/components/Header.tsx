import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Plus, ChevronLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onToggleCategories: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function Header({ onToggleCategories, showBackButton, onBack }: HeaderProps) {
  const { totalItems, openCart } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
      <nav className="flex items-center justify-between">
        {/* Left side buttons */}
        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            {showBackButton ? (
              <motion.div
                key="back-button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onBack}
                  className="bg-black/20 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  aria-label="Go Back"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="menu-button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onToggleCategories}
                  className="bg-black/20 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  aria-label="Open Categories"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <Button
              variant="icon"
              size="icon"
              onClick={openCart}
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </Button>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black rounded-full 
                               flex items-center justify-center text-xs font-bold">
                {totalItems}
              </span>
            )}
          </motion.div>
        </div>
      </nav>
    </header>
  );
}
