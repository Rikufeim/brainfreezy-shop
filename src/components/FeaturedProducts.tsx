import { motion } from "framer-motion";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ShopifyProduct } from "@/lib/shopify";
import Product3DCard from "./Product3DCard";

interface FeaturedProductsProps {
    selectedCategory: string;
    onSelectProduct: (product: ShopifyProduct) => void;
    /** Delay before products start fading in (for entrance sync with background zoom etc) */
    entranceDelay?: number;
}

export default function FeaturedProducts({ selectedCategory, onSelectProduct, entranceDelay = 0 }: FeaturedProductsProps) {
    const { products, isLoading, error } = useShopifyProducts(50);

    // Deduplicate products by id and filter by category
    const uniqueProducts = products.filter((product, index, self) =>
        index === self.findIndex(p => p.node.id === product.node.id)
    ).filter(p =>
        !p.node.title.toLowerCase().includes("xrp") &&
        !p.node.title.toLowerCase().includes("crypto brain")
    );
    const filteredProducts = filterByCategory(uniqueProducts, selectedCategory);

    if (isLoading) {
        return (
            <section className="py-24 px-6 md:px-12 bg-transparent w-full relative z-10">
                <div className="max-w-7xl mx-auto min-h-[400px]" />
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-24 px-6 md:px-12 bg-transparent w-full relative z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
                    <p className="text-white/50">Failed to load products</p>
                </div>
            </section>
        );
    }

    if (filteredProducts.length === 0) {
        return (
            <section className="py-24 px-6 md:px-12 bg-transparent w-full relative z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
                    <p className="text-white/50">No products found</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 px-6 md:px-12 bg-transparent w-full relative z-10">
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
                                transition={{ delay: entranceDelay + index * 0.08, duration: 0.6 }}
                                className="flex flex-col items-center"
                            >
                                <Product3DCard
                                    onClick={() => onSelectProduct(product)}
                                    className="w-full"
                                >
                                    <div className="relative w-full aspect-square mb-6">
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt={product.node.title}
                                                className="w-full h-full object-contain drop-shadow-2xl"
                                                style={{
                                                    filter: "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))",
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                                <span className="text-white/20 text-xs uppercase tracking-widest">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                </Product3DCard>
                                <h3 className="font-display font-medium text-lg tracking-widest text-white/90 uppercase text-center mt-2">
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

// Sort products: clothing first, accessories last (exported for Shop modal nav)
function sortProducts(products: ShopifyProduct[]): ShopifyProduct[] {
    return [...products].sort((a, b) => {
        const aHandle = a.node.handle.toLowerCase();
        const bHandle = b.node.handle.toLowerCase();
        const aTitle = a.node.title.toLowerCase();
        const bTitle = b.node.title.toLowerCase();

        const isAccessoryA = aHandle.includes('case') || aHandle.includes('beanie') ||
            aHandle.includes('patch') || aTitle.includes('case') ||
            aTitle.includes('beanie') || aTitle.includes('patch');
        const isAccessoryB = bHandle.includes('case') || bHandle.includes('beanie') ||
            bHandle.includes('patch') || bTitle.includes('case') ||
            bTitle.includes('beanie') || bTitle.includes('patch');

        // Accessories go last
        if (isAccessoryA && !isAccessoryB) return 1;
        if (!isAccessoryA && isAccessoryB) return -1;

        // Within clothing, prioritize sweatshirts (SW)
        const isSweatshirtA = aHandle.includes('sweatshirt') || aTitle.includes('sweatshirt');
        const isSweatshirtB = bHandle.includes('sweatshirt') || bTitle.includes('sweatshirt');

        if (isSweatshirtA && !isSweatshirtB) return -1;
        if (!isSweatshirtA && isSweatshirtB) return 1;

        return 0;
    });
}

export function filterByCategory(products: ShopifyProduct[], category: string): ShopifyProduct[] {
    const normalized = category.toLowerCase();

    // Sort first, then filter
    const sortedProducts = sortProducts(products);

    if (normalized === 'all') {
        return sortedProducts;
    }

    if (normalized === 'mens' || normalized === 'womens') {
        // Filter to clothing products only
        return sortedProducts.filter(p => {
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
        return sortedProducts.filter(p => {
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

    return sortedProducts;
}
