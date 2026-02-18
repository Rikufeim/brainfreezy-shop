import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import MountainBackground from "@/components/MountainBackground";
import CartDrawer from "@/components/CartDrawer";
import CookieBanner from "@/components/CookieBanner";
import ContactModal from "@/components/ContactModal";
import icyMascot from "@/assets/icy-mascot.png";
import { useCartStore } from "@/stores/cartStore";
import Pricing from "@/components/Pricing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cover } from "@/components/ui/cover";
import { FrostedTextReveal } from "@/components/ui/frosted-text-reveal";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { toast } from "sonner";

function IndexContent() {
  const [cookieBannerOpen, setCookieBannerOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [service, setService] = useState("");
  const { syncCart, addItem, openCart } = useCartStore();
  const { products, isLoading: productsLoading } = useShopifyProducts(250);

  const handleAddToCart = async () => {
    if (productsLoading) {
      toast.info("Loading products, please wait...");
      return;
    }

    // specific search for XRP product
    // We strictly look for "crypto brain" to avoid matching other XRP merch (like stickers/tees)
    const xrpProduct = products.find(p => {
      const title = p.node.title.toLowerCase();
      return title.includes("crypto brain");
    });

    if (!xrpProduct) {
      console.error("XRP Product NOT FOUND. Available products:", products.map(p => p.node.title));
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

  // Sync cart on visibility change
  useEffect(() => {
    syncCart();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') syncCart();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [syncCart]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen bg-black overflow-y-auto overflow-x-hidden scrollbar-hide"
    >

      {/* Header */}
      <Header
        onToggleCategories={() => { }}
        showBackButton={false}
        onBack={() => { }}
      />

      {/* Mountain Background - sky to mountain panorama */}
      <MountainBackground />

      {/* New Hero */}
      <section className="relative z-10 min-h-screen flex items-center px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight"
            >
              <FrostedTextReveal text="MENTAL COLD" textClassName="text-white font-black uppercase tracking-tight" /> <Cover className="text-white">SHOCK</Cover>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg md:text-xl text-white/70 max-w-xl"
            >
              Everything you need to cool your brain.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/templates"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-white font-black text-sm tracking-widest uppercase
                           border-2 border-cyan-500 shadow-[5px_5px_0px_0px_#0891b2]
                           hover:shadow-[7px_7px_0px_0px_#0891b2] hover:-translate-y-1 hover:-translate-x-1
                           active:shadow-[0px_0px_0px_0px_#0891b2] active:translate-y-2 active:translate-x-2
                           transition-all duration-150"
                style={{ background: "linear-gradient(196deg, #051018 0%, #0c1824 25%, #0891b245 55%, #22d3ee30 85%, #051018 100%)" }}
              >
                USE TEMPLATES
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-white font-black text-sm tracking-widest uppercase
                           border-2 border-cyan-500 shadow-[5px_5px_0px_0px_#0891b2]
                           hover:shadow-[7px_7px_0px_0px_#0891b2] hover:-translate-y-1 hover:-translate-x-1
                           active:shadow-[0px_0px_0px_0px_#0891b2] active:translate-y-2 active:translate-x-2
                           transition-all duration-150"
                style={{ background: "linear-gradient(196deg, #051018 0%, #0c1824 25%, #0891b245 55%, #22d3ee30 85%, #051018 100%)" }}
              >
                SHOP MERCH
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
          </div>
        </div>
      </section>

      {/* Templates OS Section */}
      <section className="relative z-10 w-full py-48 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
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
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-black text-sm tracking-widest uppercase border-2 border-cyan-500 shadow-[5px_5px_0px_0px_#0891b2] hover:shadow-[7px_7px_0px_0px_#0891b2] hover:-translate-y-1 hover:-translate-x-1 active:shadow-[0px_0px_0px_0px_#0891b2] active:translate-y-2 active:translate-x-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(196deg, #051018 0%, #0c1824 25%, #0891b245 55%, #22d3ee30 85%, #051018 100%)" }}
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

      {/* Pricing Section */}
      <div className="relative z-10 w-full overflow-hidden py-48">
        <Pricing />
      </div>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Cookie Banner */}
      <CookieBanner
        open={cookieBannerOpen}
        onOpenChange={setCookieBannerOpen}
        onContact={() => setContactOpen(true)}
      />

      {/* Contact Modal */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* Contact Section */}
      <section className="relative z-10 w-full pt-24 pb-12 px-6 md:px-12">
        <div className="w-full">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Have a project in mind?
            </h2>
            <p className="text-xl md:text-2xl font-bold text-cyan-300">
              Let’s talk.
            </p>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold tracking-widest text-white/70 mb-2 uppercase">
                Name *
              </label>
              <input
                type="text"
                required
                placeholder="Name *"
                className="w-full rounded-md border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest text-white/70 mb-2 uppercase">
                Email *
              </label>
              <input
                type="email"
                required
                placeholder="Email *"
                className="w-full rounded-md border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest text-white/70 mb-2 uppercase">
                Company
              </label>
              <input
                type="text"
                placeholder="Company"
                className="w-full rounded-md border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold tracking-widest text-white/70 mb-2 uppercase">
                Service *
              </label>
              <Select
                value={service}
                onValueChange={(value) => setService(value === "__none" ? "" : value)}
              >
                <SelectTrigger className="w-full h-12 rounded-md border border-white/20 bg-black/40 text-white focus:ring-white/20">
                  <SelectValue placeholder="Select one..." />
                </SelectTrigger>
                <SelectContent className="border-white/20 bg-black text-white">
                  <SelectItem
                    value="__none"
                    className="focus:bg-white/10 focus:text-white data-[highlighted]:bg-white/10 data-[highlighted]:text-white"
                  >
                    Select one...
                  </SelectItem>
                  <SelectItem
                    value="custom-landing-page"
                    className="focus:bg-white/10 focus:text-white data-[highlighted]:bg-white/10 data-[highlighted]:text-white"
                  >
                    Custom Landing Page
                  </SelectItem>
                  <SelectItem
                    value="web-app"
                    className="focus:bg-white/10 focus:text-white data-[highlighted]:bg-white/10 data-[highlighted]:text-white"
                  >
                    Web App
                  </SelectItem>
                  <SelectItem
                    value="personal-tracker"
                    className="focus:bg-white/10 focus:text-white data-[highlighted]:bg-white/10 data-[highlighted]:text-white"
                  >
                    Personal Tracker
                  </SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" name="service" value={service} required />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold tracking-widest text-white/70 mb-2 uppercase">
                Tell us more about your project *
              </label>
              <textarea
                required
                rows={5}
                placeholder="Tell us more about your project"
                className="w-full rounded-md border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-xs font-bold tracking-widest text-white/70 mb-2 uppercase">
                Attachments
              </label>
              <div className="h-full min-h-[96px] rounded-md border border-dashed border-white/20 bg-black/40 px-4 py-4 text-white/70 flex items-center justify-center text-sm">
                Additional info (PDF, DOC)
              </div>
            </div>

            <div className="md:col-span-1 flex items-end">
              <div className="w-full rounded-md border-l-4 border-cyan-300/70 bg-black/40 px-4 py-4 text-xs text-white/60">
                This form collects your contact information so that we can correspond with you.
                Check out our privacy policy for more information about how we protect and manage your data.
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-md border-2 border-cyan-500 text-white text-sm font-bold tracking-widest uppercase transition-all duration-150 shadow-[5px_5px_0px_0px_#0891b2] hover:shadow-[7px_7px_0px_0px_#0891b2] hover:-translate-y-1 hover:-translate-x-1 active:shadow-none active:translate-y-2 active:translate-x-2"
                style={{ background: "linear-gradient(196deg, #051018 0%, #0c1824 25%, #0891b245 55%, #22d3ee30 85%, #051018 100%)" }}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 bg-transparent w-full relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
            {/* Mascot - shown first on mobile */}
            <div className="md:hidden flex justify-center mb-4">
              <img
                src={icyMascot}
                alt="ICY"
                className="w-24 h-24 object-contain"
              />
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 flex-1">
              <button
                onClick={() => setContactOpen(true)}
                className="text-base md:text-xl font-display font-bold tracking-widest text-white/50 hover:text-white transition-colors duration-300"
              >
                CONTACT
              </button>
              <button
                onClick={() => setCookieBannerOpen(true)}
                className="text-base md:text-xl font-display font-bold tracking-widest text-white/50 hover:text-white transition-colors duration-300"
              >
                COOKIES
              </button>
            </div>

            {/* Mascot - shown on right for desktop */}
            <div className="hidden md:flex justify-end">
              <img
                src={icyMascot}
                alt="ICY"
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

const Index = () => {
  return <IndexContent />;
};

export default Index;
