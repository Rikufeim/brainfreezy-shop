import { Product } from "@/types/product";
import sweatshirtBlue from "@/assets/sweatshirt-blue.png";
import hoodieWhite from "@/assets/hoodie-white.png";
import phoneCase from "@/assets/phone-case.png";
import beanie from "@/assets/beanie.png";
import crewneckWhiteScript from "@/assets/crewneck-white-script.png";
import crewneckBlackMelt from "@/assets/crewneck-black-melt.png";
import hoodieBlackMelt from "@/assets/hoodie-black-melt.png";
import tshirtWhiteMelt from "@/assets/tshirt-white-melt.png";
import patchBlackMelt from "@/assets/patch-black-melt.png";

// Mock data generator helper
const createProduct = (id: string, name: string, price: number, category: Product['category'], image?: string): Product => ({
    id,
    name,
    description: "Premium quality item designed for style and comfort.",
    price,
    category,
    image,
    features: ["Premium materials", "Modern fit", "Limited edition"],
});

export const clothingProducts: Product[] = [
    // BRAIN FREEZY COLLECTION
    createProduct("BF-SW-01", "Brain Freezy Crewneck", 80, "clothing", sweatshirtBlue),
    createProduct("BF-SW-02", "Brain Freezy Hoodie", 85, "clothing", hoodieWhite),
    createProduct("BF-SW-03", "Script Crewneck", 80, "clothing", crewneckWhiteScript),
    createProduct("BF-SW-04", "Melt Crewneck", 80, "clothing", crewneckBlackMelt),
    createProduct("BF-SW-05", "Melt Hoodie", 85, "clothing", hoodieBlackMelt),
    createProduct("BF-TS-01", "Melt Tee", 45, "clothing", tshirtWhiteMelt),

    // ACCESSORIES
    createProduct("BF-CASE-01", "Icy Case", 35, "accessory", phoneCase),
    createProduct("BF-BEANIE", "Snow Beanie", 40, "accessory", beanie),
    createProduct("BF-PATCH-01", "Melt Patch", 15, "accessory", patchBlackMelt),
];

export const getProductsByCategory = (category: string) => {
    const normCategory = category.toLowerCase();

    if (normCategory === 'new') return clothingProducts.slice(0, 4);

    if (normCategory === 'mens') {
        return clothingProducts.filter(p => p.category === 'clothing');
    }

    if (normCategory === 'womens') {
        // For now same as mens but could filter differently
        return clothingProducts.filter(p => p.category === 'clothing');
    }

    if (normCategory === 'slides') {
        return clothingProducts.filter(p => p.category === 'slides');
    }

    if (normCategory === 'accessories') {
        return clothingProducts.filter(p => p.category === 'accessory');
    }

    return [];
};
