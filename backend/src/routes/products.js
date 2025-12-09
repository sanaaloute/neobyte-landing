import express from "express";

const router = express.Router();

const products = [
  {
    id: "chatbot-platform",
    title: "AI-Powered Chatbot Platform",
    description:
      "Enterprise-grade chatbot solution with RAG capabilities, multi-language support, and seamless integrations.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    features: [
      "Retrieval-Augmented Generation (RAG)",
      "Multi-channel deployment",
      "Advanced analytics dashboard",
      "Custom training & fine-tuning",
      "Multi-language support",
      "Integration with CRM and helpdesk systems",
    ],
    techStack: ["Python", "FastAPI", "TensorFlow", "React", "PostgreSQL", "Redis"],
    demoUrl: "#",
    downloadUrl: "#",
    category: "AI & Machine Learning",
  },
  {
    id: "ai-agent-platform",
    title: "AI Agent Automation Platform",
    description:
      "Build and deploy intelligent agents that automate complex business workflows and decision-making processes.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    features: [
      "Workflow automation engine",
      "Multi-agent orchestration",
      "Real-time monitoring and logging",
      "Custom integrations and APIs",
      "Visual workflow builder",
      "Scheduled and event-driven triggers",
    ],
    techStack: ["Python", "LangChain", "Docker", "Kubernetes", "Redis", "PostgreSQL"],
    demoUrl: "#",
    downloadUrl: "#",
    category: "AI & Automation",
  },
  {
    id: "face-recognition-attendance",
    title: "Face Recognition Attendance System",
    description:
      "Automated attendance tracking using advanced facial recognition technology. Accurate, fast, and secure.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    features: [
      "Real-time face detection and recognition",
      "99.9% accuracy rate",
      "Multi-location support",
      "Comprehensive reporting and analytics",
      "Mobile app for employees",
      "Integration with payroll systems",
    ],
    techStack: ["Python", "OpenCV", "TensorFlow", "React", "MongoDB", "FastAPI"],
    demoUrl: "#",
    downloadUrl: "#",
    category: "AI & Security",
  },
  {
    id: "inventory-management",
    title: "Inventory Management System",
    description:
      "Complete inventory management solution with AI-powered forecasting, automated reordering, and analytics.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    features: [
      "AI demand forecasting",
      "Automated reordering",
      "Multi-warehouse support",
      "Real-time inventory tracking",
      "Barcode and QR code scanning",
      "Supplier management",
    ],
    techStack: ["Node.js", "React", "PostgreSQL", "Redis", "Docker", "AWS"],
    demoUrl: "#",
    downloadUrl: "#",
    category: "Business Management",
  },
  {
    id: "ecommerce-mobile-template",
    title: "Mobile App Template - E-Commerce",
    description:
      "Ready-to-deploy e-commerce mobile app template with payment integration, product catalog, shopping cart, and order management.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    features: [
      "Product catalog and search",
      "Shopping cart and checkout",
      "Payment gateway integration",
      "Order tracking",
      "User authentication",
      "Push notifications",
    ],
    techStack: ["React Native", "Node.js", "MongoDB", "Stripe", "Firebase"],
    demoUrl: "#",
    downloadUrl: "#",
    category: "Mobile Development",
  },
  {
    id: "task-manager-desktop",
    title: "Desktop App Template - Task Manager",
    description:
      "Cross-platform desktop task management application with team collaboration, project tracking, and time management features.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    features: [
      "Task and project management",
      "Team collaboration",
      "Time tracking",
      "File attachments",
      "Calendar integration",
      "Offline mode support",
    ],
    techStack: ["Electron", "React", "Node.js", "SQLite", "WebSocket"],
    demoUrl: "#",
    downloadUrl: "#",
    category: "Desktop Development",
  },
];

// GET /api/products - Get all products
router.get("/", (req, res) => {
  const { category } = req.query;
  
  let filteredProducts = products;
  if (category) {
    filteredProducts = products.filter((p) =>
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  res.json({
    success: true,
    data: filteredProducts,
    count: filteredProducts.length,
  });
});

// GET /api/products/:id - Get single product
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      error: "Product not found",
    });
  }

  res.json({
    success: true,
    data: product,
  });
});

export default router;


