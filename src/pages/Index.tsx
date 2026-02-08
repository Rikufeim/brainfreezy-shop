import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
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

function IndexContent() {
  const [cookieBannerOpen, setCookieBannerOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [service, setService] = useState("");
  const syncCart = useCartStore((state) => state.syncCart);

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

      {/* Seamless Integrated Background - covers entire page */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
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
          filter: "brightness(1.6)",
        }}
      />

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
              Mental cold shock
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg md:text-xl text-white/70 max-w-xl"
            >
              Reset your focus, sharpen your edge, and build with clarity.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/crypto"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-white font-black text-sm tracking-widest uppercase
                           border-2 border-zinc-800 shadow-[5px_5px_0px_0px_#27272a]
                           hover:shadow-[7px_7px_0px_0px_#27272a] hover:-translate-y-1 hover:-translate-x-1
                           active:shadow-[0px_0px_0px_0px_#27272a] active:translate-y-2 active:translate-x-2
                           transition-all duration-150 bg-black"
              >
                Use templates
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-white font-black text-sm tracking-widest uppercase
                           border-2 border-zinc-800 shadow-[5px_5px_0px_0px_#27272a]
                           hover:shadow-[7px_7px_0px_0px_#27272a] hover:-translate-y-1 hover:-translate-x-1
                           active:shadow-[0px_0px_0px_0px_#27272a] active:translate-y-2 active:translate-x-2
                           transition-all duration-150 bg-black"
              >
                START WINNING
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <img
              src={icyMascot}
              alt="ICY"
              className="w-48 h-48 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <div className="relative z-10 w-full overflow-hidden">
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
      <section className="relative z-10 w-full py-16 px-6 md:px-12">
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
                className="px-6 py-3 rounded-md border border-white/40 text-white text-sm font-bold tracking-widest uppercase hover:bg-white/10 transition-colors"
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
