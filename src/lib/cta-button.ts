/**
 * Shared CTA button styling - matches USE TEMPLATES / SHOP ALL design:
 * Glossy metallic gradient, light grey border, shadow + hover/active states
 */
export const ctaButtonClassName =
  "inline-flex items-center justify-center px-8 py-4 rounded-lg text-white font-black text-sm md:text-xl tracking-widest uppercase " +
  "border-2 border-zinc-800 shadow-[5px_5px_0px_0px_#27272a] " +
  "hover:shadow-[7px_7px_0px_0px_#27272a] hover:-translate-y-1 hover:-translate-x-1 " +
  "active:shadow-[0px_0px_0px_0px_#27272a] active:translate-y-2 active:translate-x-2 " +
  "transition-all duration-150";

export const ctaButtonStyle = {
  background:
    "linear-gradient(135deg, #000000 0%, #00000090 10%, #000000 25%, #00000080 40%, #63636345 55%, #63636325 70%, #f3f3f330 85%, #000000 100%)",
  filter: "brightness(1.05)",
};

/** Background only - for non-button elements (e.g. Cover/SHOCK text) */
export const ctaBackgroundStyle = {
  background:
    "linear-gradient(135deg, #000000 0%, #00000090 10%, #000000 25%, #00000080 40%, #63636345 55%, #63636325 70%, #f3f3f330 85%, #000000 100%)",
  filter: "brightness(1.05)",
};

/** Full-width variant for pricing cards etc */
export const ctaButtonFullClassName =
  "w-full flex items-center justify-center px-8 py-4 rounded-lg text-white font-black text-sm md:text-xl tracking-widest uppercase " +
  "border-2 border-zinc-800 shadow-[5px_5px_0px_0px_#27272a] " +
  "hover:shadow-[7px_7px_0px_0px_#27272a] hover:-translate-y-1 hover:-translate-x-1 " +
  "active:shadow-[0px_0px_0px_0px_#27272a] active:translate-y-2 active:translate-x-2 " +
  "transition-all duration-150";

/** Smaller variant for compact layouts (e.g. BUY NOW in cards) */
export const ctaButtonSmallClassName =
  "inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-black text-sm tracking-widest uppercase " +
  "border-2 border-zinc-800 shadow-[5px_5px_0px_0px_#27272a] " +
  "hover:shadow-[7px_7px_0px_0px_#27272a] hover:-translate-y-1 hover:-translate-x-1 " +
  "active:shadow-[0px_0px_0px_0px_#27272a] active:translate-y-2 active:translate-x-2 " +
  "transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[5px_5px_0px_0px_#27272a]";
