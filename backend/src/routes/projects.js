import express from "express";

const router = express.Router();

const projects = [
  {
    id: "enterprise-ai-support",
    title: "Enterprise AI Customer Support Platform",
    client: "TechCorp Inc.",
    category: "AI & Machine Learning",
    description:
      "Built a comprehensive AI-powered customer support platform with chatbot, ticket routing, and analytics. Reduced response time by 80% and improved customer satisfaction scores.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["Python", "FastAPI", "TensorFlow", "React", "PostgreSQL"],
    results: [
      "80% reduction in response time",
      "95% customer satisfaction rate",
      "60% cost reduction in support operations",
    ],
    link: "#",
    year: 2024,
  },
  {
    id: "ecommerce-mobile-app",
    title: "E-Commerce Mobile App",
    client: "RetailMax",
    category: "Mobile Development",
    description:
      "Developed a full-featured e-commerce mobile app for iOS and Android with payment integration, product recommendations, and real-time inventory updates.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    technologies: ["React Native", "Node.js", "MongoDB", "Stripe"],
    results: [
      "50K+ downloads in first month",
      "4.8/5 app store rating",
      "30% increase in mobile sales",
    ],
    link: "#",
    year: 2024,
  },
  {
    id: "iot-security-monitoring",
    title: "IoT Security Monitoring System",
    client: "SecureWare",
    category: "IoT & Security",
    description:
      "Implemented a comprehensive security camera system with AI-powered motion detection, facial recognition, and cloud-based monitoring for multiple locations.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    technologies: ["Python", "OpenCV", "TensorFlow", "React", "AWS"],
    results: [
      "99.9% detection accuracy",
      "Real-time alerts and notifications",
      "50% reduction in false alarms",
    ],
    link: "#",
    year: 2023,
  },
  {
    id: "saas-analytics-dashboard",
    title: "SaaS Analytics Dashboard",
    client: "DataInsights",
    category: "Web Development",
    description:
      "Created a powerful analytics dashboard with real-time data visualization, custom reports, and AI-powered insights for business intelligence.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "D3.js", "Python"],
    results: [
      "10x faster data processing",
      "Real-time dashboard updates",
      "Improved decision-making speed",
    ],
    link: "#",
    year: 2023,
  },
  {
    id: "ai-inventory-management",
    title: "AI-Powered Inventory Management",
    client: "SupplyChain Pro",
    category: "AI & Automation",
    description:
      "Developed an intelligent inventory management system with AI forecasting, automated reordering, and multi-warehouse coordination.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    technologies: ["Python", "Machine Learning", "React", "PostgreSQL", "Docker"],
    results: [
      "25% reduction in inventory costs",
      "95% forecast accuracy",
      "Automated reordering system",
    ],
    link: "#",
    year: 2023,
  },
  {
    id: "healthcare-appointment-system",
    title: "Healthcare Appointment System",
    client: "MedCare Clinic",
    category: "Web & Mobile",
    description:
      "Built a comprehensive appointment booking system with patient management, reminders, and telemedicine integration for healthcare providers.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Twilio", "Stripe"],
    results: [
      "40% reduction in no-shows",
      "Streamlined appointment scheduling",
      "Improved patient satisfaction",
    ],
    link: "#",
    year: 2022,
  },
];

// GET /api/projects - Get all projects
router.get("/", (req, res) => {
  const { category, year } = req.query;
  
  let filteredProjects = projects;
  
  if (category) {
    filteredProjects = filteredProjects.filter((p) =>
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  if (year) {
    filteredProjects = filteredProjects.filter((p) => p.year === parseInt(year));
  }

  res.json({
    success: true,
    data: filteredProjects,
    count: filteredProjects.length,
  });
});

// GET /api/projects/:id - Get single project
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return res.status(404).json({
      success: false,
      error: "Project not found",
    });
  }

  res.json({
    success: true,
    data: project,
  });
});

export default router;


