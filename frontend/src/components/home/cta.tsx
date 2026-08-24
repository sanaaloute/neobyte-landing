"use client";

import { useTranslation } from "react-i18next";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  const { t } = useTranslation();

  return (
    <Section>
      <Reveal>
        <div className="rounded-lg bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12 lg:py-24">
          <h2 className="mx-auto max-w-3xl font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
            {t("home.cta.title")}
            <span className="mt-2 block font-display">
              {t("home.cta.highlight")}
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base lg:text-lg text-primary-foreground/70 leading-relaxed">
            {t("home.cta.description")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="secondary" size="lg" to="/contact">
              {t("home.cta.primaryCTA")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              to="/products"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              {t("home.cta.secondaryCTA")}
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
