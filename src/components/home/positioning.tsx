"use client";

import { useTranslation } from "react-i18next";
import { Cpu } from "lucide-react";
import { Eyebrow, Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

export function Positioning() {
  const { t } = useTranslation();
  const points = t("home.positioning.points", {
    returnObjects: true,
  }) as string[];

  return (
    <Section className="border-t border-border">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>{t("home.positioning.eyebrow")}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15] text-balance">
            {t("home.positioning.title")}
          </h2>
          <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed">
            {t("home.positioning.body")}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <ul className="divide-y divide-border rounded-lg border border-border">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-4 px-5 py-5 lg:px-6"
              >
                <Cpu
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-brand"
                />
                <span className="text-sm lg:text-base">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
