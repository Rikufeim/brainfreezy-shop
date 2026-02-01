import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onOpenContact: () => void;
  onOpenShop: () => void;
  onOpenVibeCode: () => void;
}

export default function Header({ onOpenContact, onOpenShop, onOpenVibeCode }: HeaderProps) {
  const { totalItems, openCart } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
      <nav className="flex items-center justify-between">
        {/* Left side buttons */}
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenContact}
              className="uppercase tracking-[0.2em] font-display"
            >
              Let's Talk
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenVibeCode}
              className="uppercase tracking-[0.2em] font-display"
            >
              Vibe Code
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              variant="outline"
              size="sm"
              className="uppercase tracking-[0.2em] font-display"
            >
              Crypto
            </Button>
          </motion.div>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          {/* Shop Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenShop}
              className="uppercase tracking-[0.2em] font-display"
            >
              Shop
            </Button>
          </motion.div>

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
