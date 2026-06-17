import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import * as dotenv from "dotenv";

dotenv.config();

async function startServer() {
  console.log("[A One Sports Batkhela] Starting server...");
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Request logging for debugging
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  // --- API ROUTES ---

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", business: "A One Sports Batkhela" });
  });

  // Mock Database for Products
  const MOCK_PRODUCTS = [
    {
      id: "p1",
      slug: "ss-ton-player-edition-bat",
      name: "SS TON Player Edition Grade 1 Willow Bat",
      brand: "SS",
      category: "Cricket",
      sku: "BAT-SS-TON-001",
      price: 65000,
      salePrice: 58500,
      stock: 5,
      rating: 4.9,
      reviewCount: 124,
      soldCount: 89,
      views: 1205,
      deliveryEstimate: "2-4 Business Days",
      deliveryCharge: 250,
      images: [
        { id: "i1", url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800", alt: "SS TON Front" },
        { id: "i2", url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800", alt: "SS TON Side" },
        { id: "i3", url: "https://images.unsplash.com/photo-1629031673322-81c81ef4f48b?q=80&w=800", alt: "SS TON Grain" },
      ],
      highlights: [
        "Hand-crafted from Premium Grade 1 English Willow",
        "Large sweet spot with thick edges",
        "Excellent pick-up and balance",
        "Used by international pros worldwide"
      ],
      description: "Experience the ultimate power and precision with the SS TON Player Edition. This bat is meticulously designed for professional players who demand nothing but the best. Each piece of wood is hand-selected for its superior grain structure and responsiveness.",
      specifications: [
        { label: "Material", value: "English Willow Grade 1" },
        { label: "Weight", value: "2.8 - 2.10 lbs" },
        { label: "Handle Type", value: "9-piece Cane" },
        { label: "Toe Guard", value: "Fitted" }
      ],
      variants: [
        { id: "v1", name: "Short Handle", sku: "BAT-SS-TON-SH", price: 65000, salePrice: 58500, stock: 3 },
        { id: "v2", name: "Harrow", sku: "BAT-SS-TON-HR", price: 62000, salePrice: 55000, stock: 2 }
      ],
      faqs: [
        { q: "Is this bat pre-knocked?", a: "Yes, it is factory knocked but we recommend 1000 manual knocks for best performance." }
      ]
    },
    {
      id: "2",
      slug: "professional-sialkot-football",
      name: "Professional Sialkot Match Football",
      brand: "Star",
      category: "Football",
      sku: "FB-STAR-001",
      price: 3500,
      stock: 45,
      rating: 4.7,
      reviewCount: 56,
      soldCount: 156,
      views: 450,
      deliveryEstimate: "1-3 Business Days",
      deliveryCharge: 150,
      images: [{ id: "i1", url: "https://images.unsplash.com/photo-1629031673322-81c81ef4f48b?q=80&w=800", alt: "Sialkot Football" }],
      highlights: ["Hand-stitched in Sialkot", "Official weight and size", "Premium PU outer casing"],
      description: "Crafted in the heart of Pakistan's sports industry, this Sialkot-made football offers international standard performance and durability.",
      specifications: [{ label: "Size", value: "5 (Standard)" }, { label: "Material", value: "Premium PU" }],
      variants: [{ id: "v1", name: "Official Size 5", sku: "FB-STAR-V1", price: 3500, stock: 45 }],
      faqs: []
    },
    {
      id: "3",
      slug: "olympic-badminton-racket",
      name: "Olympic Grade Pro Badminton Racket",
      brand: "Yonex",
      category: "Badminton",
      sku: "BD-YNX-001",
      price: 8500,
      salePrice: 7200,
      stock: 12,
      rating: 4.8,
      reviewCount: 34,
      soldCount: 45,
      views: 320,
      deliveryEstimate: "2-4 Business Days",
      deliveryCharge: 200,
      images: [{ id: "i1", url: "https://images.unsplash.com/photo-1626225454284-d3c631481180?q=80&w=800", alt: "Badminton Racket" }],
      highlights: ["High modulus graphite frame", "Excellent tension retention", "Non-slip grip handle"],
      description: "Designed for competitive players, this racket provides perfect speed and control for fast-paced attacking play.",
      specifications: [{ label: "Material", value: "Graphite" }, { label: "Tension", value: "28-30 lbs" }],
      variants: [{ id: "v1", name: "Standard Weight", sku: "BD-YNX-V1", price: 8500, salePrice: 7200, stock: 12 }],
      faqs: []
    },
    {
        id: "4",
        slug: "premium-cricket-kit-bag",
        name: "Premium Pro Player Kit Bag",
        brand: "SS",
        category: "Cricket",
        sku: "KB-SS-001",
        price: 12000,
        stock: 15,
        rating: 4.9,
        reviewCount: 22,
        soldCount: 33,
        views: 210,
        deliveryEstimate: "3-5 Business Days",
        deliveryCharge: 350,
        images: [{ id: "i1", url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800", alt: "Kit Bag" }],
        highlights: ["Heavy duty nylon material", "Multiple compartments for full kit", "Durable tractor wheels"],
        description: "A spacious and durable kit bag designed to carry your full professional cricket equipment with ease.",
        specifications: [{ label: "Material", value: "Nylon" }, { label: "Wheels", value: "Triple Tractor Wheels" }],
        variants: [{ id: "v1", name: "Full Size", sku: "KB-SS-V1", price: 12000, stock: 15 }],
        faqs: []
    },
    {
        id: "5",
        slug: "sports-running-shoes-x1",
        name: "Aero-Lite Sports Running Shoes",
        brand: "Nike",
        category: "Shoes",
        sku: "SH-NK-001",
        price: 18500,
        stock: 20,
        rating: 4.6,
        reviewCount: 45,
        soldCount: 78,
        views: 560,
        deliveryEstimate: "2-4 Business Days",
        deliveryCharge: 200,
        images: [{ id: "i1", url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800", alt: "Running Shoes" }],
        highlights: ["Breathable mesh upper", "Responsive foam cushioning", "Durable rubber outsole"],
        description: "Experience maximum comfort and performance with these lightweight running shoes designed for athletes.",
        specifications: [{ label: "Type", value: "Running" }, { label: "Material", value: "Mesh/Foam" }],
        variants: [
            { id: "v1", name: "Size 42", sku: "SH-NK-42", price: 18500, stock: 10 },
            { id: "v2", name: "Size 44", sku: "SH-NK-44", price: 18500, stock: 10 }
        ],
        faqs: []
    }
  ];

  const MOCK_REVIEWS = [
    {
      id: "r1",
      productId: "p1",
      userName: "Abdullah Khan",
      rating: 5,
      title: "Masterpiece!",
      text: "The ping on this bat is incredible. Best gear I've bought from Batkhela.",
      date: "2026-06-10",
      isVerified: true,
      helpfulVotes: 12
    }
  ];

  app.get("/api/products/:slug", (req, res) => {
    const product = MOCK_PRODUCTS.find(p => p.slug === req.params.slug);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  });

  app.get("/api/products/:id/reviews", (req, res) => {
    const reviews = MOCK_REVIEWS.filter(r => r.productId === req.params.id);
    res.json(reviews);
  });

  // Example Admin Product Route
  app.get("/api/admin/stats", async (req, res) => {
    res.json({
      revenue: 1250000,
      orders: 450,
      customers: 1200,
      inventoryStatus: "Healthy"
    });
  });

  // --- VITE MIDDLEWARE ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[A One Sports Batkhela] Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
