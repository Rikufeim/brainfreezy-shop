import Pricing from "@/components/Pricing";
import Header from "@/components/Header";
// Footer is implemented inline
import CartDrawer from "@/components/CartDrawer";
import CookieBanner from "@/components/CookieBanner";
import ContactModal from "@/components/ContactModal";
import { useNavigate } from "react-router-dom";
import icyMascot from "@/assets/icy-mascot.png";
import { useState } from "react";
import { Youtube } from "lucide-react";
import ArcticBackground from "@/components/ArcticBackground";

export default function PricingPage() {
    const [cookieBannerOpen, setCookieBannerOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div
            className="h-screen w-full bg-[#020C18] text-white relative flex flex-col overflow-y-auto scrollbar-hide"
        >
            <ArcticBackground />
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
                        <div className="md:hidden flex flex-col items-center gap-4 mb-4">
                            <img
                                src={icyMascot}
                                alt="ICY"
                                className="w-24 h-24 object-contain"
                            />
                            <div className="flex items-center gap-4">
                                <a
                                    href="https://www.tiktok.com/@brainfreezynow"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="TikTok"
                                    className="text-white/50 hover:text-white transition-colors duration-300"
                                >
                                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.youtube.com/@Brainfreezynow"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="YouTube"
                                    className="text-white/50 hover:text-white transition-colors duration-300"
                                >
                                    <Youtube className="w-6 h-6" />
                                </a>
                            </div>
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

                        {/* Social icons + logo - right side on desktop */}
                        <div className="hidden md:flex items-center justify-end gap-4">
                            <a
                                href="https://www.tiktok.com/@brainfreezynow"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                                className="text-white/50 hover:text-white transition-colors duration-300"
                            >
                                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.youtube.com/@Brainfreezynow"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                className="text-white/50 hover:text-white transition-colors duration-300"
                            >
                                <Youtube className="w-6 h-6" />
                            </a>
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
