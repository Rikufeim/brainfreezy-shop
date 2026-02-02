import { motion, AnimatePresence } from "framer-motion";
import { ShopifyProduct } from "@/lib/shopify";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ProductDetail from "./ProductDetail";
import { X, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useCartStore } from "@/stores/cartStore";

interface ProductOverlayProps {
    category: string | null;
    onClose: () => void;
    selectedProduct: ShopifyProduct | null;
    onSelectProduct: (product: ShopifyProduct | null) => void;
}

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

export default function ProductOverlay({ category, onClose, selectedProduct, onSelectProduct }: ProductOverlayProps) {
    const { products, isLoading } = useShopifyProducts(50);
    const filteredProducts = category ? filterByCategory(products, category) : [];

    // Helper to navigate
    const handleNext = () => {
        if (!selectedProduct) return;
        const currentIndex = filteredProducts.findIndex(p => p.node.id === selectedProduct.node.id);
        const nextIndex = (currentIndex + 1) % filteredProducts.length;
        onSelectProduct(filteredProducts[nextIndex]);
    };

    const handlePrev = () => {
        if (!selectedProduct) return;
        const currentIndex = filteredProducts.findIndex(p => p.node.id === selectedProduct.node.id);
        const prevIndex = (currentIndex - 1 + filteredProducts.length) % filteredProducts.length;
        onSelectProduct(filteredProducts[prevIndex]);
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

                            {/* Header (Category Title or Close) */}
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
                                    onAddToCart={() => {}}
                                />
                            ) : isLoading ? (
                                <div className="flex items-center justify-center h-64">
                                    <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 pb-20">
                                    {filteredProducts.map((product, index) => {
                                        const imageUrl = product.node.images.edges[0]?.node.url;
                                        const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
                                        const currency = product.node.priceRange.minVariantPrice.currencyCode;
                                        
                                        return (
                                            <motion.div
                                                key={product.node.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                onClick={() => onSelectProduct(product)}
                                                className="cursor-pointer group"
                                            >
                                                <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 transition-all duration-500 hover:border-white/20 hover:bg-[#111]">
                                                    <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-xl bg-black/40 p-4 flex items-center justify-center">
                                                        {imageUrl ? (
                                                            <img
                                                                src={imageUrl}
                                                                alt={product.node.title}
                                                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-white/10 font-display uppercase tracking-widest text-xs">
                                                                No Image
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-center">
                                                        <h3 className="font-display text-lg font-bold mb-1 text-white uppercase tracking-widest truncate">
                                                            {product.node.title}
                                                        </h3>
                                                        <p className="font-display text-white/60">
                                                            {currency === 'EUR' ? '€' : '$'}{price.toFixed(0)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}

                                    {filteredProducts.length === 0 && (
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
