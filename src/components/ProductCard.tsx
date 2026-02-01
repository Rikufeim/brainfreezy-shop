import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number, isSubscription?: boolean, interval?: string) => {
    if (isSubscription) {
      return `$${price}/${interval}`;
    }
    return `$${price}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card rounded-xl p-6 border border-border
                 transition-all duration-300 hover:border-white/25"
    >
      {/* Category badge */}
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 text-xs uppercase tracking-[0.2em] font-display
                         bg-white/10 text-white/80 rounded-full border border-white/15">
          {product.category}
        </span>
      </div>

      {/* Product info */}
      <div className="mb-6">
        <h3 className="font-display text-xl font-bold mb-2 text-foreground group-hover:text-white transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Features */}
      {product.features && (
        <ul className="space-y-2 mb-6">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-white/70 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Price and CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="font-display text-2xl font-bold text-foreground">
          {formatPrice(product.price, product.isSubscription, product.subscriptionInterval)}
        </span>
        <Button
          onClick={() => addToCart(product)}
          size="sm"
          className="uppercase tracking-[0.2em] font-display"
        >
          Buy Now
        </Button>
      </div>
    </motion.div>
  );
}
