"use client";

import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icon-map";

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

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <Hero
        title="Our Services"
        subtitle="Comprehensive solutions for your digital transformation journey"
        primaryCTA={{ text: "Get a Quote", href: "/contact" }}
        secondaryCTA={{ text: "View Products", href: "/products" }}
      />

      <section className="py-16 lg:py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={`/services#${service.id}`}
                delay={index * 0.1}
              />
            ))}
          </div>

          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = getIcon(service.icon);
              const bgClass = index % 3 === 0 
                ? "bg-white dark:bg-black" 
                : index % 3 === 1 
                ? "bg-gradient-to-b from-blue-50 to-blue-600 dark:from-blue-900 dark:to-blue-950"
                : "bg-black dark:bg-white text-white dark:text-black";
              return (
                <section
                  key={service.id}
                  id={service.id}
                  className={`scroll-mt-20 py-16 lg:py-24 ${bgClass}`}
                >
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="lg:w-1/3">
                      <div className="w-16 h-16 rounded-lg bg-black dark:bg-white flex items-center justify-center mb-6">
                        <Icon className="h-8 w-8 text-white dark:text-black" />
                      </div>
                      <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                        {service.title}
                      </h2>
                      <p className="text-lg text-muted-foreground mb-6">
                        {service.description}
                      </p>
                      <Button asChild variant="default">
                        <Link href="/contact">
                          Request a Quote
                        </Link>
                      </Button>
                    </div>
                    <div className="lg:w-2/3">
                      <Card>
                        <CardHeader>
                          <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <p className="text-muted-foreground">
                              {service.detailedDescription}
                            </p>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-3 flex items-center">
                              <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                              Technologies Used
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {service.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-3 flex items-center">
                              <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                              Example Use Cases
                            </h3>
                            <ul className="space-y-2">
                              {service.useCases.map((useCase, idx) => (
                                <li
                                  key={idx}
                                  className="text-muted-foreground flex items-start"
                                >
                                  <span className="mr-2">•</span>
                                  {useCase}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
