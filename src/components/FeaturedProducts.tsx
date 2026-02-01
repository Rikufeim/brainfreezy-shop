import { motion } from "framer-motion";
import sweatshirtBlue from "@/assets/sweatshirt-blue.png";
import hoodieWhite from "@/assets/hoodie-white.png";
import phoneCase from "@/assets/phone-case.png";
import beanie from "@/assets/beanie.png";
import crewneckWhiteScript from "@/assets/crewneck-white-script.png";
import crewneckBlackMelt from "@/assets/crewneck-black-melt.png";
import hoodieBlackMelt from "@/assets/hoodie-black-melt.png";
import tshirtWhiteMelt from "@/assets/tshirt-white-melt.png";
import patchBlackMelt from "@/assets/patch-black-melt.png";

const products = [
    {
        id: "BF-SW-01",
        name: "Brain Freezy Crewneck",
        image: sweatshirtBlue,
        price: "$80",
    },
    {
        id: "BF-SW-02",
        name: "Brain Freezy Hoodie",
        image: hoodieWhite,
        price: "$85",
    },
    {
        id: "BF-SW-03",
        name: "Script Crewneck",
        image: crewneckWhiteScript,
        price: "$80",
    },
    {
        id: "BF-SW-04",
        name: "Melt Crewneck",
        image: crewneckBlackMelt,
        price: "$80",
    },
    {
        id: "BF-SW-05",
        name: "Melt Hoodie",
        image: hoodieBlackMelt,
        price: "$85",
    },
    {
        id: "BF-TS-01",
        name: "Melt Tee",
        image: tshirtWhiteMelt,
        price: "$45",
    },
    {
        id: "BF-CASE-01",
        name: "Icy Case",
        image: phoneCase,
        price: "$35",
    },
    {
        id: "BF-BEANIE",
        name: "Snow Beanie",
        image: beanie,
        price: "$40",
    },
    {
        id: "BF-PATCH-01",
        name: "Melt Patch",
        image: patchBlackMelt,
        price: "$15",
    },
];

export default function FeaturedProducts() {
    return (
        <section className="py-24 px-6 md:px-12 bg-black w-full relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center group cursor-pointer"
                        >
                            <div className="relative w-full aspect-square mb-6 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
                                />
                            </div>
                            <h3 className="font-display font-medium text-lg tracking-widest text-white/90 uppercase mb-2">
                                {product.id}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
