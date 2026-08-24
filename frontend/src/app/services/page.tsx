"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { Eyebrow } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { capabilities } from "@/data/capabilities";

export default function Services() {
  const { t } = useTranslation();

  // Scroll to the anchored section when arriving via /services#<id>.
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
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 lg:pt-40 pb-12 lg:pb-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_30%_20%,black,transparent)]"
        />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Eyebrow>{t("solutions.hero.eyebrow")}</Eyebrow>
            <h1 className="mt-4 font-display text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
              {t("solutions.hero.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-base lg:text-lg text-muted-foreground leading-relaxed">
              {t("solutions.hero.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      {capabilities.map((capability, index) => {
        const items = t(`solutions.pillars.${capability.id}.items`, {
          returnObjects: true,
        }) as string[];
        return (
          <section
            key={capability.id}
            id={capability.id}
            className={cn(
              "scroll-mt-24 border-t border-border py-20 lg:py-28",
              index % 2 === 1 && "bg-secondary/40"
            )}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <Reveal className={cn(index % 2 === 1 && "lg:order-2")}>
                  <div className="group overflow-hidden rounded-xl border border-border shadow-lg shadow-foreground/5">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={capability.image}
                        alt={t(`solutions.pillars.${capability.id}.title`)}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={120}>
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-balance">
                    {t(`solutions.pillars.${capability.id}.title`)}
                  </h2>
                  <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl">
                    {t(`solutions.pillars.${capability.id}.description`)}
                  </p>
                  <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="border-t border-border bg-secondary/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
                {t("solutions.cta.title")}
              </h2>
              <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
                {t("solutions.cta.description")}
              </p>
              <Button size="lg" to="/contact" className="mt-8">
                {t("solutions.cta.button")}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
