import { useTranslation } from "react-i18next";
import { Hero } from "@/components/hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getIcon } from "@/lib/icon-map";

export default function Industries() {
  const { t } = useTranslation();
  
  const industries = [
    { key: "fintech", icon: "CreditCard" },
    { key: "transportation", icon: "Truck" },
    { key: "ecommerce", icon: "ShoppingCart" },
    { key: "bank", icon: "Building2" },
    { key: "hotel", icon: "Home" },
    { key: "egovernment", icon: "Building" },
    { key: "travel", icon: "PlaneTakeoff" },
    { key: "healthcare", icon: "Heart" },
    { key: "retail", icon: "Store" },
    { key: "manufacturing", icon: "Settings" },
    { key: "education", icon: "GraduationCap" },
    { key: "agriculture", icon: "Leaf" },
    { key: "iot", icon: "Wifi" },
    { key: "media", icon: "Megaphone" },
    { key: "ai", icon: "Brain" },
    { key: "insurance", icon: "Shield" },
  ];

  return (
    <div className="flex flex-col">
      <Hero
        title={t("industries.hero.title")}
        subtitle={t("industries.hero.subtitle")}
        primaryCTA={{ text: t("industries.hero.primaryCTA"), href: "/contact" }}
        secondaryCTA={{ text: t("industries.hero.secondaryCTA"), href: "/services" }}
      />

      <section className="py-16 lg:py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry) => {
              const Icon = getIcon(industry.icon);
              const industryName = t(`industries.items.${industry.key}`);
              return (
                <Card key={industry.key} className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white dark:text-black" />
                    </div>
                    <CardTitle className="text-lg">{industryName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("industries.description", { industry: industryName.toLowerCase() })}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
