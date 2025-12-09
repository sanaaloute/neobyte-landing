import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";

const products = [
  {
    title: "AI-Powered Chatbot Platform",
    description:
      "Enterprise-grade chatbot solution with RAG capabilities, multi-language support, and seamless integrations.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    features: [
      "Retrieval-Augmented Generation (RAG)",
      "Multi-channel deployment",
      "Advanced analytics dashboard",
      "Custom training & fine-tuning",
    ],
  },
  {
    title: "AI Agent Automation Platform",
    description:
      "Build and deploy intelligent agents that automate complex business workflows and decision-making processes.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    features: [
      "Workflow automation engine",
      "Multi-agent orchestration",
      "Real-time monitoring",
      "Custom integrations",
    ],
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
  },
  {
    title: "Mobile App Template - E-Commerce",
    description:
      "Ready-to-deploy e-commerce mobile app template with payment integration and product catalog.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    features: [
      "Product catalog and search",
      "Shopping cart and checkout",
      "Payment gateway integration",
      "Order tracking",
    ],
  },
  {
    title: "Desktop App Template - Task Manager",
    description:
      "Cross-platform desktop task management application with team collaboration features.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    features: [
      "Task and project management",
      "Team collaboration",
      "Time tracking",
      "File attachments",
    ],
  },
];

export default function ProductsPage() {
  return (
    <div className="flex flex-col">
      <Hero
        title="Our Products"
        subtitle="Ready-to-deploy solutions built with cutting-edge technology"
        primaryCTA={{ text: "Request Demo", href: "/contact" }}
        secondaryCTA={{ text: "View Services", href: "/services" }}
      />

      <section className="py-16 lg:py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.title} {...product} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
