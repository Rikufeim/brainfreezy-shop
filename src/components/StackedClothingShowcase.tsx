import { useRef } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import brainfreezyLogo from "@/assets/brainfreezy-logo-official.png";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Button } from "@/components/ui/button";

// Navigation safe zone heights
const NAV_SAFE_HEIGHT_DESKTOP = 96; // pixels
const NAV_SAFE_HEIGHT_MOBILE = 72; // pixels

function Logo3D() {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-20px", "20px"]);
    const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["20px", "-20px"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="perspective-distant transform-3d">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, translateX, translateY }}
                initial={{ scale: 1, z: 0 }}
                whileHover={{ scale: 1.05, z: 50, transition: { duration: 0.2 } }}
                className="relative w-64 md:w-[380px] cursor-pointer"
            >
                <img
                    loading="lazy"
                    className="h-full w-full object-contain"
                    alt="Brain Freezy Logo"
                    src={brainfreezyLogo}
                    style={{ filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))" }}
                />
            </motion.div>
        </div>
    );
}

// Stack positions for right-side pile - 3 ITEMS (Horizontal spread, slight overlap)
const STACK_POSITIONS = [
    { x: 0, y: 40, rotate: -5, z: 30 },    // Item 1 (Left)
    { x: 90, y: 0, rotate: 3, z: 20 },    // Item 2 (Center)
    { x: 180, y: 50, rotate: -4, z: 10 },    // Item 3 (Right)
];

