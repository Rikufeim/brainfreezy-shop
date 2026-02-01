import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return `$${price}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-[#0a0a0a] rounded-2xl p-6 border border-white/5
                 transition-all duration-500 hover:border-white/20 hover:bg-[#111] overflow-hidden"
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-xl bg-black/40 p-4 flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/10 font-display uppercase tracking-widest text-xs">
            No Image
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-display
                            bg-white text-black font-bold rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product info */}
      <div className="mb-6 text-center">
        <h3 className="font-display text-xl font-bold mb-1 text-white uppercase tracking-widest px-2 truncate">
          {product.id}
        </h3>
        <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
          {product.name}
        </p>
      </div>

      {/* Price and CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="font-display text-xl font-bold text-white">
          {formatPrice(product.price)}
        </span>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          size="sm"
          variant="outline"
          className="rounded-full border-white/10 hover:bg-white hover:text-black transition-all duration-300 px-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
    </motion.div>
  );
}
