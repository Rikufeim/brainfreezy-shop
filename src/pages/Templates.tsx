import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Product3DCard from "@/components/Product3DCard";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { toast } from "sonner";
import { ctaButtonSmallClassName, ctaButtonStyle } from "@/lib/cta-button";
import ArcticBackground from "@/components/ArcticBackground";

const categories = ["All", "Crypto", "Mindset", "Vibe coding", "Sales"] as const;
type Category = (typeof categories)[number];

const cryptoProducts: Array<{
    id: string;
    name: string;
    price: string;
    category: Category;
}> = [{
    id: "CR-01",
    name: "Crypto Starter Pack",
    price: "$29",
    category: "Crypto"
}, {
    id: "CR-02",
    name: "Market Signals Guide",
    price: "$49",
    category: "Crypto"
}, {
    id: "MS-01",
    name: "Decision Clarity Kit",
    price: "$39",
    category: "Mindset"
}, {
    id: "VC-01",
    name: "Prompt Flow Pack",
    price: "$29",
    category: "Vibe coding"
}, {
    id: "SA-01",
    name: "Pipeline Execution Notes",
    price: "$35",
    category: "Sales"
}, {
    id: "CR-03",
    name: "Macro Playbook",
    price: "$79",
    category: "Crypto"
}, {
    id: "MS-02",
    name: "Risk Psychology Guide",
    price: "$25",
    category: "Mindset"
}, {
    id: "VC-02",
    name: "Landing Page Library",
    price: "$59",
    category: "Vibe coding"
}];

export default function Templates() {

    const { addItem, openCart } = useCartStore();
    const { products, isLoading: productsLoading } = useShopifyProducts(250);

    const handleAddToCart = async () => {
        if (productsLoading) {
            toast.info("Loading products, please wait...");
            return;
        }

        // specific search for XRP product
        // We strictly look for "crypto brain" to avoid matching other XRP merch
        const xrpProduct = products.find(p => {
            const title = p.node.title.toLowerCase();
            // Ensure we just find the main product, not anything starting with it that might be different
            return title.includes("crypto brain");
        });

        if (!xrpProduct) {
            console.error("XRP Product NOT FOUND in Templates.tsx. Available products:", products.map(p => p.node.title));
            toast.error("Product 'Crypto Brain' not found.");
            return;
        }

        const variant = xrpProduct.node.variants.edges[0]?.node;
        if (!variant) {
            toast.error("Product has no variants.");
            return;
        }

        try {
            await addItem({
                product: xrpProduct,
                variantId: variant.id,
                variantTitle: variant.title,
                price: variant.price,
                quantity: 1,
                selectedOptions: []
            });

            toast.success(`Added ${xrpProduct.node.title} to cart`);
            openCart();
        } catch (e) {
            console.error("Add to cart error", e);
            toast.error("Failed to add to cart");
        }
    };

    return <div className="h-screen overflow-y-auto overflow-x-hidden scrollbar-hide bg-[#020C18] relative">
        <ArcticBackground />

        {/* Header with back button */}
        <Header
            onToggleCategories={() => { }}
            showBackButton={true}
            onBack={() => window.history.back()}
        />

        {/* Product Grid */}
        <main className="pt-48">
            <section className="py-16 px-6 md:px-12 bg-transparent w-full relative z-10">
                <div className="max-w-7xl mx-auto mb-10">
                    <h1 className="text-3xl md:text-5xl font-black text-white text-left mb-2">
                        Templates & guides
                    </h1>
                    <p className="text-white/70 text-base md:text-lg max-w-4xl text-left mb-4">
                        Systems for thinking, building, and decision-making.
                    </p>
                </div>


                <div className="max-w-7xl mx-auto mt-16">
                    <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] items-start">
                        <div className="space-y-5">
                            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                XRP – Crypto Brain
                            </h2>
                            <p className="text-white/80 text-sm md:text-base leading-relaxed">
                                Organize your research, track real-time prices, and build long-term conviction with this all-in-one XRP workspace.
                            </p>
                            <ul className="text-white/90 text-sm md:text-base space-y-2 list-disc list-inside">
                                <li>Live price tracking</li>
                                <li>Learning resources</li>
                                <li>Investment journal</li>
                                <li>Lifetime updates</li>
                            </ul>
                            <button
                                onClick={handleAddToCart}
                                disabled={productsLoading}
                                className={ctaButtonSmallClassName}
                                style={ctaButtonStyle}
                            >
                                {productsLoading ? "LOADING..." : "BUY NOW"}
                            </button>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-black/40 overflow-hidden">
                            <div className="relative w-full h-[360px] md:h-[420px] overflow-hidden">
                                <iframe
                                    src="https://remarkable-elk-cb3.notion.site/ebd//3033c81b0c1280039033c0357a8fc1cd"
                                    className="absolute inset-0 w-full h-full"
                                    frameBorder={0}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-32 mb-16 px-4">
                    <h2 className="text-3xl md:text-5xl font-black text-white text-center uppercase tracking-tight opacity-50">
                        MORE TEMPLATES COMING SOON
                    </h2>
                </div>
            </section>
        </main>

        <CartDrawer />
    </div>;
}
