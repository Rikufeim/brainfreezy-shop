import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types/product";
import { getProductsByCategory } from "@/data/clothing";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface ProductOverlayProps {
    category: string | null;
    onClose: () => void;
    selectedProduct: Product | null;
    onSelectProduct: (product: Product | null) => void;
}

export default function ProductOverlay({ category, onClose, selectedProduct, onSelectProduct }: ProductOverlayProps) {
    const products = category ? getProductsByCategory(category) : [];

    // Helper to navigate
    const handleNext = () => {
        if (!selectedProduct) return;
        const currentIndex = products.findIndex(p => p.id === selectedProduct.id);
        const nextIndex = (currentIndex + 1) % products.length;
        onSelectProduct(products[nextIndex]);
    };

    const handlePrev = () => {
        if (!selectedProduct) return;
        const currentIndex = products.findIndex(p => p.id === selectedProduct.id);
        const prevIndex = (currentIndex - 1 + products.length) % products.length;
        onSelectProduct(products[prevIndex]);
    };

    return (
        <AnimatePresence>
            {category && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-30 pointer-events-none"
                >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto flex items-center justify-center pt-24 pb-12 px-4 md:pl-80">
                        <div className="w-full max-w-7xl h-full overflow-y-auto scrollbar-hide relative bg-transparent">

                            {/* Header (Category Title or Close) - Hide in Detail View if desired, or keep? Screenshot clean. */}
                            {!selectedProduct && (
                                <div className="flex justify-between items-center mb-8 px-4">
                                    <h2 className="text-4xl font-display font-bold uppercase tracking-widest text-white mix-blend-difference">
                                        {category}
                                    </h2>
                                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full bg-white/10 hover:bg-white/20 text-white">
                                        <X className="w-6 h-6" />
                                    </Button>
                                </div>
                            )}

                            {selectedProduct ? (
                                <ProductDetail
                                    product={selectedProduct}
                                    onNext={handleNext}
                                    onPrev={handlePrev}
                                    onAddToCart={() => { }} // Feedback handled by cart context usually
                                />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 pb-20">
                                    {products.map((product, index) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() => onSelectProduct(product)}
                                            className="cursor-pointer"
                                        >
                                            <div className="pointer-events-none">
                                                {/* Disable internal buttons of ProductCard to allow container click? 
                                                    Actually ProductCard has 'Buy Now'. 
                                                    Ideally clicking card image -> Detail. Clicking Buy -> Cart.
                                                    Restructuring: Let's assume the whole card click opens detail for this flow.
                                                    We can suppress events in ProductCard? Or just let it be.
                                                    If I wrap in onClick, clicking Buy will trigger both add to cart and open detail.
                                                    That's annoying. 
                                                    Let's modify ProductCard later? Or just assume detailed view is primary. 
                                                    The prompt says "Kun painan tuotetta, niin tuote tulee isommaksi" (When I press product..).
                                                */}
                                                <ProductCard product={product} index={index} />
                                            </div>
                                        </motion.div>
                                    ))}

                                    {products.length === 0 && (
                                        <div className="col-span-full text-center text-white/50 text-xl py-20">
                                            No products found in this category.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
