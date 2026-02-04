import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import brainfreezyLogo from "@/assets/brainfreezy-logo-official.png";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";

const ROTATION_INTERVAL = 4000; // 4 seconds

interface ProductShowcaseProps {
  product: ShopifyProduct;
  side: "left" | "right";
  countdown: number;
  isPaused: boolean;
  onSelectSize: (product: ShopifyProduct) => void;
  onAddWithVariant: (product: ShopifyProduct, variantId: string) => void;
  activeProductId: string | null;
}

function ProductShowcase({ 
  product, 
  side, 
  countdown, 
  isPaused,
  onSelectSize,
  onAddWithVariant,
  activeProductId 
}: ProductShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-8px", "8px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["8px", "-8px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const imageUrl = product.node.images.edges[0]?.node.url;
  const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
  const hasVariants = product.node.variants.edges.length > 1;
  const isActive = activeProductId === product.node.id;

  // Get size options
  const sizeOptions = product.node.variants.edges.map(v => ({
    id: v.node.id,
    size: v.node.selectedOptions.find(o => o.name.toLowerCase() === 'size')?.value || v.node.title,
    available: v.node.availableForSale
  }));

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: side === "left" ? -50 : 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center gap-3"
    >
      {/* Countdown Timer */}
      <motion.div 
        key={`${countdown}-${isPaused}`}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`text-sm font-mono tabular-nums ${isPaused ? 'text-white/60' : 'text-white/40'}`}
      >
        {isPaused ? '⏸' : `${countdown}s`}
      </motion.div>

      {/* 3D Product Image */}
      <div className="perspective-distant transform-3d">
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, translateX, translateY }}
          initial={{ scale: 1, z: 0 }}
          whileHover={{ 
            scale: 1.08, 
            z: 30,
            transition: { duration: 0.2 } 
          }}
          className="cursor-pointer"
        >
          <img
            src={imageUrl}
            alt={product.node.title}
            className="w-28 h-28 md:w-40 md:h-40 object-contain"
            style={{
              filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))",
            }}
          />
        </motion.div>
      </div>
      
      {/* Button or Size Selector */}
      <AnimatePresence mode="wait">
        {isActive && hasVariants ? (
          <motion.div
            key="sizes"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {sizeOptions.map((option) => (
              <Button
                key={option.id}
                onClick={() => onAddWithVariant(product, option.id)}
                disabled={!option.available}
                variant="outline"
                size="sm"
                className="text-xs font-display uppercase tracking-widest border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1 min-w-[40px]"
              >
                {option.size}
              </Button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button
              onClick={() => hasVariants ? onSelectSize(product) : onAddWithVariant(product, product.node.variants.edges[0]?.node.id)}
              variant="outline"
              size="sm"
              className="text-xs md:text-sm font-display uppercase tracking-widest border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              {hasVariants ? "Select" : `€${price.toFixed(0)}`}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Logo3D() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-20px", "20px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["20px", "-20px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-distant transform-3d">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, translateX, translateY }}
        initial={{ scale: 1, z: 0 }}
        whileHover={{ scale: 1.05, z: 50, transition: { duration: 0.2 } }}
        className="relative w-48 md:w-80 cursor-pointer"
      >
        <img
          loading="lazy"
          className="h-full w-full object-contain"
          alt="Brain Freezy Logo"
          src={brainfreezyLogo}
          style={{ filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))" }}
        />
      </motion.div>
    </div>
  );
}

export default function HeroShowcase() {
  const { products } = useShopifyProducts(50);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countdown, setCountdown] = useState(ROTATION_INTERVAL / 1000);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  // Filter to get clothing products (not accessories)
  const clothingProducts = products.filter(p => {
    const handle = p.node.handle.toLowerCase();
    const title = p.node.title.toLowerCase();
    return !handle.includes('case') && 
           !handle.includes('beanie') && 
           !handle.includes('patch') &&
           !title.includes('case') &&
           !title.includes('beanie') &&
           !title.includes('patch');
  });

  const isPaused = activeProductId !== null;

  // Countdown timer - pause when selecting size
  useEffect(() => {
    if (clothingProducts.length < 2 || isPaused) return;
    
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return ROTATION_INTERVAL / 1000;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(countdownInterval);
  }, [clothingProducts.length, isPaused]);

  // Auto-rotate products - pause when selecting size
  useEffect(() => {
    if (clothingProducts.length < 2 || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % clothingProducts.length);
      setCountdown(ROTATION_INTERVAL / 1000);
    }, ROTATION_INTERVAL);
    
    return () => clearInterval(interval);
  }, [clothingProducts.length, isPaused]);

  const handleSelectSize = useCallback((product: ShopifyProduct) => {
    setActiveProductId(product.node.id);
  }, []);

  const handleAddWithVariant = useCallback((product: ShopifyProduct, variantId: string) => {
    const variant = product.node.variants.edges.find(v => v.node.id === variantId)?.node;
    if (!variant) return;
    
    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
    openCart();
    setActiveProductId(null); // Reset after adding
  }, [addItem, openCart]);

  // Get current products to display
  const leftProduct = clothingProducts[currentIndex % clothingProducts.length];
  const rightProduct = clothingProducts[(currentIndex + 1) % clothingProducts.length];

  return (
    <div className="flex items-center justify-center gap-6 md:gap-12 lg:gap-16">
      {/* Left Product */}
      <div className="hidden sm:block">
        <AnimatePresence mode="wait">
          {leftProduct && (
            <ProductShowcase
              key={leftProduct.node.id}
              product={leftProduct}
              side="left"
              countdown={countdown}
              isPaused={isPaused}
              onSelectSize={handleSelectSize}
              onAddWithVariant={handleAddWithVariant}
              activeProductId={activeProductId}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Center Logo */}
      <Logo3D />

      {/* Right Product */}
      <div className="hidden sm:block">
        <AnimatePresence mode="wait">
          {rightProduct && (
            <ProductShowcase
              key={rightProduct.node.id}
              product={rightProduct}
              side="right"
              countdown={countdown}
              isPaused={isPaused}
              onSelectSize={handleSelectSize}
              onAddWithVariant={handleAddWithVariant}
              activeProductId={activeProductId}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
