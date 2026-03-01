import React from "react";
import { Cover } from "@/components/ui/cover";

export default function CoverDemo() {
  return (
    <section className="relative w-full">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
          <span className="text-white">MENTAL COLD </span>
          <Cover className="text-white">SHOCK</Cover>
        </h1>
        <p className="mt-6 text-base md:text-lg text-white/70">
          Everything you need to <span className="text-cyan-400">cool your brain</span>
        </p>
      </div>
    </section>
  );
}
