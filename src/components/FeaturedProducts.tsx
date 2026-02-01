import { motion } from "framer-motion";
import { getProductsByCategory } from "@/data/clothing";
import { Product } from "@/types/product";

interface FeaturedProductsProps {
    selectedCategory: string;
    onSelectProduct: (product: Product) => void;
}

export default function FeaturedProducts({ selectedCategory, onSelectProduct }: FeaturedProductsProps) {
    const products = getProductsByCategory(selectedCategory);
    return (
        <section className="py-24 px-6 md:px-12 bg-black w-full relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center group cursor-pointer"
                            onClick={() => onSelectProduct(product)}
                        >
                            <div className="relative w-full aspect-square mb-6 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
                                />
                            </div>
                            <h3 className="font-display font-medium text-lg tracking-widest text-white/90 uppercase mb-2">
                                {product.id}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
