import express from "express";

const router = express.Router();

const services = [
  {
    id: "ai",
    icon: "Brain",
    title: "AI Software Development",
    description:
      "Custom AI solutions powered by machine learning and deep learning technologies. Build intelligent systems that learn and adapt.",
    detailedDescription:
      "We develop custom AI software solutions tailored to your specific business needs. Our expertise spans machine learning, deep learning, natural language processing, computer vision, and predictive analytics.",
    technologies: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "NLTK"],
    useCases: [
      "Predictive analytics and forecasting",
      "Image and video recognition",
      "Natural language processing",
      "Recommendation systems",
      "Fraud detection and prevention",
    ],
  },
  {
    id: "chatbots",
    icon: "MessageSquare",
    title: "AI Chatbots with RAG",
    description:
      "Intelligent conversational AI with Retrieval-Augmented Generation. Context-aware chatbots that understand your business.",
    detailedDescription:
      "Our AI chatbots leverage Retrieval-Augmented Generation (RAG) to provide accurate, context-aware responses. They can access your company's knowledge base, documents, and databases to answer questions intelligently.",
    technologies: ["LangChain", "OpenAI GPT", "Vector Databases", "FastAPI", "React"],
    useCases: [
      "24/7 customer support",
      "Lead qualification and nurturing",
      "Internal knowledge base queries",
      "E-commerce product recommendations",
      "Appointment scheduling",
    ],
  },
  {
    id: "agents",
    icon: "Bot",
    title: "AI Agents & Workflow Automation",
    description:
      "Automate complex workflows with intelligent AI agents. Streamline operations and boost productivity.",
    detailedDescription:
      "Build intelligent agents that can perform complex tasks autonomously. Our AI agents can handle data processing, decision-making, API integrations, and multi-step workflows.",
    technologies: ["LangChain", "AutoGPT", "Python", "Docker", "Kubernetes"],
    useCases: [
      "Data processing and ETL pipelines",
      "Automated report generation",
      "Multi-system integrations",
      "Intelligent task routing",
      "Process automation",
    ],
  },
  {
    id: "mobile",
    icon: "Smartphone",
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android. Beautiful, performant, and user-friendly.",
    detailedDescription:
      "We build native and cross-platform mobile applications that deliver exceptional user experiences. From concept to deployment, we handle every aspect of mobile app development.",
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    useCases: [
      "Consumer mobile apps",
      "Enterprise mobile solutions",
      "E-commerce applications",
      "Social networking apps",
      "IoT device control apps",
    ],
  },
  {
    id: "web",
    icon: "Globe",
    title: "Web App Development",
    description:
      "Modern web applications built with cutting-edge technologies. Scalable, secure, and lightning-fast.",
    detailedDescription:
      "We create modern, responsive web applications using the latest frameworks and best practices. Our web apps are built for scale, security, and performance.",
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "MongoDB"],
    useCases: [
      "SaaS platforms",
      "E-commerce websites",
      "Content management systems",
      "Dashboard and analytics platforms",
      "Progressive web apps (PWAs)",
    ],
  },
  {
    id: "desktop",
    icon: "Monitor",
    title: "Desktop App Development",
    description:
      "Native desktop applications for Windows and macOS. Powerful, efficient, and platform-optimized.",
    detailedDescription:
      "We develop native desktop applications that leverage platform-specific features for optimal performance. Whether you need a Windows application, macOS app, or cross-platform solution.",
    technologies: ["Electron", "Tauri", "C#", "Swift", "C++"],
    useCases: [
      "Productivity tools",
      "Design and creative software",
      "Data analysis applications",
      "System utilities",
      "Enterprise desktop solutions",
    ],
  },
  {
    id: "security",
    icon: "Shield",
    title: "Security Camera Installation & Monitoring",
    description:
      "Comprehensive security camera installation and monitoring systems. Protect your assets with advanced surveillance.",
    detailedDescription:
      "We provide end-to-end security camera solutions including installation, configuration, and monitoring systems. Our solutions include AI-powered motion detection, facial recognition, cloud storage, and mobile access.",
    technologies: ["IP Cameras", "NVR Systems", "AI Analytics", "Cloud Storage", "Mobile Apps"],
    useCases: [
      "Office building security",
      "Retail store surveillance",
      "Warehouse monitoring",
      "Residential security",
      "Access control integration",
    ],
  },
  {
    id: "cloud",
    icon: "Cloud",
    title: "Cloud Architecture & DevOps",
    description:
      "Cloud architecture, microservices, and DevOps solutions. Deploy and scale with confidence.",
    detailedDescription:
      "We design and implement scalable cloud architectures using AWS, Azure, and GCP. Our DevOps services include CI/CD pipeline setup, containerization, orchestration, monitoring, and infrastructure as code.",
    technologies: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    useCases: [
      "Cloud migration",
      "Microservices architecture",
      "CI/CD pipeline setup",
      "Container orchestration",
      "Infrastructure automation",
    ],
  },
];

// GET /api/services - Get all services
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: services,
    count: services.length,
  });
});

// GET /api/services/:id - Get single service
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    return res.status(404).json({
      success: false,
      error: "Service not found",
    });
  }

  res.json({
    success: true,
    data: service,
  });
});

export default router;



