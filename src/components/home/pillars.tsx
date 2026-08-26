"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { getIcon } from "@/lib/icon-map";
import { capabilities } from "@/data/capabilities";

export function Pillars() {
  const { t } = useTranslation();

  return (
    <Section id="pillars" className="bg-secondary/40">
      <SectionHeader
        eyebrow={t("home.pillars.eyebrow")}
        title={t("home.pillars.title")}
        description={t("home.pillars.subtitle")}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {capabilities.map((capability, index) => {
          const Icon = getIcon(capability.icon);
          const title = t(`solutions.pillars.${capability.id}.title`);
          const items = t(`solutions.pillars.${capability.id}.items`, {
            returnObjects: true,
          }) as string[];
          return (
            <Reveal key={capability.id} delay={index * 80}>
              <Link
                href={`/services#${capability.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-foreground/20 hover:shadow-xl hover:shadow-foreground/10"
              >
                <div className="relative aspect-[16/7] overflow-hidden">
                  <Image
                    src={capability.image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"
                  />
                  <div className="absolute bottom-3 left-5 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/90 shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon aria-hidden="true" className="h-5 w-5 text-brand" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6 pt-4">
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t(`solutions.pillars.${capability.id}.description`)}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-4">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="rounded-sm border border-border px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={200}>
        <Link
          href="/services"
          className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand"
        >
          {t("home.pillars.cta")}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </Reveal>
    </Section>
  );
}
