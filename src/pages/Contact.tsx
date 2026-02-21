import { motion } from "framer-motion";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import CartDrawer from "@/components/CartDrawer";
import ArcticBackground from "@/components/ArcticBackground";

export default function Contact() {
  const openCart = useCartStore((state) => state.openCart);
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#020C18] relative">
      <ArcticBackground />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" style={{ height: '60px' }} />
        
        <nav className="relative flex items-center justify-between px-6 md:px-8" style={{ height: '60px' }}>
          {/* Back button */}
          <Link to="/">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              aria-label="Go Back"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>

          {/* Cart */}
          <div className="relative">
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
          </div>
        </nav>
      </header>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-24 pb-12 px-6 md:px-12"
      >
        <div className="max-w-3xl mx-auto">
          {/* All Sales Final Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="font-display text-lg md:text-xl font-bold tracking-widest text-white mb-4">
              ALL SALES FINAL
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed tracking-wide uppercase">
              ALL SALES ARE FINAL DUE TO THE LOW COST OF GOODS. WE DO NOT OFFER 
              RETURNS OR EXCHANGES. PLEASE REVIEW YOUR ORDER CAREFULLY BEFORE 
              COMPLETING YOUR PURCHASE.
            </p>
          </motion.div>

          {/* Order Issues Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="font-display text-lg md:text-xl font-bold tracking-widest text-white mb-4">
              ORDER ISSUES
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed tracking-wide uppercase">
              IF AN ITEM IS INCORRECT OR DEFECTIVE, EMAIL US AT{" "}
              <a 
                href="mailto:rick@multiply-vision.com" 
                className="text-white hover:text-white/80 transition-colors"
              >
                RICK@MULTIPLY-VISION.COM
              </a>{" "}
              AND WE WILL TAKE RESPONSIBILITY AND RESOLVE IT PROMPTLY.
            </p>
            <p className="text-white/70 text-sm md:text-base leading-relaxed tracking-wide uppercase mt-4">
              PLEASE INCLUDE YOUR ORDER NUMBER AND A BRIEF DESCRIPTION.
            </p>
          </motion.div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-t border-white/10 pt-8"
          >
            <p className="text-white/50 text-sm tracking-widest">
              —<br />
              BRAINFREEZY
            </p>
          </motion.div>
        </div>
      </motion.div>

      <CartDrawer />
    </div>
  );
}