export default function StackedClothingShowcase() {
    const navigate = useNavigate();
    const { products } = useShopifyProducts(50);

    // Filter to get clothing products (not accessories)
    const clothingProducts = products.filter(p => {
        const handle = p.node.handle.toLowerCase();
        const title = p.node.title.toLowerCase();
        return !handle.includes('case') &&
            !handle.includes('beanie') &&
            !handle.includes('patch') &&
            !title.includes('case') &&
            !title.includes('beanie') &&
            !title.includes('patch');
    });

    // Get only 3 clothing items for a clean stack
    const maxItems = 3;
    const displayItems = clothingProducts.slice(0, maxItems);

    return (
        <div className="flex flex-col items-center w-full min-h-screen">
            {/* Desktop Layout: Logo Left + Products Right */}
            <div className="hidden md:flex items-center justify-between w-full max-w-7xl px-8"
                style={{ paddingTop: `${NAV_SAFE_HEIGHT_DESKTOP + 40}px` }}>

                {/* LEFT SIDE: Logo + Shop All Button */}
                <div className="flex flex-col items-center gap-8 flex-shrink-0 ml-8 lg:ml-16">
                    <Logo3D />

                    {/* UNLOCK ACCESS Button - Below Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <motion.button
                            onClick={() => navigate("/templates")}
                            className="px-8 py-4 rounded-lg text-white font-black text-xl tracking-widest uppercase
                                border-2 border-zinc-800 shadow-[5px_5px_0px_0px_#27272a]
                                hover:shadow-[7px_7px_0px_0px_#27272a] hover:-translate-y-1 hover:-translate-x-1
                                active:shadow-[0px_0px_0px_0px_#27272a] active:translate-y-2 active:translate-x-2
                                transition-all duration-150"
                            style={{
                                background: "linear-gradient(135deg, #000000 0%, #00000090 10%, #000000 25%, #00000080 40%, #63636345 55%, #63636325 70%, #f3f3f330 85%, #000000 100%)",
                                filter: "brightness(1.05)",
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            USE TEMPLATES
                        </motion.button>
                    </motion.div>
                </div>

                {/* RIGHT SIDE: Product Stack + Shop All Button */}
                <div className="flex flex-col items-center gap-12 flex-shrink-0 mr-8 lg:mr-16">
                    {/* Products Container ... existing code ... */}
                    <div
                        className="relative"
                        style={{
                            width: '380px',
                            height: '280px',
                        }}
                    >
                        {displayItems.map((product, index) => {
                            const imageUrl = product.node.images.edges[0]?.node.url;
                            const handle = product.node.handle;
                            const pos = STACK_POSITIONS[index] || STACK_POSITIONS[0];

                            // Simple hover effect: Scale up
                            return (
                                <Link
                                    key={product.node.id}
                                    to={`/shop?product=${handle}`}
                                    aria-label={`Buy ${product.node.title}`}
                                    className="group absolute"
                                    style={{
                                        left: `${pos.x}px`,
                                        top: `${pos.y}px`,
                                        transform: `rotate(${pos.rotate}deg)`,
                                        zIndex: pos.z,
                                    }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            delay: index * 0.1,
                                            duration: 0.5,
                                            ease: "easeOut"
                                        }}
                                        whileHover={{
                                            scale: 1.15,
                                            rotate: 0,
                                            zIndex: 100, // Bring to front on hover
                                            transition: { duration: 0.2 }
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={product.node.title}
                                            className="w-40 h-40 lg:w-44 lg:h-44 object-contain pointer-events-none select-none"
                                            style={{
                                                filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))",
                                            }}
                                        />
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Shop All Button - Below Products */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <motion.button
                            onClick={() => navigate("/shop")}
                            className="px-8 py-3 rounded-lg text-white font-black text-lg tracking-widest uppercase
                                border-2 border-zinc-800 shadow-[5px_5px_0px_0px_#27272a]
                                hover:shadow-[7px_7px_0px_0px_#27272a] hover:-translate-y-1 hover:-translate-x-1
                                active:shadow-[0px_0px_0px_0px_#27272a] active:translate-y-2 active:translate-x-2
                                transition-all duration-150"
                            style={{
                                background: "linear-gradient(135deg, #000000 0%, #00000090 10%, #000000 25%, #00000080 40%, #63636345 55%, #63636325 70%, #f3f3f330 85%, #000000 100%)",
                                filter: "brightness(1.05)",
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Shop All
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Mobile Layout: Logo + Button + Stack */}
            <div className="md:hidden flex flex-col items-center gap-8 w-full px-4"
                style={{ paddingTop: `${NAV_SAFE_HEIGHT_MOBILE + 20}px` }}>

                {/* Mobile Logo */}
                <Logo3D />

                {/* Shop All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <motion.button
                        onClick={() => navigate("/shop")}
                        className="px-6 py-2 rounded-lg text-white font-black text-sm tracking-widest uppercase
                            border-2 border-zinc-800 shadow-[3px_3px_0px_0px_#27272a]
                            hover:shadow-[5px_5px_0px_0px_#27272a] hover:-translate-y-1 hover:-translate-x-1
                            active:shadow-[0px_0px_0px_0px_#27272a] active:translate-y-1 active:translate-x-1
                            transition-all duration-150"
                        style={{
                            background: "linear-gradient(135deg, #000000 0%, #00000090 10%, #000000 25%, #00000080 40%, #63636345 55%, #63636325 70%, #f3f3f330 85%, #000000 100%)",
                            filter: "brightness(1.05)",
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Shop All
                    </motion.button>
                </motion.div>

                {/* Mobile Stack (smaller) */}
                <div
                    className="relative flex-shrink-0"
                    style={{
                        width: '160px',
                        height: '220px',
                    }}
                >
                    {displayItems.map((product, index) => {
                        const imageUrl = product.node.images.edges[0]?.node.url;
                        const handle = product.node.handle;
                        // Scaled positions for mobile
                        const mobilePos = {
                            x: STACK_POSITIONS[index].x * 0.7,
                            y: STACK_POSITIONS[index].y * 0.7,
                            rotate: STACK_POSITIONS[index].rotate,
                            z: STACK_POSITIONS[index].z,
                        };

                        return (
                            <Link
                                key={product.node.id}
                                to={`/shop?product=${handle}`}
                                aria-label={`Buy ${product.node.title}`}
                                className="group absolute"
                                style={{
                                    left: `${mobilePos.x}px`,
                                    top: `${mobilePos.y}px`,
                                    transform: `rotate(${mobilePos.rotate}deg)`,
                                    zIndex: mobilePos.z,
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.5,
                                        ease: "easeOut"
                                    }}
                                    whileTap={{
                                        scale: 1.15,
                                        rotate: 0,
                                        zIndex: 100,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    <img
                                        src={imageUrl}
                                        alt={product.node.title}
                                        className="w-28 h-28 object-contain pointer-events-none select-none"
                                        style={{
                                            filter: "drop-shadow(0 8px 20px rgba(0, 0, 0, 0.4))",
                                        }}
                                    />
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
