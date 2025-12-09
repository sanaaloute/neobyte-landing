import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { ProductCard } from "@/components/product-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { CTABanner } from "@/components/cta-banner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const services = [
  {
    icon: "Brain",
    title: "AI Software Development",
    description:
      "Custom AI solutions powered by machine learning and deep learning technologies. Build intelligent systems that learn and adapt.",
    href: "/services#ai",
  },
  {
    icon: "MessageSquare",
    title: "AI Chatbots with RAG",
    description:
      "Intelligent conversational AI with Retrieval-Augmented Generation. Context-aware chatbots that understand your business.",
    href: "/services#chatbots",
  },
  {
    icon: "Bot",
    title: "AI Agents & Automation",
    description:
      "Automate complex workflows with intelligent AI agents. Streamline operations and boost productivity.",
    href: "/services#agents",
  },
  {
    icon: "Smartphone",
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android. Beautiful, performant, and user-friendly.",
    href: "/services#mobile",
  },
  {
    icon: "Globe",
    title: "Web App Development",
    description:
      "Modern web applications built with cutting-edge technologies. Scalable, secure, and lightning-fast.",
    href: "/services#web",
  },
  {
    icon: "Monitor",
    title: "Desktop App Development",
    description:
      "Native desktop applications for Windows and macOS. Powerful, efficient, and platform-optimized.",
    href: "/services#desktop",
  },
  {
    icon: "Shield",
    title: "Security Systems",
    description:
      "Comprehensive security camera installation and monitoring systems. Protect your assets with advanced surveillance.",
    href: "/services#security",
  },
  {
    icon: "Cloud",
    title: "Cloud & DevOps",
    description:
      "Cloud architecture, microservices, and DevOps solutions. Deploy and scale with confidence.",
    href: "/services#cloud",
  },
];

const products = [
  {
    title: "AI-Powered Chatbot Platform",
    description:
      "Enterprise-grade chatbot solution with RAG capabilities, multi-language support, and seamless integrations.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    features: [
      "Retrieval-Augmented Generation",
      "Multi-channel deployment",
      "Advanced analytics dashboard",
      "Custom training & fine-tuning",
    ],
    techStack: ["Python", "FastAPI", "TensorFlow", "React", "PostgreSQL"],
    demoUrl: "#",
    downloadUrl: "#",
  },
  {
    title: "AI Agent Automation Platform",
    description:
      "Build and deploy intelligent agents that automate complex business workflows and decision-making processes.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    features: [
      "Workflow automation",
      "Multi-agent orchestration",
      "Real-time monitoring",
      "Custom integrations",
    ],
    techStack: ["Python", "LangChain", "Docker", "Kubernetes", "Redis"],
    demoUrl: "#",
    downloadUrl: "#",
  },
  {
    title: "Face Recognition Attendance System",
    description:
      "Automated attendance tracking using advanced facial recognition technology. Accurate, fast, and secure.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    features: [
      "Real-time face detection",
      "99.9% accuracy rate",
      "Multi-location support",
      "Comprehensive reporting",
    ],
    techStack: ["Python", "OpenCV", "TensorFlow", "React", "MongoDB"],
    demoUrl: "#",
    downloadUrl: "#",
  },
  {
    title: "Inventory Management System",
    description:
      "Complete inventory management solution with AI-powered forecasting, automated reordering, and analytics.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    features: [
      "AI demand forecasting",
      "Automated reordering",
      "Multi-warehouse support",
      "Real-time tracking",
    ],
    techStack: ["Node.js", "React", "PostgreSQL", "Redis", "Docker"],
    demoUrl: "#",
    downloadUrl: "#",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechCorp Inc.",
    content:
      "Neobyte transformed our customer service with their AI chatbot. Response times dropped by 80% and customer satisfaction soared.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    name: "Michael Chen",
    role: "Founder",
    company: "StartupXYZ",
    content:
      "The mobile app they built exceeded our expectations. Clean code, beautiful design, and delivered on time. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Director",
    company: "RetailMax",
    content:
      "Their inventory management system revolutionized our operations. The AI forecasting is incredibly accurate and saves us thousands monthly.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
];

const valueProps = [
  "Expert team with 10+ years of experience",
  "Cutting-edge AI and ML technologies",
  "Agile development methodology",
  "24/7 support and maintenance",
  "Proven track record of successful projects",
  "Competitive pricing and flexible contracts",
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero
        title="Building Intelligent Software for the Future"
        subtitle="We specialize in AI solutions, custom software development, and cutting-edge technology. Transform your business with intelligent automation and innovative applications."
        primaryCTA={{ text: "Get a Quote", href: "/contact" }}
        secondaryCTA={{ text: "View Services", href: "/services" }}
      />

      <section id="services" className="py-16 lg:py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions tailored to your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-16 lg:py-24 bg-gradient-to-b from-blue-50 to-blue-600 dark:from-blue-900 dark:to-blue-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready-to-deploy solutions built with cutting-edge technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.title} {...product} delay={index * 0.1} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-black dark:bg-white text-white dark:text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Why Choose Neobyte?
              </h2>
              <p className="text-lg text-muted-foreground">
                We combine technical expertise with business acumen to deliver
                exceptional results
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {valueProps.map((prop, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-lg border border-white/20"
                >
                  <CheckCircle2 className="h-6 w-6 text-white dark:text-black flex-shrink-0 mt-0.5" />
                  <p className="text-white dark:text-black">{prop}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} {...testimonial} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Start Your AI Project Today"
        description="Ready to transform your business with intelligent software? Get in touch and let's discuss your project."
        primaryCTA={{ text: "Get Started", href: "/contact" }}
        secondaryCTA={{ text: "View Services", href: "/services" }}
      />
    </div>
  );
}
