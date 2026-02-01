import { Product } from "@/types/product";

export const courses: Product[] = [
  {
    id: "crypto-fundamentals",
    name: "Crypto Fundamentals",
    description: "Master the basics of cryptocurrency, blockchain technology, and decentralized finance. Perfect for beginners.",
    price: 99,
    category: "course",
    features: [
      "10+ hours of video content",
      "Lifetime access",
      "Private Discord community",
      "Certificate of completion",
    ],
  },
  {
    id: "advanced-trading",
    name: "Advanced Trading Strategies",
    description: "Learn professional trading techniques, technical analysis, and risk management from industry experts.",
    price: 199,
    category: "course",
    features: [
      "20+ hours of advanced content",
      "Live trading sessions",
      "1-on-1 mentorship calls",
      "Trading signals for 6 months",
    ],
  },
  {
    id: "vibe-coding-bootcamp",
    name: "Vibe Coding Bootcamp",
    description: "Build profitable web apps and automate your income streams with modern coding skills.",
    price: 249,
    category: "course",
    features: [
      "30+ hours of project-based learning",
      "Build 5 real-world projects",
      "Code review sessions",
      "Job placement support",
    ],
  },
];

export const guides: Product[] = [
  {
    id: "defi-mastery",
    name: "DeFi Mastery Guide",
    description: "A comprehensive PDF guide to decentralized finance protocols and yield farming strategies.",
    price: 49,
    category: "guide",
    features: [
      "100+ pages of insights",
      "Step-by-step tutorials",
      "Protocol comparisons",
      "Risk assessment frameworks",
    ],
  },
  {
    id: "nft-playbook",
    name: "NFT Playbook",
    description: "Everything you need to know about creating, buying, and profiting from NFTs.",
    price: 39,
    category: "guide",
    features: [
      "NFT creation tutorials",
      "Marketplace strategies",
      "Valuation techniques",
      "Community building tips",
    ],
  },
];

export const bundles: Product[] = [
  {
    id: "complete-crypto-pack",
    name: "Complete Crypto Pack",
    description: "Get all crypto courses and guides in one discounted bundle. Best value for serious learners.",
    price: 349,
    category: "bundle",
    features: [
      "All crypto courses included",
      "All PDF guides included",
      "Priority support",
      "Exclusive bonus content",
    ],
  },
];

export const memberships: Product[] = [
  {
    id: "all-access",
    name: "All-Access Membership",
    description: "Unlimited access to all content, live sessions, and exclusive member perks.",
    price: 29,
    category: "membership",
    isSubscription: true,
    subscriptionInterval: "month",
    features: [
      "Access to all courses",
      "Weekly live sessions",
      "Exclusive Discord channels",
      "Early access to new content",
    ],
  },
];

export const allProducts: Product[] = [
  ...courses,
  ...guides,
  ...bundles,
  ...memberships,
];
