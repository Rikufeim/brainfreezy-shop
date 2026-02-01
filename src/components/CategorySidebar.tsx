import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategorySidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectCategory: (category: string) => void;
}

const categories = [
    "NEW",
    "MENS",
    "WOMENS",
    "ACCESSORIES",
];

export default function CategorySidebar({ isOpen, onClose, onSelectCategory }: CategorySidebarProps) {
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
                        onClick={onClose}
                        className="fixed inset-0 z-40 md:hidden"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -250, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed left-0 top-0 bottom-0 z-40 w-64 md:w-80 
                       p-8 pt-32"
                    >
                        <nav className="flex flex-col gap-6">
                            {categories.map((category, index) => (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                >
                                    <button
                                        onClick={() => onSelectCategory(category)} // Keep sidebar open or close it? The prompt says "products come ... on top of hero". Sidebar can stay or go. Let's keep smooth flow. The sidebar is "next to" it.
                                        className="group flex items-center justify-start text-2xl font-display font-bold tracking-widest text-white/50 hover:text-white transition-colors w-full"
                                    >
                                        {category}
                                    </button>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
