import Pricing from "@/components/Pricing";
import Header from "@/components/Header";
// Footer is implemented inline
import CartDrawer from "@/components/CartDrawer";
import CookieBanner from "@/components/CookieBanner";
import { Link, useNavigate } from "react-router-dom";
import icyMascot from "@/assets/icy-mascot.png";
import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";

export default function PricingPage() {
    const [cookieBannerOpen, setCookieBannerOpen] = useState(false);
    const syncCart = useCartStore((state) => state.syncCart);
    const navigate = useNavigate();

    return (
        <div
            className="h-screen w-full bg-black text-white relative flex flex-col overflow-y-auto scrollbar-hide"
        >
            {/* Header */}
            <Header
                onToggleCategories={() => { }}
                showBackButton={true}
                onBack={() => navigate(-1)}
            />

            {/* Main Content */}
            <main className="flex-grow pt-24 pb-12 flex items-center justify-center">
                <Pricing />
            </main>

            {/* Cart & Cookie Banner */}
            <CartDrawer />
            <CookieBanner open={cookieBannerOpen} onOpenChange={setCookieBannerOpen} />

            {/* Footer */}
            <footer className="py-8 px-6 md:px-12 bg-black w-full relative z-10 border-t border-white/10">
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
                            <Link to="/contact" className="text-base md:text-xl font-display font-bold tracking-widest text-white/50 hover:text-white transition-colors duration-300">CONTACT</Link>
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
        </div>
    );
}
