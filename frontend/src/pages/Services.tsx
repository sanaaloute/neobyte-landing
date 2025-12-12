import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { getIcon } from "@/lib/icon-map";

export default function Services() {
  const { t } = useTranslation();
  
  const serviceIds = ["ai", "chatbots", "agents", "mobile", "web", "desktop", "security", "cloud"];
  
  const services = serviceIds.map((id) => ({
    id,
    icon: id === "ai" ? "Brain" : id === "chatbots" ? "MessageSquare" : id === "agents" ? "Bot" : id === "mobile" ? "Smartphone" : id === "web" ? "Globe" : id === "desktop" ? "Monitor" : id === "security" ? "Shield" : "Cloud",
    title: t(`services.items.${id}.title`),
    description: t(`services.items.${id}.description`),
    detailedDescription: t(`services.items.${id}.detailedDescription`),
    technologies: id === "ai" ? ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "NLTK"] :
                   id === "chatbots" ? ["LangChain", "OpenAI GPT", "Vector Databases", "FastAPI", "React"] :
                   id === "agents" ? ["LangChain", "AutoGPT", "Python", "Docker", "Kubernetes"] :
                   id === "mobile" ? ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"] :
                   id === "web" ? ["React", "Vite", "TypeScript", "Node.js", "PostgreSQL", "MongoDB"] :
                   id === "desktop" ? ["Electron", "Tauri", "C#", "Swift", "C++"] :
                   id === "security" ? ["IP Cameras", "NVR Systems", "AI Analytics", "Cloud Storage", "Mobile Apps"] :
                   ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    useCases: t(`services.items.${id}.useCases`, { returnObjects: true }) as string[],
  }));

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  return (
    <div className="flex flex-col">
      <Hero
        title={t("services.hero.title")}
        subtitle={t("services.hero.subtitle")}
        primaryCTA={{ text: t("services.hero.primaryCTA"), href: "/contact" }}
        secondaryCTA={{ text: t("services.hero.secondaryCTA"), href: "/products" }}
      />

      <section className="py-16 lg:py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={`/services#${service.id}`}
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
                      <Button variant="default" to="/contact">
                        {t("services.requestQuote")}
                      </Button>
                    </div>
                    <div className="lg:w-2/3">
                      <Card>
                        <CardHeader>
                          <CardTitle>{t("services.overview")}</CardTitle>
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
                              {t(`services.items.${service.id}.technologiesLabel`)}
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
                              {t(`services.items.${service.id}.useCasesLabel`)}
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
