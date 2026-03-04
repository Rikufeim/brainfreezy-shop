import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, X } from "lucide-react";
import CartDrawer from "@/components/CartDrawer";
import Header from "@/components/Header";
import FeaturedProducts from "@/components/FeaturedProducts";
import { filterByCategory } from "@/components/FeaturedProducts";
import ProductDetail from "@/components/ProductDetail";
import { Button } from "@/components/ui/button";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import ArcticBackground from "@/components/ArcticBackground";

export default function Shop() {
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const { products } = useShopifyProducts(50);
  const syncCart = useCartStore((state) => state.syncCart);
  const selectedCategory = "ALL";

  useEffect(() => {
    syncCart();
  }, [syncCart]);

  // Same dedupe + filter order as FeaturedProducts (for modal next/prev)
  const uniqueProducts = products.filter(
    (product, index, self) => index === self.findIndex((p) => p.node.id === product.node.id)
  ).filter(p => !p.node.title.toLowerCase().includes("xrp") && !p.node.title.toLowerCase().includes("crypto brain"));
  const filteredProducts = filterByCategory(uniqueProducts, selectedCategory);

  const handleNext = () => {
    if (!selectedProduct) return;
    const currentIndex = filteredProducts.findIndex(p => p.node.id === selectedProduct.node.id);
    const nextIndex = (currentIndex + 1) % filteredProducts.length;
    setSelectedProduct(filteredProducts[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedProduct) return;
    const currentIndex = filteredProducts.findIndex(p => p.node.id === selectedProduct.node.id);
    const prevIndex = (currentIndex - 1 + filteredProducts.length) % filteredProducts.length;
    setSelectedProduct(filteredProducts[prevIndex]);
  };

  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden scrollbar-hide bg-[#020C18] relative">
      <ArcticBackground animateZoom />
      {/* Header with back button */}
      {/* Header with back button */}
      <Header
        onToggleCategories={() => { }}
        showBackButton={true}
        onBack={() => window.history.back()}
      />

      {/* Product Grid – same as front page (FeaturedProducts: Product3DCard, grid, styles) */}
      <main className="pt-24">
        <FeaturedProducts
          selectedCategory={selectedCategory}
          onSelectProduct={setSelectedProduct}
          entranceDelay={0.35}
        />
      </main>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="fixed top-6 left-6 z-10"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedProduct(null)}
                className="text-white hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ProductDetail
                product={selectedProduct}
                onNext={handleNext}
                onPrev={handlePrev}
                onAddToCart={() => { }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
}
