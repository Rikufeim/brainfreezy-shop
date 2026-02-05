import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, X } from "lucide-react";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import ProductDetail from "@/components/ProductDetail";
import { Button } from "@/components/ui/button";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

const categories = ["ALL", "MENS", "WOMENS", "ACCESSORIES"];

// Generate product code from title/handle
function generateProductCode(product: ShopifyProduct, index: number): string {
  const handle = product.node.handle.toLowerCase();
  const title = product.node.title.toLowerCase();
  
  let prefix = "BF";
  let typeCode = "PR";
  
  if (handle.includes("hoodie") || title.includes("hoodie")) {
    typeCode = "HD";
  } else if (handle.includes("crewneck") || handle.includes("sweatshirt") || title.includes("crewneck") || title.includes("sweatshirt")) {
    typeCode = "SW";
  } else if (handle.includes("tshirt") || handle.includes("t-shirt") || title.includes("tshirt") || title.includes("t-shirt")) {
    typeCode = "TS";
  } else if (handle.includes("beanie") || title.includes("beanie")) {
    typeCode = "BN";
  } else if (handle.includes("case") || title.includes("case")) {
    typeCode = "CS";
  } else if (handle.includes("patch") || title.includes("patch")) {
    typeCode = "PT";
  }
  
  return `${prefix}-${typeCode}-${String(index + 1).padStart(2, "0")}`;
}

// Filter products by category
function filterByCategory(products: ShopifyProduct[], category: string): ShopifyProduct[] {
  const normalized = category.toLowerCase();
  
  if (normalized === "all") return products;
  
  if (normalized === "mens" || normalized === "womens") {
    return products.filter(p => {
      const handle = p.node.handle.toLowerCase();
      const title = p.node.title.toLowerCase();
      return !handle.includes("case") && !handle.includes("beanie") && !handle.includes("patch") &&
             !title.includes("case") && !title.includes("beanie") && !title.includes("patch");
    });
  }
  
  if (normalized === "accessories") {
    return products.filter(p => {
      const handle = p.node.handle.toLowerCase();
      const title = p.node.title.toLowerCase();
      return handle.includes("case") || handle.includes("beanie") || handle.includes("patch") ||
             title.includes("case") || title.includes("beanie") || title.includes("patch");
    });
  }
  
  return products;
}

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const { products, isLoading } = useShopifyProducts(50);
  const syncCart = useCartStore((state) => state.syncCart);

  useEffect(() => {
    syncCart();
  }, [syncCart]);

  const filteredProducts = filterByCategory(products, selectedCategory);

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
    <div className="min-h-screen bg-black">
      {/* Header with back button */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4">
          <Link to="/" className="text-white hover:text-white/70 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          
          {/* Category Nav */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm md:text-base font-display font-bold tracking-widest transition-colors duration-300 ${
                  selectedCategory === category ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
          
          <div className="w-6" /> {/* Spacer for symmetry */}
        </div>
      </header>

      {/* Product Grid */}
      <main className="pt-24 pb-12 px-4 md:px-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-white/50 font-display tracking-widest">LOADING...</div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
          >
            {filteredProducts.map((product, index) => {
              const imageUrl = product.node.images.edges[0]?.node.url;
              const productCode = generateProductCode(product, index);
              
              return (
                <motion.div
                  key={product.node.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => setSelectedProduct(product)}
                  className="cursor-pointer group"
                >
                  <div className="aspect-square bg-white/5 flex items-center justify-center p-4 transition-all duration-300 group-hover:bg-white/10">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={product.node.title}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <p className="mt-2 text-center text-white/60 font-mono text-xs tracking-wider">
                    {productCode}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
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
                onAddToCart={() => {}}
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
