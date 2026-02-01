import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { ChevronRight, ChevronLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

interface ProductDetailProps {
    product: Product;
    onNext: () => void;
    onPrev: () => void;
    onAddToCart: () => void;
}

export default function ProductDetail({ product, onNext, onPrev, onAddToCart }: ProductDetailProps) {
    const { addToCart } = useCart();

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
            {/* Navigation Arrows */}
            <button
                onClick={onPrev}
                className="absolute left-0 md:left-4 z-10 p-4 text-white/50 hover:text-white transition-colors"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>

            <button
                onClick={onNext}
                className="absolute right-0 md:right-4 z-10 p-4 text-white/50 hover:text-white transition-colors"
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Main Content */}
            <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="flex flex-col items-center max-w-lg w-full p-6 text-center"
            >
                {/* Image */}
                <div className="w-full aspect-square relative mb-8 flex items-center justify-center">
                    {/* Using a placeholder or the image if available */}
                    {product.image && product.image !== "/placeholder" ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain drop-shadow-2xl"
                        />
                    ) : (
                        // Fallback specific for clothing (mock)
                        <div className="w-full h-full bg-white/5 rounded-xl flex items-center justify-center text-white/20">
                            <span className="font-display uppercase tracking-widest">{product.name}</span>
                        </div>
                    )}
                </div>

                {/* Dots simplified (just visual) */}
                <div className="flex gap-2 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                </div>

                {/* Info */}
                <h2 className="font-display font-bold text-2xl uppercase tracking-[0.2em] mb-2">
                    {product.name}
                    {/* Hack to match screenshot "JC-11" style if needed, but using name is fine */}
                </h2>

                <p className="font-display text-xl mb-8">
                    ${product.price}
                </p>

                {/* Add Button */}
                <Button
                    size="icon"
                    onClick={() => {
                        addToCart(product);
                        if (onAddToCart) onAddToCart();
                    }}
                    className="w-12 h-12 rounded-full bg-white text-black hover:bg-white/90 hover:scale-110 transition-all font-bold"
                >
                    <Plus className="w-6 h-6" />
                </Button>

            </motion.div>
        </div>
    );
}
