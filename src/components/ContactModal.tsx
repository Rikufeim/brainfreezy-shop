import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Topic = "custom-web-app" | "custom-landing-page" | "custom-tracker" | null;

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-black text-white border-white/20 p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="font-display text-sm font-bold tracking-widest text-white">
            CONTACT
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 overflow-hidden">
          {/* All Sales Final */}
          <div className="mb-6">
            <h2 className="font-display text-xs font-bold tracking-widest text-white mb-3">
              ALL SALES FINAL
            </h2>
            <p className="text-white/60 text-xs leading-relaxed tracking-wide uppercase">
              ALL SALES ARE FINAL DUE TO THE LOW COST OF GOODS. WE DO NOT OFFER
              RETURNS OR EXCHANGES. PLEASE REVIEW YOUR ORDER CAREFULLY BEFORE
              COMPLETING YOUR PURCHASE.
            </p>
          </div>

          {/* Order Issues */}
          <div className="mb-6">
            <h2 className="font-display text-xs font-bold tracking-widest text-white mb-3">
              ORDER ISSUES
            </h2>
            <p className="text-white/60 text-xs leading-relaxed tracking-wide uppercase">
              IF AN ITEM IS INCORRECT OR DEFECTIVE, EMAIL US AT{" "}
              <a
                href="mailto:rick@multiply-vision.com"
                className="text-white hover:text-white/80 transition-colors"
              >
                RICK@MULTIPLY-VISION.COM
              </a>{" "}
              AND WE WILL TAKE RESPONSIBILITY AND RESOLVE IT PROMPTLY.
            </p>
            <p className="text-white/60 text-xs leading-relaxed tracking-wide uppercase mt-4">
              PLEASE INCLUDE YOUR ORDER NUMBER AND A BRIEF DESCRIPTION.
            </p>
          </div>

          {/* Signature */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-white/50 text-xs tracking-widest">
              —<br />
              BRAINFREEZY
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 p-4 md:p-6">
          <div className="flex flex-wrap gap-3 justify-between">
            <Button
              type="button"
              onClick={onClose}
              className="bg-white text-black hover:bg-white/90 font-display text-xs tracking-widest px-6"
            >
              CANCEL
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 font-display text-xs tracking-widest px-6"
            >
              CLOSE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
