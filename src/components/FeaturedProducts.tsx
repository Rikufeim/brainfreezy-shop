import { motion } from "framer-motion";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ShopifyProduct } from "@/lib/shopify";
import { Loader2 } from "lucide-react";

interface FeaturedProductsProps {
    selectedCategory: string;
    onSelectProduct: (product: ShopifyProduct) => void;
}

export default function FeaturedProducts({ selectedCategory, onSelectProduct }: FeaturedProductsProps) {
    const { products, isLoading, error } = useShopifyProducts(50);
    
    // Deduplicate products by id and filter by category
    const uniqueProducts = products.filter((product, index, self) => 
        index === self.findIndex(p => p.node.id === product.node.id)
    );
    const filteredProducts = filterByCategory(uniqueProducts, selectedCategory);

    if (isLoading) {
        return (
            <section className="py-24 px-6 md:px-12 bg-black w-full relative z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-24 px-6 md:px-12 bg-black w-full relative z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
                    <p className="text-white/50">Failed to load products</p>
                </div>
            </section>
        );
    }

    if (filteredProducts.length === 0) {
        return (
            <section className="py-24 px-6 md:px-12 bg-black w-full relative z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
                    <p className="text-white/50">No products found</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 px-6 md:px-12 bg-black w-full relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
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
                                className="flex flex-col items-center group cursor-pointer"
                                onClick={() => onSelectProduct(product)}
                            >
                                <div className="relative w-full aspect-square mb-6">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={product.node.title}
                                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                            <span className="text-white/20 text-xs uppercase tracking-widest">No Image</span>
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-display font-medium text-lg tracking-widest text-white/90 uppercase text-center">
                                    BF-{getProductCode(product.node.title)}-{String(index + 1).padStart(2, '0')}
                                </h3>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// Get short product code from title
function getProductCode(title: string): string {
    const t = title.toLowerCase();
    if (t.includes('hoodie')) return 'HD';
    if (t.includes('crewneck')) return 'CN';
    if (t.includes('sweatshirt')) return 'SW';
    if (t.includes('tee') || t.includes('t-shirt')) return 'TS';
    if (t.includes('beanie')) return 'BN';
    if (t.includes('patch')) return 'PT';
    if (t.includes('case') || t.includes('phone')) return 'PC';
    return 'XX';
}

function filterByCategory(products: ShopifyProduct[], category: string): ShopifyProduct[] {
    const normalized = category.toLowerCase();
    
    if (normalized === 'all') {
        return products;
    }
    
    if (normalized === 'mens' || normalized === 'womens') {
        // Filter to clothing products only
        return products.filter(p => {
            const handle = p.node.handle.toLowerCase();
            const title = p.node.title.toLowerCase();
            // Exclude accessories
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
