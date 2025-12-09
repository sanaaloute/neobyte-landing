import { useTranslation } from "react-i18next";
import { Hero } from "@/components/hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getIcon } from "@/lib/icon-map";

export default function About() {
  const { t } = useTranslation();
  
  const values = [
    {
      icon: "Target",
      key: "innovation",
    },
    {
      icon: "Users",
      key: "clientCentric",
    },
    {
      icon: "Award",
      key: "excellence",
    },
    {
      icon: "Zap",
      key: "agility",
    },
    {
      icon: "Heart",
      key: "passion",
    },
    {
      icon: "Shield",
      key: "security",
    },
  ];

  return (
    <div className="flex flex-col">
      <Hero
        title={t("about.hero.title")}
        subtitle={t("about.hero.subtitle")}
        primaryCTA={{ text: t("about.hero.primaryCTA"), href: "/contact" }}
        secondaryCTA={{ text: t("about.hero.secondaryCTA"), href: "/services" }}
      />

      <section className="py-16 lg:py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                {t("about.mission.title")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("about.mission.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-b from-blue-50 to-blue-600 dark:from-blue-900 dark:to-blue-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {t("about.values.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = getIcon(value.icon);
              return (
                <Card key={value.key} className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white dark:text-black" />
                    </div>
                    <CardTitle>{t(`about.values.${value.key}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {t(`about.values.${value.key}.description`)}
                    </CardDescription>
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
