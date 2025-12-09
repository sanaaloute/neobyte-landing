import { useTranslation } from "react-i18next";
import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { ProductCard } from "@/components/product-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { CTABanner } from "@/components/cta-banner";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";



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


export default function Home() {
  const { t } = useTranslation();
  
  const services = [
    {
      icon: "Brain",
      title: t("services.items.ai.title"),
      description: t("services.items.ai.description"),
      href: "/services#ai",
    },
    {
      icon: "MessageSquare",
      title: t("services.items.chatbots.title"),
      description: t("services.items.chatbots.description"),
      href: "/services#chatbots",
    },
    {
      icon: "Bot",
      title: t("services.items.agents.title"),
      description: t("services.items.agents.description"),
      href: "/services#agents",
    },
    {
      icon: "Smartphone",
      title: t("services.items.mobile.title"),
      description: t("services.items.mobile.description"),
      href: "/services#mobile",
    },
    {
      icon: "Globe",
      title: t("services.items.web.title"),
      description: t("services.items.web.description"),
      href: "/services#web",
    },
    {
      icon: "Monitor",
      title: t("services.items.desktop.title"),
      description: t("services.items.desktop.description"),
      href: "/services#desktop",
    },
    {
      icon: "Shield",
      title: t("services.items.security.title"),
      description: t("services.items.security.description"),
      href: "/services#security",
    },
    {
      icon: "Cloud",
      title: t("services.items.cloud.title"),
      description: t("services.items.cloud.description"),
      href: "/services#cloud",
    },
  ];

  const valueProps = [
    t("home.valueProps.expertTeam"),
    t("home.valueProps.cuttingEdge"),
    t("home.valueProps.agile"),
    t("home.valueProps.support"),
    t("home.valueProps.proven"),
    t("home.valueProps.competitive"),
  ];

  const products = [
    {
      title: t("products.items.chatbot.title"),
      description: t("products.items.chatbot.description"),
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      features: t("products.items.chatbot.features", { returnObjects: true }) as string[],
    },
    {
      title: t("products.items.agent.title"),
      description: t("products.items.agent.description"),
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
      features: t("products.items.agent.features", { returnObjects: true }) as string[],
    },
    {
      title: t("products.items.faceRecognition.title"),
      description: t("products.items.faceRecognition.description"),
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      features: t("products.items.faceRecognition.features", { returnObjects: true }) as string[],
    },
    {
      title: t("products.items.inventory.title"),
      description: t("products.items.inventory.description"),
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      features: t("products.items.inventory.features", { returnObjects: true }) as string[],
    },
  ];

  return (
    <div className="flex flex-col">
      <Hero
        title={t("home.hero.title")}
        subtitle={t("home.hero.subtitle")}
        primaryCTA={{ text: t("home.hero.primaryCTA"), href: "/contact" }}
        secondaryCTA={{ text: t("home.hero.secondaryCTA"), href: "/services" }}
      />

      <section id="services" className="py-16 lg:py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {t("home.services.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("home.services.subtitle")}
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
              {t("home.products.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("home.products.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.title} {...product} delay={index * 0.1} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" to="/products">
              {t("home.products.viewAll")}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-black dark:bg-white text-white dark:text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {t("home.whyChoose.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("home.whyChoose.subtitle")}
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
              {t("home.testimonials.title")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("home.testimonials.subtitle")}
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
        title={t("home.cta.title")}
        description={t("home.cta.description")}
        primaryCTA={{ text: t("home.cta.primaryCTA"), href: "/contact" }}
        secondaryCTA={{ text: t("home.cta.secondaryCTA"), href: "/services" }}
      />
    </div>
  );
}

