import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import brainfreezyLogo from "@/assets/brainfreezy-logo-official.png";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";

const ROTATION_INTERVAL = 3000; // 3 seconds

interface ProductShowcaseProps {
  product: ShopifyProduct;
  side: "left" | "right";
  isLocked: boolean;
  onSelectSize: (product: ShopifyProduct, side: "left" | "right") => void;
  onAddWithVariant: (product: ShopifyProduct, variantId: string) => void;
  showSizes: boolean;
  shouldDrop: boolean;
}

function ProductShowcase({
  product,
  side,
  isLocked,
  onSelectSize,
  onAddWithVariant,
  showSizes,
  shouldDrop
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

  // Get size options
  const sizeOptions = product.node.variants.edges.map(v => ({
    id: v.node.id,
    size: v.node.selectedOptions.find(o => o.name.toLowerCase() === 'size')?.value || v.node.title,
    available: v.node.availableForSale
  }));

  // Determine exit animation based on shouldDrop
  const exitAnimation = shouldDrop
    ? { opacity: 0, y: 100 }
    : { opacity: 0, x: side === "left" ? -50 : 50 };

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={exitAnimation}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center gap-3"
    >

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
        {showSizes && hasVariants ? (
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
              onClick={() => hasVariants ? onSelectSize(product, side) : onAddWithVariant(product, product.node.variants.edges[0]?.node.id)}
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
        className="relative w-64 md:w-[420px] cursor-pointer"
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
  const navigate = useNavigate();
  const { products } = useShopifyProducts(50);
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(1);
  const [leftRotationCount, setLeftRotationCount] = useState(0);
  const [rightRotationCount, setRightRotationCount] = useState(0);
  const [lockedSide, setLockedSide] = useState<"left" | "right" | null>(null);
  const [lockedProduct, setLockedProduct] = useState<ShopifyProduct | null>(null);
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

  // Left side rotation - independent
  useEffect(() => {
    if (clothingProducts.length < 2 || lockedSide === "left") return;

    const interval = setInterval(() => {
      setLeftIndex((prev) => {
        let next = (prev + 2) % clothingProducts.length;
        // Avoid showing same product as right
        if (next === rightIndex) next = (next + 1) % clothingProducts.length;
        return next;
      });
      setLeftRotationCount((prev) => prev + 1);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [clothingProducts.length, lockedSide, rightIndex]);

  // Right side rotation - independent
  useEffect(() => {
    if (clothingProducts.length < 2 || lockedSide === "right") return;

    const interval = setInterval(() => {
      setRightIndex((prev) => {
        let next = (prev + 2) % clothingProducts.length;
        // Avoid showing same product as left
        if (next === leftIndex) next = (next + 1) % clothingProducts.length;
        return next;
      });
      setRightRotationCount((prev) => prev + 1);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [clothingProducts.length, lockedSide, leftIndex]);

  // Determine if products should drop (every 3rd rotation)
  const leftShouldDrop = leftRotationCount > 0 && leftRotationCount % 3 === 0;
  const rightShouldDrop = rightRotationCount > 0 && rightRotationCount % 3 === 0;

  const handleSelectSize = useCallback((product: ShopifyProduct, side: "left" | "right") => {
    setLockedSide(side);
    setLockedProduct(product);
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
    setLockedSide(null);
    setLockedProduct(null);
  }, [addItem, openCart]);

  // Get current products to display
  const leftProduct = lockedSide === "left" && lockedProduct
    ? lockedProduct
    : clothingProducts[leftIndex % clothingProducts.length];
  const rightProduct = lockedSide === "right" && lockedProduct
    ? lockedProduct
    : clothingProducts[rightIndex % clothingProducts.length];

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center justify-center gap-6 md:gap-12 lg:gap-16">
        {/* Left Product */}
        <div className="hidden sm:block">
          <AnimatePresence mode="wait">
            {leftProduct && (
              <ProductShowcase
                key={lockedSide === "left" ? `locked-${leftProduct.node.id}` : leftProduct.node.id}
                product={leftProduct}
                side="left"
                isLocked={lockedSide === "left"}
                onSelectSize={handleSelectSize}
                onAddWithVariant={handleAddWithVariant}
                showSizes={lockedSide === "left"}
                shouldDrop={leftShouldDrop}
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
                key={lockedSide === "right" ? `locked-${rightProduct.node.id}` : rightProduct.node.id}
                product={rightProduct}
                side="right"
                isLocked={lockedSide === "right"}
                onSelectSize={handleSelectSize}
                onAddWithVariant={handleAddWithVariant}
                showSizes={lockedSide === "right"}
                shouldDrop={rightShouldDrop}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.button
          onClick={() => navigate("/shop")}
          className="px-8 py-3 rounded-lg text-white font-black text-lg tracking-widest uppercase
                     border-2 border-cyan-500 shadow-[5px_5px_0px_0px_#0891b2]
                     hover:shadow-[7px_7px_0px_0px_#0891b2] hover:-translate-y-1 hover:-translate-x-1
                     active:shadow-[0px_0px_0px_0px_#0891b2] active:translate-y-2 active:translate-x-2
                     transition-all duration-150"
          style={{
            background: "linear-gradient(196deg, #051018 0%, #0c1824 25%, #0891b245 55%, #22d3ee30 85%, #051018 100%)",
            filter: "brightness(1.2)",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          Shop All
        </motion.button>
      </motion.div>
    </div>
  );
}
