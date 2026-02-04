import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CookieBannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CookieBanner({ open, onOpenChange }: CookieBannerProps) {
  const [strictlyNecessary] = useState(true);
  const [targetedAnalytics, setTargetedAnalytics] = useState(false);
  const [strictlyOpen, setStrictlyOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  const handleAcceptAll = () => {
    setTargetedAnalytics(true);
    localStorage.setItem('cookie-preferences', JSON.stringify({ strictlyNecessary: true, targetedAnalytics: true }));
    onOpenChange(false);
  };

  const handleRejectAll = () => {
    setTargetedAnalytics(false);
    localStorage.setItem('cookie-preferences', JSON.stringify({ strictlyNecessary: true, targetedAnalytics: false }));
    onOpenChange(false);
  };

  const handleAcceptCurrent = () => {
    localStorage.setItem('cookie-preferences', JSON.stringify({ strictlyNecessary, targetedAnalytics }));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-black text-white border-white/20 p-0 gap-0">
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4">
          <DialogTitle className="font-display text-sm font-bold tracking-widest text-white">
            MANAGE COOKIE PREFERENCES
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="text-white hover:bg-white/10 -mr-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="px-6 pb-6 overflow-hidden">
          {/* Description */}
          <p className="text-white/60 text-xs leading-relaxed tracking-wide uppercase mb-6">
            IN THIS PANEL YOU CAN EXPRESS SOME PREFERENCES RELATED TO THE PROCESSING 
            OF YOUR PERSONAL INFORMATION. YOU MAY REVIEW AND CHANGE EXPRESSED CHOICES 
            AT ANY TIME BY RESURFACING THIS PANEL VIA THE PROVIDED LINK. TO DENY YOUR 
            CONSENT TO THE SPECIFIC PROCESSING ACTIVITIES DESCRIBED BELOW, SWITCH THE 
            TOGGLES TO OFF OR USE THE "REJECT ALL" BUTTON AND CONFIRM YOU WANT TO 
            SAVE YOUR CHOICES.
          </p>

          {/* Cookie Options */}
          <div className="space-y-3 mb-6">
            {/* Strictly Necessary */}
            <Collapsible open={strictlyOpen} onOpenChange={setStrictlyOpen}>
              <div className="border border-white/20 rounded-sm">
                <div className="flex items-center justify-between p-4">
                  <CollapsibleTrigger className="flex items-center gap-3 flex-1">
                    <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${strictlyOpen ? 'rotate-180' : ''}`} />
                    <span className="font-display text-xs font-bold tracking-widest text-white">
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
                    <span className="font-display text-xs font-bold tracking-widest text-white">
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
                      className="data-[state=checked]:bg-white/30 data-[state=unchecked]:bg-white/20"
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
          </div>

          {/* More Information */}
          <div className="border-l-2 border-white/20 pl-4 mb-6">
            <h3 className="font-display text-xs font-bold tracking-widest text-white mb-2">
              MORE INFORMATION
            </h3>
            <p className="text-white/60 text-xs tracking-wide uppercase">
              FOR ANY QUERIES IN RELATION TO MY POLICY ON COOKIES AND YOUR CHOICES, 
              PLEASE{" "}
              <button 
                onClick={() => {
                  onOpenChange(false);
                  window.location.href = '/contact';
                }}
                className="text-white hover:text-white/70 transition-colors underline"
              >
                CONTACT US
              </button>
            </p>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="border-t border-white/10 p-4 md:p-6">
          <div className="flex flex-wrap gap-3 justify-between">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
