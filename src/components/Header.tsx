import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronLeft } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onToggleCategories: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function Header({ onToggleCategories, showBackButton, onBack }: HeaderProps) {
  const totalItems = useCartStore((state) => state.totalItems);
  const openCart = useCartStore((state) => state.openCart);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Black banner background */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" style={{ height: '60px' }} />
      
      <nav className="relative flex items-center justify-between px-6 md:px-8" style={{ height: '60px' }}>
        {/* Left side buttons */}
        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            {showBackButton && (
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
            )}
          </AnimatePresence>
        </div>

        {/* Center text */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-baseline gap-3 md:gap-4">
            <div className="relative inline-block">
              <div className="text-white/70 text-[10px] md:text-xs font-display font-bold tracking-wider">
                HOLD XRP DROP
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 text-white/40 text-[7px] md:text-[8px] font-display font-light tracking-wide mt-0.5 whitespace-nowrap">
                (coming soon)
              </div>
            </div>
            <div className="text-white text-[10px] md:text-xs font-display font-bold tracking-wider">
              BRAIN FREEZY
            </div>
          </div>
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
            {totalItems() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black rounded-full 
                               flex items-center justify-center text-xs font-bold">
                {totalItems()}
              </span>
            )}
          </motion.div>
        </div>
      </nav>
    </header>
  );
}
