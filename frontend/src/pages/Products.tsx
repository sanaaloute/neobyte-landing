import { useTranslation } from "react-i18next";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";

export default function Products() {
  const { t } = useTranslation();
  
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
    {
      title: t("products.items.ecommerce.title"),
      description: t("products.items.ecommerce.description"),
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      features: t("products.items.ecommerce.features", { returnObjects: true }) as string[],
    },
    {
      title: t("products.items.taskManager.title"),
      description: t("products.items.taskManager.description"),
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      features: t("products.items.taskManager.features", { returnObjects: true }) as string[],
    },
  ];

  return (
    <div className="flex flex-col">
      <Hero
        title={t("products.hero.title")}
        subtitle={t("products.hero.subtitle")}
        primaryCTA={{ text: t("products.hero.primaryCTA"), href: "/contact" }}
        secondaryCTA={{ text: t("products.hero.secondaryCTA"), href: "/services" }}
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
