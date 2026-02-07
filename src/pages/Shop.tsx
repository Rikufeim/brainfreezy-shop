import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, X } from "lucide-react";
import CartDrawer from "@/components/CartDrawer";
import FeaturedProducts from "@/components/FeaturedProducts";
import { filterByCategory } from "@/components/FeaturedProducts";
import ProductDetail from "@/components/ProductDetail";
import { Button } from "@/components/ui/button";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

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
  );
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
    <div className="h-screen overflow-y-auto overflow-x-hidden scrollbar-hide bg-black relative">
      {/* Seamless Background - matches Index page */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
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
        }}
      />
      {/* Header with back button */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="flex items-center justify-between px-6 py-4">
          <Link to="/" className="text-white hover:text-white/70 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>

          <div className="w-6" /> {/* Spacer for symmetry */}
        </div>
      </header>

      {/* Product Grid – same as front page (FeaturedProducts: Product3DCard, grid, styles) */}
      <main className="pt-24">
        <FeaturedProducts
          selectedCategory={selectedCategory}
          onSelectProduct={setSelectedProduct}
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
