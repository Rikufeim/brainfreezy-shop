"use client"
import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'
import { cn } from '@/lib/utils';
import { Check } from "lucide-react";
import { ctaButtonClassName, ctaButtonFullClassName, ctaButtonStyle } from "@/lib/cta-button";
import vibeCodeVR from "@/assets/vibe-coding-vr.png";
import beymflowLogo from "@/assets/beymflow-logo.png";
import StackedClothingShowcase from "@/components/StackedClothingShowcase";

interface PricingPlan {
    name: string;
    price: number;
    description: string;
    features: string[];
    cta: string;
    accent: string;
    isPopular?: boolean;
}

const plans: PricingPlan[] = [
    {
        name: "ICE — CREATIVE MODE",
        price: 149,
        description: "Turn ideas into product",
        features: [
            "Creative system foundations",
            "Learn to use Beymflow (vibe coding app)",
            "Prompting for builders & creators",
            "Landing Page Method"
        ],
        cta: "START ICE",
        accent: "bg-cyan-500", // Bright blue/cyan for ICE
    },
    {
        name: "ELITE - Money Mode",
        price: 199,
        description: "Multiply your sales skill",
        features: [
            "Design a sellable system",
            "Execute sales with structure",
            "Learn to use GoldenClose (sales/pipeline app)",
            "Automation frameworks for scale"
        ],
        cta: "ACTIVATE ELITE",
        accent: "bg-purple-500", // Purple for ELITE
        isPopular: true
    }
];

// Counter Component
const Counter = ({ from, to }: { from: number; to: number }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    React.useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;
        const controls = animate(from, to, {
            duration: 1,
            onUpdate(value) {
                node.textContent = value.toFixed(0);
            },
        });
        return () => controls.stop();
    }, [from, to]);
    return <span ref={nodeRef} />;
};

// Header Component
const PricingHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="text-center mb-10 relative z-10 p-4">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
        >
            <h1 className="text-3xl md:text-5xl font-black text-white 
                bg-black px-6 py-3 rounded-xl border-4 border-zinc-800
                shadow-[6px_6px_0px_0px_#27272a]
                transform transition-transform hover:-translate-y-1 hover:-translate-x-1 mb-2 relative">
                {title}
            </h1>
        </motion.div>
        <p className="text-zinc-500 font-bold text-lg mt-3">{subtitle ?? "Lifetime Access. One-time payment."}</p>
    </div>
);

