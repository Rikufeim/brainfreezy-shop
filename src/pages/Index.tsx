import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import CometCardDemo from "@/components/comet-card-demo";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductDetail from "@/components/ProductDetail";
import CookieBanner from "@/components/CookieBanner";
import icyMascot from "@/assets/icy-mascot.png";
import { Button } from "@/components/ui/button";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

const categories = [
  "ALL",
  "MENS",
  "WOMENS",
  "ACCESSORIES",
];

// Filter products by category
function filterByCategory(products: ShopifyProduct[], category: string): ShopifyProduct[] {
  const normalized = category.toLowerCase();
  
  if (normalized === 'all') {
    return products;
  }
  
  if (normalized === 'mens' || normalized === 'womens') {
    return products.filter(p => {
      const handle = p.node.handle.toLowerCase();
      const title = p.node.title.toLowerCase();
      return !handle.includes('case') && 
             !handle.includes('beanie') && 
             !handle.includes('patch') &&
             !title.includes('case') &&
             !title.includes('beanie') &&
             !title.includes('patch');
    });
  }
  
  if (normalized === 'accessories') {
    return products.filter(p => {
      const handle = p.node.handle.toLowerCase();
      const title = p.node.title.toLowerCase();
      return handle.includes('case') || 
             handle.includes('beanie') || 
             handle.includes('patch') ||
             title.includes('case') ||
             title.includes('beanie') ||
             title.includes('patch');
    });
  }
  
  return products;
}

function IndexContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [cookieBannerOpen, setCookieBannerOpen] = useState(false);
  const { products } = useShopifyProducts(50);
  const syncCart = useCartStore((state) => state.syncCart);

  // Sync cart on visibility change
  useEffect(() => {
    syncCart();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') syncCart();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [syncCart]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
  };

  // Get current category products for navigation
  const currentProducts = filterByCategory(products, selectedCategory);

  const handleNext = () => {
    if (!selectedProduct) return;
    const currentIndex = currentProducts.findIndex(p => p.node.id === selectedProduct.node.id);
    const nextIndex = (currentIndex + 1) % currentProducts.length;
    setSelectedProduct(currentProducts[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedProduct) return;
    const currentIndex = currentProducts.findIndex(p => p.node.id === selectedProduct.node.id);
    const prevIndex = (currentIndex - 1 + currentProducts.length) % currentProducts.length;
    setSelectedProduct(currentProducts[prevIndex]);
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
        onToggleCategories={() => {}}
        showBackButton={!!selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />

      {/* Hero Content */}
      <div className="flex h-screen items-center justify-center">
        <CometCardDemo />
      </div>

      {/* Categories */}
      <section className="py-16 px-6 md:px-12 bg-black w-full relative z-10">
        <div className="max-w-7xl mx-auto">
          <nav className="flex flex-wrap justify-center gap-8 md:gap-12">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCategorySelect(category)}
                className={`text-2xl md:text-3xl font-display font-bold tracking-widest transition-colors duration-300 ${
                  selectedCategory === category ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </nav>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts selectedCategory={selectedCategory} onSelectProduct={setSelectedProduct} />

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
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="fixed top-6 left-6 md:top-8 md:left-8 z-10"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedProduct(null)}
                className="text-white hover:bg-white/10 transition-all duration-300"
                aria-label="Go Back"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.5, type: "spring", damping: 20 }}
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

      {/* Cookie Banner */}
      <CookieBanner open={cookieBannerOpen} onOpenChange={setCookieBannerOpen} />

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 bg-black w-full relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
            {/* Mascot - shown first on mobile */}
            <div className="md:hidden flex justify-center mb-4">
              <img
                src={icyMascot}
                alt="ICY"
                className="w-24 h-24 object-contain"
              />
            </div>
            
            {/* Links */}
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 flex-1">
              <Link to="/contact" className="text-base md:text-xl font-display font-bold tracking-widest text-white/50 hover:text-white transition-colors duration-300">CONTACT</Link>
              <button 
                onClick={() => setCookieBannerOpen(true)}
                className="text-base md:text-xl font-display font-bold tracking-widest text-white/50 hover:text-white transition-colors duration-300"
              >
                COOKIES
              </button>
            </div>
            
            {/* Mascot - shown on right for desktop */}
            <div className="hidden md:flex justify-end">
              <img
                src={icyMascot}
                alt="ICY"
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

const Index = () => {
  return <IndexContent />;
};

export default Index;
