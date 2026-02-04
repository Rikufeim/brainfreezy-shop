import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const isLoading = useCartStore((state) => state.isLoading);
  const isSyncing = useCartStore((state) => state.isSyncing);
  const closeCart = useCartStore((state) => state.closeCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getCheckoutUrl = useCartStore((state) => state.getCheckoutUrl);
  const syncCart = useCartStore((state) => state.syncCart);
  
  // Calculate totals from items (reactive)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  // Sync cart when drawer opens
  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const formatPrice = (amount: string) => {
    const price = parseFloat(amount);
    return `$${price.toFixed(2)}`;
  };

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      closeCart();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md 
                       bg-black border-l border-white/10 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="font-display text-xl font-bold uppercase tracking-[0.2em]">
                  Your Cart ({totalItems})
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeCart}
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Cart items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-lg mb-2">Your cart is empty</p>
                    <p className="text-muted-foreground text-sm">
                      Add some products to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => {
                      const imageUrl = item.product.node.images?.edges?.[0]?.node?.url;
                      
                      return (
                        <motion.div
                          key={item.variantId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex gap-4 py-4 border-b border-white/10 last:border-b-0"
                        >
                          {/* Image */}
                          {imageUrl && (
                            <div className="w-16 h-16 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                              <img 
                                src={imageUrl} 
                                alt={item.product.node.title} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          )}
                          
                          {/* Product info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display font-semibold text-foreground mb-1 truncate">
                              {item.product.node.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {formatPrice(item.price.amount)}
                            </p>
                            
                            {/* Quantity controls */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                disabled={isLoading}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                disabled={isLoading}
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Remove button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.variantId)}
                            disabled={isLoading}
                            className="text-muted-foreground hover:text-destructive"
                            aria-label="Remove from cart"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-border space-y-4">
                  {/* Total */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-display text-2xl font-bold">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout button */}
                  <Button
                    className="w-full uppercase tracking-[0.2em] font-display"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isLoading || isSyncing}
                  >
                    {isLoading || isSyncing ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <ExternalLink className="w-4 h-4 mr-2" />
                    )}
                    Checkout with Shopify
                  </Button>

                  {/* Clear cart */}
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={clearCart}
                    disabled={isLoading}
                  >
                    Clear Cart
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
