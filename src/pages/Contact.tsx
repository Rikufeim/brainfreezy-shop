import { motion } from "framer-motion";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import CartDrawer from "@/components/CartDrawer";

export default function Contact() {
  const openCart = useCartStore((state) => state.openCart);
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const seamlessBackground = {
    background: `
      radial-gradient(ellipse at 20% 180vh, #00323440 0%, #00323418 20%, transparent 50%),
      radial-gradient(ellipse at 80% 150vh, #00000040 0%, #00000018 20%, transparent 50%),
      radial-gradient(ellipse at 50% 200vh, #0b0d5730 0%, #0b0d5712 25%, transparent 55%),
      radial-gradient(ellipse at 30% 170vh, #00151730 0%, #00151712 20%, transparent 45%),
      radial-gradient(ellipse at 20% 40%, #0b0d5740 0%, #0b0d5718 20%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, #00151740 0%, #00151718 20%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, #00000025 0%, #00000010 30%, transparent 65%),
      radial-gradient(circle at 30% 30%, #0b0d5725 0%, #0b0d5710 15%, transparent 35%),
      radial-gradient(circle at 70% 70%, #00151725 0%, #00151710 15%, transparent 35%),
      #000000
    `,
    filter: "brightness(1.6)",
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Seamless Background */}
      <div className="fixed inset-0 pointer-events-none z-0" style={seamlessBackground} />
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
