"use client";

import { useTranslation } from "react-i18next";
import { Eyebrow } from "@/components/section";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-16">
      {/* Engineered grid, faded at the edges, drifting slowly */}
      <div
        aria-hidden="true"
        className="bg-grid bg-grid-animated absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-enter" style={{ animationDelay: "0ms" }}>
            <Eyebrow className="justify-center">{t("home.hero.eyebrow")}</Eyebrow>
          </div>
          <h1
            className="animate-enter mt-6 font-display text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-balance"
            style={{ animationDelay: "120ms" }}
          >
            {t("home.hero.title")}
          </h1>
          <p
            className="animate-enter mx-auto mt-6 max-w-2xl text-lg lg:text-xl text-muted-foreground leading-relaxed"
            style={{ animationDelay: "240ms" }}
          >
            {t("home.hero.subtitle")}
          </p>
          <div
            className="animate-enter mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "360ms" }}
          >
            <Button size="lg" to="/products">
              {t("home.hero.primaryCTA")}
            </Button>
            <Button variant="outline" size="lg" to="/contact">
              {t("home.hero.secondaryCTA")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
