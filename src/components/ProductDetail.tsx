import { motion } from "framer-motion";
import { useState } from "react";
import { ShopifyProduct } from "@/lib/shopify";
import { ChevronRight, ChevronLeft, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";

interface ProductDetailProps {
    product: ShopifyProduct;
    onNext: () => void;
    onPrev: () => void;
    onAddToCart: () => void;
}

export default function ProductDetail({ product, onNext, onPrev, onAddToCart }: ProductDetailProps) {
    const addItem = useCartStore((state) => state.addItem);
    const isLoading = useCartStore((state) => state.isLoading);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    
    const imageUrl = product.node.images.edges[0]?.node.url;
    const variants = product.node.variants.edges;
    const selectedVariant = variants[selectedVariantIndex]?.node;
    const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
    const currency = product.node.priceRange.minVariantPrice.currencyCode;

    // Check if product has size options
    const sizeOption = product.node.options?.find(opt => 
        opt.name.toLowerCase() === 'size' || opt.name.toLowerCase() === 'koko'
    );
    const hasSizes = sizeOption && sizeOption.values.length > 1;

    const handleAddToCart = async () => {
        if (!selectedVariant) return;
        
        await addItem({
            product,
            variantId: selectedVariant.id,
            variantTitle: selectedVariant.title,
            price: selectedVariant.price,
            quantity: 1,
            selectedOptions: selectedVariant.selectedOptions || []
        });
        
        if (onAddToCart) onAddToCart();
    };

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
                key={product.node.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="flex flex-col items-center max-w-md w-full p-4 text-center"
            >
                {/* Image */}
                <div className="w-full max-h-[45vh] aspect-square relative mb-4 flex items-center justify-center">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={product.node.title}
                            className="w-full h-full object-contain drop-shadow-2xl"
                        />
                    ) : (
                        <div className="w-full h-full bg-white/5 rounded-xl flex items-center justify-center text-white/20">
                            <span className="font-display uppercase tracking-widest">{product.node.title}</span>
                        </div>
                    )}
                </div>

                {/* Dots simplified (just visual) */}
                <div className="flex gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                </div>

                {/* Info */}
                <h2 className="font-display font-bold text-2xl uppercase tracking-[0.2em] mb-2">
                    {product.node.title}
                </h2>

                <p className="font-display text-xl mb-4">
                    {currency === 'EUR' ? '€' : '$'}{price.toFixed(0)}
                </p>

                {/* Size Options */}
                {hasSizes && (
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {variants.map((variant, index) => {
                            const sizeValue = variant.node.selectedOptions?.find(
                                opt => opt.name.toLowerCase() === 'size' || opt.name.toLowerCase() === 'koko'
                            )?.value || variant.node.title;
                            
                            return (
                                <button
                                    key={variant.node.id}
                                    onClick={() => setSelectedVariantIndex(index)}
                                    className={`font-display text-sm uppercase tracking-[0.15em] px-4 py-2 rounded-full border transition-all ${
                                        selectedVariantIndex === index
                                            ? 'bg-white text-black border-white'
                                            : 'bg-transparent text-white/70 border-white/30 hover:border-white hover:text-white'
                                    }`}
                                >
                                    {sizeValue}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Add Button */}
                <Button
                    size="icon"
                    onClick={handleAddToCart}
                    disabled={isLoading || !selectedVariant}
                    className="w-12 h-12 rounded-full bg-white text-black hover:bg-white/90 hover:scale-110 transition-all font-bold disabled:opacity-50"
                >
                    {isLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                        <Plus className="w-6 h-6" />
                    )}
                </Button>

            </motion.div>
        </div>
    );
}
