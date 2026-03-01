import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Product3DCard from "@/components/Product3DCard";
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
export default function Crypto() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const filteredProducts = cryptoProducts.filter(product => selectedCategory === "All" || product.category === selectedCategory);

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
      console.error("XRP Product NOT FOUND in Crypto.tsx. Available products:", products.map(p => p.node.title));
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-white hover:text-white/70 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="w-6" />
      </div>
    </header>

    {/* Product Grid */}
    <main className="pt-24">
      <section className="py-16 px-6 md:px-12 bg-transparent w-full relative z-10">
        <div className="max-w-7xl mx-auto mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-white text-left mb-2">
            Templates & guides
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-4xl text-left mb-4">
            Systems for thinking, building, and decision-making.
          </p>
          <p className="text-3xl md:text-5xl font-black text-white text-left uppercase tracking-[0.2em]">
            Coming soon
          </p>
        </div>
        <div className="max-w-7xl mx-auto mb-12">
          <div className="flex flex-wrap gap-4">
            {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full text-xs md:text-sm font-display font-bold tracking-widest uppercase border transition-colors
                    ${selectedCategory === category ? "text-white border-white/60 bg-white/10" : "text-white/60 border-white/20 hover:text-white hover:border-white/50"}`}>
              {category}
            </button>)}
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product, index) => <motion.div key={product.id} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.1
            }} className="flex flex-col items-center">
              <Product3DCard className="w-full rounded-3xl border border-white/10 bg-black/80 p-4">
                <div className="relative w-full aspect-square mb-6">
                  <img
                    src="/placeholder.svg"
                    alt={product.name}
                    className="w-full h-full object-contain drop-shadow-2xl"
                    style={{
                      filter: "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))",
                    }}
                  />
                </div>
              </Product3DCard>
              <h3 className="font-display font-medium text-lg tracking-widest text-white/90 uppercase text-center mt-2">
                {product.id}
              </h3>
              <p className="text-white/50 text-xs uppercase tracking-widest mt-2 text-center">
                {product.name}
              </p>
              <p className="text-white/70 text-xs uppercase tracking-widest mt-1 text-center">
                {product.price}
              </p>
            </motion.div>)}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] items-start">
            <div className="space-y-5">
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                XRP – <span className="text-cyan-400">Crypto Brain</span>
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
      </section>
    </main>

    <CartDrawer />

    {/* Full-page coming soon overlay */}
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-[0.3em]">
          Coming soon
        </h1>
        <p className="text-white/70 text-sm md:text-base max-w-md">
          Templates OS and guides will be available here soon.
        </p>
        <Link
          to="/"
          className={ctaButtonSmallClassName}
          style={ctaButtonStyle}
        >
          Back to main page
        </Link>
      </div>
    </div>
  </div>;
}