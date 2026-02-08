import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Product3DCard from "@/components/Product3DCard";
import CartDrawer from "@/components/CartDrawer";
import { useState } from "react";
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
  return <div className="h-screen overflow-y-auto overflow-x-hidden scrollbar-hide bg-black relative">
      {/* Seamless Background - matches Shop/Pricing */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
      background: `
            radial-gradient(ellipse at 20% 180vh, #00323440 0%, #00323418 20%, transparent 50%),
            radial-gradient(ellipse at 80% 150vh, #00000040 0%, #00000018 20%, transparent 50%),
            radial-gradient(ellipse at 50% 200vh, #0b0d5730 0%, #0b0d5712 25%, transparent 55%),
            radial-gradient(ellipse at 30% 170vh, #00151730 0%, #00151712 20%, transparent 45%),
            radial-gradient(ellipse at 20% 40%, #0b0d5740 0%, #0b0d5718 20%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, #00151740 0%, #00151718 20%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, #00000025 0%, #00000010 30%, transparent 65%),
            radial-gradient(circle at 30% 30%, #0b0d5725 0%, #0b0d5710 15%, transparent 35%),
            radial-gradient(circle at 70% 70%, #00151725 0%, #00151710 15%, transparent 35%),
            #000000
          `,
      filter: "brightness(1.6)"
    }} />

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
            <h1 className="text-3xl md:text-5xl font-black text-white text-left mb-4">templates & guides</h1>
            <p className="text-white/70 text-base md:text-lg max-w-4xl text-left"> for thinking, building, and decision-making.</p>
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
                  <Product3DCard className="w-full">
                    <div className="relative w-full aspect-square mb-6">
                      <img src="/placeholder.svg" alt={product.name} className="w-full h-full object-contain drop-shadow-2xl" style={{
                    filter: "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))"
                  }} />
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
        </section>
      </main>

      <CartDrawer />
    </div>;
}