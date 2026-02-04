import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ShoppingBag, ChevronDown, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useCartStore } from "@/stores/cartStore";
import CartDrawer from "@/components/CartDrawer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Cookies() {
  const openCart = useCartStore((state) => state.openCart);
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const [strictlyNecessary] = useState(true);
  const [targetedAnalytics, setTargetedAnalytics] = useState(false);
  const [strictlyOpen, setStrictlyOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  const handleAcceptAll = () => {
    setTargetedAnalytics(true);
    // Save preferences
    localStorage.setItem('cookie-preferences', JSON.stringify({ strictlyNecessary: true, targetedAnalytics: true }));
  };

  const handleRejectAll = () => {
    setTargetedAnalytics(false);
    localStorage.setItem('cookie-preferences', JSON.stringify({ strictlyNecessary: true, targetedAnalytics: false }));
  };

  const handleAcceptCurrent = () => {
    localStorage.setItem('cookie-preferences', JSON.stringify({ strictlyNecessary, targetedAnalytics }));
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" style={{ height: '60px' }} />
        
        <nav className="relative flex items-center justify-between px-6 md:px-8" style={{ height: '60px' }}>
          {/* Back button */}
          <Link to="/">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              aria-label="Go Back"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>

          {/* Cart */}
          <div className="relative">
            <Button
              variant="icon"
              size="icon"
              onClick={openCart}
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </Button>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black rounded-full 
                               flex items-center justify-center text-xs font-bold">
                {totalItems}
              </span>
            )}
          </div>
        </nav>
      </header>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-24 pb-32 px-6 md:px-12"
      >
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-lg md:text-xl font-bold tracking-widest text-white mb-8"
          >
            MANAGE COOKIE PREFERENCES
          </motion.h1>

          {/* Your Privacy Choices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="font-display text-base font-bold tracking-widest text-white mb-4">
              YOUR PRIVACY CHOICES
            </h2>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed tracking-wide uppercase">
              IN THIS PANEL YOU CAN EXPRESS SOME PREFERENCES RELATED TO THE PROCESSING 
              OF YOUR PERSONAL INFORMATION. YOU MAY REVIEW AND CHANGE EXPRESSED CHOICES 
              AT ANY TIME BY RESURFACING THIS PANEL VIA THE PROVIDED LINK. TO DENY YOUR 
              CONSENT TO THE SPECIFIC PROCESSING ACTIVITIES DESCRIBED BELOW, SWITCH THE 
              TOGGLES TO OFF OR USE THE "REJECT ALL" BUTTON AND CONFIRM YOU WANT TO 
              SAVE YOUR CHOICES.
            </p>
          </motion.div>

          {/* Cookie Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 mb-8"
          >
            {/* Strictly Necessary */}
            <Collapsible open={strictlyOpen} onOpenChange={setStrictlyOpen}>
              <div className="border border-white/20 rounded-sm">
                <div className="flex items-center justify-between p-4">
                  <CollapsibleTrigger className="flex items-center gap-3 flex-1">
                    <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${strictlyOpen ? 'rotate-180' : ''}`} />
                    <span className="font-display text-sm font-bold tracking-widest text-white">
                      STRICTLY NECESSARY
                    </span>
                  </CollapsibleTrigger>
                  <Switch 
                    checked={strictlyNecessary} 
                    disabled 
                    className="data-[state=checked]:bg-white/30"
                  />
                </div>
                <CollapsibleContent className="px-4 pb-4">
                  <p className="text-white/50 text-xs tracking-wide uppercase pl-8">
                    THESE COOKIES ARE NECESSARY FOR THE WEBSITE TO FUNCTION AND CANNOT BE SWITCHED OFF.
                  </p>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Targeted Analytics */}
            <Collapsible open={analyticsOpen} onOpenChange={setAnalyticsOpen}>
              <div className="border border-white/20 rounded-sm">
                <div className="flex items-center justify-between p-4">
                  <CollapsibleTrigger className="flex items-center gap-3 flex-1">
                    <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${analyticsOpen ? 'rotate-180' : ''}`} />
                    <span className="font-display text-sm font-bold tracking-widest text-white">
                      TARGETED ANALYTICS
                    </span>
                  </CollapsibleTrigger>
                  <div className="flex items-center gap-2">
                    {!targetedAnalytics && (
                      <X className="w-4 h-4 text-white/40" />
                    )}
                    <Switch 
                      checked={targetedAnalytics} 
                      onCheckedChange={setTargetedAnalytics}
                      className="data-[state=checked]:bg-white/30"
                    />
                  </div>
                </div>
                <CollapsibleContent className="px-4 pb-4">
                  <p className="text-white/50 text-xs tracking-wide uppercase pl-8">
                    THESE COOKIES ALLOW US TO COUNT VISITS AND TRAFFIC SOURCES TO MEASURE AND IMPROVE PERFORMANCE.
                  </p>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </motion.div>

          {/* More Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border-l-2 border-white/20 pl-4 mb-8"
          >
            <h3 className="font-display text-sm font-bold tracking-widest text-white mb-2">
              MORE INFORMATION
            </h3>
            <p className="text-white/60 text-xs tracking-wide uppercase">
              FOR ANY QUERIES IN RELATION TO MY POLICY ON COOKIES AND YOUR CHOICES, 
              PLEASE{" "}
              <Link to="/contact" className="text-white hover:text-white/80 transition-colors underline">
                CONTACT US
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Fixed Bottom Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 p-4 md:p-6"
      >
        <div className="max-w-3xl mx-auto flex flex-wrap gap-3 justify-between">
          <div className="flex gap-3">
            <Button
              onClick={handleAcceptAll}
              className="bg-white text-black hover:bg-white/90 font-display text-xs tracking-widest px-6"
            >
              ACCEPT ALL
            </Button>
            <Button
              onClick={handleRejectAll}
              className="bg-white text-black hover:bg-white/90 font-display text-xs tracking-widest px-6"
            >
              REJECT ALL
            </Button>
          </div>
          <Button
            onClick={handleAcceptCurrent}
            variant="outline"
            className="border-white/40 text-white hover:bg-white/10 font-display text-xs tracking-widest px-6"
          >
            ACCEPT CURRENT SELECTION
          </Button>
        </div>
      </motion.div>

      <CartDrawer />
    </div>
  );
}
