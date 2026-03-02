import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import CookieBanner from "@/components/CookieBanner";
import ContactModal from "@/components/ContactModal";
import icyMascot from "@/assets/icy-mascot.png";
import { useCartStore } from "@/stores/cartStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { toast } from "sonner";
import { Youtube } from "lucide-react";
import { ctaButtonSmallClassName, ctaButtonStyle } from "@/lib/cta-button";
import ArcticBackground from "@/components/ArcticBackground";
import brainfreezyChart from "@/assets/brainfreezy-chart.png";
import { cn } from "@/lib/utils";
import HalideLanding from "@/components/HalideLanding";
import StarfieldBackground from "@/components/StarfieldBackground";
import { VibeCodeDitheringCard } from "@/components/ui/hero-dithering-card";


/* ── tiny CTA (even smaller than ctaButtonSmallClassName) ── */
const miniCtaClass =
  "inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-white font-bold text-xs tracking-widest uppercase " +
  "border border-white/20 backdrop-blur-sm bg-white/5 " +
  "hover:bg-white/10 hover:border-white/30 " +
  "transition-all duration-200";

/* ── Hero Section wrapper ── */
function HeroSection({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative z-10 min-h-screen flex flex-col justify-end px-6 md:px-12 pb-16 md:pb-24 ${className}`}
    >
      {children}
    </section>
  );
}

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
    const xrpProduct = products.find(p => p.node.title.toLowerCase().includes("crypto brain"));
    if (!xrpProduct) {
      toast.error("Product 'Crypto Brain' not found.");
      return;
    }
    const variant = xrpProduct.node.variants.edges[0]?.node;
    if (!variant) { toast.error("Product has no variants."); return; }
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
      <Header onToggleCategories={() => {}} showBackButton={false} onBack={() => {}} />
      <ArcticBackground />

      {/* ═══════════════════════════════════════════
          SECTION 1 — MAIN HERO (video + frosted overlay)
         ═══════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Tähtitaivas koko hero-alueella tasaisesti */}
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          <StarfieldBackground transparentBg sparse />
        </div>
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ filter: "brightness(0.45) saturate(1.2)" }}
        >
          <source src="/hero-video.mov" type="video/mp4" />
        </video>


        {/* Musta fade alaosaan - tekstin luettavuus */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent z-[3]" />

        {/* Content — bottom left */}
        <div className="relative z-[4] px-6 md:px-12 pb-16 md:pb-24 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight mb-4"
          >
            Everything you need to <span className="text-cyan-400">cool your brain</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <Link to="/templates" className={miniCtaClass}>
              USE TEMPLATES
            </Link>
            <Link to="/shop" className={miniCtaClass}>
              SHOP MERCH
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — TEMPLATES
         ═══════════════════════════════════════════ */}
      <HeroSection id="templates">
        <div className="absolute inset-0 z-0 bg-black" aria-hidden="true" />
        <div className="absolute inset-0 z-[0.5]">
          <StarfieldBackground transparentBg sparse />
        </div>
        <div className="max-w-7xl w-full relative z-[1]">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-end">
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight leading-[1.05]"
              >
                XRP — <span className="text-cyan-400">Crypto Brain</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-white/70 text-sm md:text-base leading-relaxed max-w-md"
              >
                Organize your research, track real-time prices, and build long-term conviction with this all-in-one XRP workspace.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <button
                  onClick={handleAddToCart}
                  disabled={productsLoading}
                  className={miniCtaClass}
                >
                  {productsLoading ? "LOADING..." : "BUY NOW"}
                </button>
                <Link to="/crypto" className={miniCtaClass}>
                  LEARN CRYPTO
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden"
            >
              <div className="relative w-full h-[280px] md:h-[360px] overflow-hidden">
                <iframe
                  src="https://remarkable-elk-cb3.notion.site/ebd/3033c81b0c1280039033c0357a8fc1cd"
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </HeroSection>

      {/* ═══════════════════════════════════════════
          SECTION 3 — CRYPTO PORTFOLIO APP
         ═══════════════════════════════════════════ */}
      <HeroSection id="crypto-portfolio" className="overflow-hidden -mt-[12vh] pt-[12vh]">
        {/* Background: harvennettu tähtitaivas */}
        <StarfieldBackground sparse />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 z-[1]" />
        <div className="max-w-xl relative z-[2]">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-4 leading-[1.05]"
          >
            Crypto Portfolio <span className="text-cyan-400">App</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-white/70 text-sm md:text-base mb-7 max-w-md leading-relaxed"
          >
            Everything you need from portfolio tracker.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="https://multiply-vision.com"
              target="_blank"
              rel="noopener noreferrer"
              className={miniCtaClass}
            >
              EXPLORE MULTIPLY
            </a>
          </motion.div>
        </div>
      </HeroSection>

      {/* ═══════════════════════════════════════════
          SECTION 4 — COURSES / PRICING
         ═══════════════════════════════════════════ */}
      <HeroSection id="courses" className="!px-0 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black" aria-hidden="true" />
        <div className="absolute inset-0 z-[0.5]">
          <StarfieldBackground transparentBg sparse />
        </div>
        <div className="flex justify-center items-center w-full relative z-[1]">
          <VibeCodeDitheringCard />
        </div>
      </HeroSection>

      {/* ═══════════════════════════════════════════
          SECTION 5 — VIBE CODE APP (Halide 3D Hero)
         ═══════════════════════════════════════════ */}
      <section id="vibe-code-app" className="relative z-10 min-h-screen w-full overflow-hidden -mt-[12vh] pt-[12vh] bg-black">
        <div className="absolute inset-0 min-h-screen w-full">
          <HalideLanding />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — SHOP
         ═══════════════════════════════════════════ */}
      <section id="shop" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-16 md:py-24">
        <div className="absolute inset-0 z-0 bg-black" aria-hidden="true" />
        <div className="absolute inset-0 z-[0.5]">
          <StarfieldBackground transparentBg sparse />
        </div>

        {/* Centered title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight mb-12 md:mb-16 relative z-[1] text-center"
        >
          Shop <span className="text-cyan-400">Merch</span>
        </motion.h2>

        {/* 3 Featured products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-3 gap-4 md:gap-8 lg:gap-12 mb-12 md:mb-16 relative z-[1] max-w-4xl w-full"
        >
          {products.slice(0, 3).map((product, i) => {
            const imageUrl = product.node.images.edges[0]?.node.url;
            const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
            return (
              <motion.div
                key={product.node.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex flex-col items-center gap-3"
              >
                <Link to="/shop" className="group">
                  <div className="relative overflow-hidden rounded-lg bg-white/5 border border-white/10 p-4 md:p-6 transition-all duration-300 group-hover:border-cyan-400/30 group-hover:bg-white/10">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={product.node.title}
                        className="w-full aspect-square object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <p className="text-white/70 text-xs md:text-sm text-center mt-2 font-medium truncate max-w-full">
                    {product.node.title}
                  </p>
                  <p className="text-cyan-400 text-xs md:text-sm text-center font-bold">
                    €{price.toFixed(0)}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Browse Collection CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative z-[1]"
        >
          <Link to="/shop" className={miniCtaClass}>
            BROWSE COLLECTION
          </Link>
        </motion.div>
      </section>

      {/* Contact section removed */}

      {/* Footer */}
      <footer className="relative py-8 px-6 md:px-12 bg-black w-full z-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <StarfieldBackground transparentBg sparse />
        </div>
        <div className="max-w-7xl mx-auto relative z-[1]">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
            <div className="md:hidden flex flex-col items-center gap-4 mb-4">
              <img src={icyMascot} alt="ICY" className="w-24 h-24 object-contain" />
              <div className="flex items-center gap-4">
                <a href="https://www.tiktok.com/@brainfreezynow" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-white/50 hover:text-white transition-colors duration-300">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                </a>
                <a href="https://www.youtube.com/@Brainfreezynow" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/50 hover:text-white transition-colors duration-300">
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 flex-1">
              <button onClick={() => setContactOpen(true)} className="text-base md:text-xl font-display font-bold tracking-widest text-white/50 hover:text-white transition-colors duration-300">CONTACT</button>
              <button onClick={() => setCookieBannerOpen(true)} className="text-base md:text-xl font-display font-bold tracking-widest text-white/50 hover:text-white transition-colors duration-300">COOKIES</button>
            </div>
            <div className="hidden md:flex items-center justify-end gap-4">
              <a href="https://www.tiktok.com/@brainfreezynow" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-white/50 hover:text-white transition-colors duration-300">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
              </a>
              <a href="https://www.youtube.com/@Brainfreezynow" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/50 hover:text-white transition-colors duration-300">
                <Youtube className="w-6 h-6" />
              </a>
              <img src={icyMascot} alt="ICY" className="w-20 h-20 object-contain" />
            </div>
          </div>
        </div>
      </footer>

      <CartDrawer />
      <CookieBanner open={cookieBannerOpen} onOpenChange={setCookieBannerOpen} onContact={() => setContactOpen(true)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </motion.div>
  );
}

const Index = () => <IndexContent />;
export default Index;
