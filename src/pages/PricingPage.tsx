import Pricing from "@/components/Pricing";
import Header from "@/components/Header";
// Footer is implemented inline
import CartDrawer from "@/components/CartDrawer";
import CookieBanner from "@/components/CookieBanner";
import ContactModal from "@/components/ContactModal";
import { useNavigate } from "react-router-dom";
import icyMascot from "@/assets/icy-mascot.png";
import { useState } from "react";

export default function PricingPage() {
    const [cookieBannerOpen, setCookieBannerOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const navigate = useNavigate();

    const seamlessBackground = {
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
    };

    return (
        <div
            className="h-screen w-full bg-black text-white relative flex flex-col overflow-y-auto scrollbar-hide"
        >
            {/* Seamless Background */}
            <div className="fixed inset-0 pointer-events-none z-0" style={seamlessBackground} />
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
            <CookieBanner
                open={cookieBannerOpen}
                onOpenChange={setCookieBannerOpen}
                onContact={() => setContactOpen(true)}
            />
            <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

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
        </div>
    );
}
