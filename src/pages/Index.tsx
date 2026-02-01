import { useState } from "react";
import { motion } from "framer-motion";
import CometCardDemo from "@/components/comet-card-demo";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import CategorySidebar from "@/components/CategorySidebar";
import FeaturedProducts from "@/components/FeaturedProducts";
import { CartProvider } from "@/contexts/CartContext";

import ProductOverlay from "@/components/ProductOverlay";

import { Product } from "@/types/product";

function IndexContent() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Clear selected product when changing category
    setSelectedProduct(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen bg-black overflow-y-auto overflow-x-hidden scrollbar-hide"
    >

      {/* Header */}
      <Header
        onToggleCategories={() => setIsCategoriesOpen(!isCategoriesOpen)}
        showBackButton={!!selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />

      {/* Hero Content */}
      <div className="flex h-screen items-center justify-center">
        <CometCardDemo />
      </div>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Product Overlay */}
      <ProductOverlay
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
        selectedProduct={selectedProduct}
        onSelectProduct={setSelectedProduct}
      />

      {/* Modals and Sidebars */}
      <CategorySidebar
        isOpen={isCategoriesOpen}
        onClose={() => setIsCategoriesOpen(false)}
        onSelectCategory={handleCategorySelect}
      />

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
