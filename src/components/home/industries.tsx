"use client";

import { useTranslation } from "react-i18next";
import { Section, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { getIcon } from "@/lib/icon-map";
import { industries } from "@/data/industries";

export function Industries() {
  const { t } = useTranslation();

  return (
    <Section id="industries" className="scroll-mt-16 bg-secondary/40">
      <SectionHeader
        eyebrow={t("home.industries.eyebrow")}
        title={t("home.industries.title")}
        description={t("home.industries.subtitle")}
      />
      <Reveal>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4">
          {industries.map((industry) => {
            const Icon = getIcon(industry.icon);
            return (
              <li
                key={industry.id}
                className="flex items-center gap-3 bg-background px-5 py-5 transition-colors duration-300 hover:bg-secondary/60"
              >
                <Icon
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-brand"
                />
                <span className="text-sm font-medium">
                  {t(`industries.items.${industry.id}`)}
                </span>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
