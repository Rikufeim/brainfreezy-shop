import { motion, AnimatePresence } from "framer-motion";
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
    const [showSizes, setShowSizes] = useState(false);
    
    const imageUrl = product.node.images.edges[0]?.node.url;
    const variants = product.node.variants.edges;
    const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
    const currency = product.node.priceRange.minVariantPrice.currencyCode;

    // Check if product has size options
    const sizeOption = product.node.options?.find(opt => 
        opt.name.toLowerCase() === 'size' || opt.name.toLowerCase() === 'koko'
    );
    const hasSizes = sizeOption && sizeOption.values.length > 1;

    const handlePlusClick = () => {
        if (hasSizes) {
            setShowSizes(true);
        } else {
            // No sizes, add default variant directly
            handleAddToCart(0);
        }
    };

    const handleAddToCart = async (variantIndex: number) => {
        const selectedVariant = variants[variantIndex]?.node;
        if (!selectedVariant) return;
        
        await addItem({
            product,
            variantId: selectedVariant.id,
            variantTitle: selectedVariant.title,
            price: selectedVariant.price,
            quantity: 1,
            selectedOptions: selectedVariant.selectedOptions || []
        });
        
        setShowSizes(false);
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

                <p className="font-display text-xl mb-6">
                    {currency === 'EUR' ? '€' : '$'}{price.toFixed(0)}
                </p>

                {/* Add Button / Size Selection */}
                <div className="min-h-[48px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {!showSizes ? (
                            <motion.div
                                key="plus-button"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Button
                                    size="icon"
                                    onClick={handlePlusClick}
                                    disabled={isLoading}
                                    className="w-12 h-12 rounded-full bg-white text-black hover:bg-white/90 hover:scale-110 transition-all font-bold disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <Plus className="w-6 h-6" />
                                    )}
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="size-options"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-wrap justify-center gap-2"
                            >
                                {variants.map((variant, index) => {
                                    const sizeValue = variant.node.selectedOptions?.find(
                                        opt => opt.name.toLowerCase() === 'size' || opt.name.toLowerCase() === 'koko'
                                    )?.value || variant.node.title;
                                    
                                    return (
                                        <button
                                            key={variant.node.id}
                                            onClick={() => handleAddToCart(index)}
                                            disabled={isLoading}
                                            className="font-display text-sm uppercase tracking-[0.15em] px-4 py-2 rounded-full 
                                                       bg-white text-black hover:bg-white/80 transition-all disabled:opacity-50"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                sizeValue
                                            )}
                                        </button>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </motion.div>
        </div>
    );
}