// Pricing Card Component
const PricingCard = ({
    plan,
    index
}: {
    plan: PricingPlan;
    index: number
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 15, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            style={{
                rotateX,
                rotateY,
                perspective: 1000,
            }}
            onMouseMove={(e) => {
                if (!cardRef.current) return;
                const rect = cardRef.current.getBoundingClientRect();
                const centerX = rect.x + rect.width / 2;
                const centerY = rect.y + rect.height / 2;
                mouseX.set((e.clientX - centerX) / rect.width);
                mouseY.set((e.clientY - centerY) / rect.height);
            }}
            onMouseLeave={() => {
                mouseX.set(0);
                mouseY.set(0);
            }}
            className="relative w-full bg-black rounded-xl p-6 border-4 border-zinc-800
                shadow-[6px_6px_0px_0px_#27272a]
                hover:shadow-[10px_10px_0px_0px_#27272a]
                hover:-translate-y-1 hover:-translate-x-1
                transition-all duration-200"
        >
            {/* Price Badge */}
            <motion.div
                className="absolute -top-5 -right-5 w-20 h-20 
                    rounded-full flex items-center justify-center border-4 border-zinc-800 bg-black
                    shadow-[3px_3px_0px_0px_#27272a]"
                animate={{
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <div className="text-center text-white">
                    <div className="text-xl font-black">€
                        <Counter from={0} to={plan.price} />
                    </div>
                </div>
            </motion.div>

            {/* Plan Name */}
            <div className="mb-4 mt-1">
                <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tight">{plan.name}</h3>
                <p className="text-zinc-500 font-medium text-base">{plan.description}</p>
            </div>

            {/* Popular Badge */}
            {plan.isPopular && (
                <div className="mb-4">
                    <motion.span
                        className="inline-block px-3 py-0.5 text-white
                            font-bold rounded-md text-xs border-2 border-zinc-800 bg-zinc-900
                            shadow-[3px_3px_0px_0px_#27272a]"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        MOST POPULAR
                    </motion.span>
                </div>
            )}

            {/* Features List */}
            <div className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                    <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="flex items-center gap-2 p-2 bg-black rounded-lg border-2 border-zinc-900
                            hover:border-zinc-700 hover:shadow-[3px_3px_0px_0px_#27272a] transition-all"
                    >
                        <div className="w-5 h-5 rounded flex items-center justify-center
                            text-white font-bold text-[10px] border border-zinc-800
                            shadow-[1.5px_1.5px_0px_0px_#27272a]">
                            <Check className="w-3 h-3 text-zinc-400" />
                        </div>
                        <span className="text-zinc-300 font-bold text-sm">{feature}</span>
                    </motion.div>
                ))}
            </div>

            {/* CTA Button */}
            <motion.button
                className={ctaButtonFullClassName}
                style={ctaButtonStyle}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
            >
                {plan.cta}
            </motion.button>
        </motion.div>
    );
};

// Main Export
export default function Pricing() {
    return (
        <div className="w-full py-12 px-4 md:px-8 relative min-h-screen flex flex-col items-center overflow-x-hidden scrollbar-hide">


            {/* Vibe Code Quote Section */}
            <div className="w-full max-w-6xl mx-auto text-center relative z-10 px-4 mb-24">
                <h3 className="text-2xl md:text-3xl font-black text-white leading-snug uppercase tracking-tight mb-16">
                    When you learn the Vibe Code, you don’t follow trends — <br className="hidden md:block" />
                    <span className="text-zinc-500">you build, launch, and sell faster than everyone else.</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left mb-16 max-w-5xl mx-auto">
                    {/* Vibe Coding Image */}
                    <div className="relative transform hover:scale-105 transition-all duration-500 w-full flex items-center justify-center">
                        <img
                            src={vibeCodeVR}
                            alt="Vibe Coding VR"
                            className="w-full max-w-md h-auto object-contain"
                        />
                    </div>

                    {/* Vibe Code Points */}
                    <div className="space-y-8">
                        <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Vibe Code teaches you:</h4>
                        <div className="space-y-6">
                            {[
                                { title: "How to build fast", desc: "Create websites, stores, and systems with AI & prompts" },
                                { title: "How to launch clean", desc: "Publish without technical friction or delays" },
                                { title: "How to scale solo", desc: "Grow income without a team or complexity" }
                            ].map((item, i) => (
                                <div key={i} className="border-l-2 border-zinc-900 pl-6 hover:border-zinc-500 transition-all duration-300 group">
                                    <span className="block text-white font-bold uppercase text-sm mb-1 tracking-wider group-hover:translate-x-1 transition-transform">{item.title}</span>
                                    <p className="text-zinc-400 text-lg leading-snug">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-48">
                    <a
                        href="#"
                        className={`${ctaButtonClassName} cursor-not-allowed opacity-80`}
                        style={ctaButtonStyle}
                        onClick={(e) => e.preventDefault()}
                    >
                        VIBE CODE - BRAIN COMING SOON
                    </a>
                </div>



                {/* Beymflow Section */}
                <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10 px-4 mb-48">
                    {/* Beymflow Image */}
                    <div className="relative order-2 flex items-center justify-center">
                        <img
                            src={beymflowLogo}
                            alt="Beymflow Logo"
                            className="w-full max-w-md h-auto object-contain"
                        />
                    </div>

                    {/* Text Side */}
                    <div className="space-y-6 order-1 text-left">
                        <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                            Beymflow — Vibe Coding
                        </h3>
                        <p className="text-zinc-400 text-xl font-medium leading-relaxed">
                            Beymflow is a creative app built to keep you in flow while you build.
                        </p>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            It combines a prompt generator, a Color Codes, and a living landing page library into one focused workspace — so you can move from idea to implementation without context switching.
                        </p>
                        <div>
                            <a
                                href="https://beymflow.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={ctaButtonFullClassName}
                                style={ctaButtonStyle}
                            >
                                START VIBE CODING
                            </a>
                        </div>
                    </div>

                </div>

                {/* Current Hero (moved below content sections) */}
                <div className="flex h-screen items-center justify-center px-4 relative z-10 mb-24">
                    <StackedClothingShowcase />
                </div>

            </div>
        </div>
    );
}
