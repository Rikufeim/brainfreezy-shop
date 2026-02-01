import { useState } from "react";
import { motion } from "framer-motion";
import CometCardDemo from "@/components/comet-card-demo";
import Header from "@/components/Header";
import LetsTalkModal from "@/components/lets-talk/LetsTalkModal";
import ShopModal from "@/components/ShopModal";
import VibeCodeModal from "@/components/VibeCodeModal";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/contexts/CartContext";

function IndexContent() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isVibeCodeOpen, setIsVibeCodeOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      
      {/* Header */}
      <Header 
        onOpenContact={() => setIsContactOpen(true)}
        onOpenShop={() => setIsShopOpen(true)}
        onOpenVibeCode={() => setIsVibeCodeOpen(true)}
      />
      
      {/* Hero Content */}
      <div className="flex min-h-screen items-center justify-center">
        <CometCardDemo />
      </div>
      
      {/* Modals */}
      <LetsTalkModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ShopModal isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} />
      <VibeCodeModal isOpen={isVibeCodeOpen} onClose={() => setIsVibeCodeOpen(false)} />
      
      {/* Cart Drawer */}
      <CartDrawer />
    </motion.div>
  );
}

const Index = () => {
  return (
    <CartProvider>
      <IndexContent />
    </CartProvider>
  );
};

export default Index;
