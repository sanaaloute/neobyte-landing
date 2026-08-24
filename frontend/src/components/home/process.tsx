"use client";

import { useTranslation } from "react-i18next";
import { Section, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { processSteps } from "@/data/process";

export function Process() {
  const { t } = useTranslation();

  return (
    <Section id="process">
      <SectionHeader
        eyebrow={t("home.process.eyebrow")}
        title={t("home.process.title")}
        description={t("home.process.subtitle")}
      />
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
        {processSteps.map((step, index) => (
          <Reveal key={step.id} delay={index * 80}>
            <div className="border-t border-border pt-6">
              <p className="font-mono text-sm text-brand">{step.number}</p>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                {t(`process.steps.${step.id}.title`)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t(`process.steps.${step.id}.description`)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
