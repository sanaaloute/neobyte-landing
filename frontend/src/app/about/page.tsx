"use client";

import { useTranslation } from "react-i18next";
import { Eyebrow, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export default function About() {
  const { t } = useTranslation();
  const storyBody = t("about.story.body", { returnObjects: true }) as string[];
  const principles = t("about.principles.items", {
    returnObjects: true,
  }) as { title: string; description: string }[];

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
            <Eyebrow>{t("about.hero.eyebrow")}</Eyebrow>
            <h1 className="mt-4 max-w-3xl font-display text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
              {t("about.hero.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-base lg:text-lg text-muted-foreground leading-relaxed">
              {t("about.hero.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>{t("about.story.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
                {t("about.story.title")}
              </h2>
              <div className="mt-8 space-y-6">
                {storyBody.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base lg:text-lg text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Geo statement */}
      <section className="border-t border-border bg-secondary/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <Reveal>
            <div className="max-w-4xl">
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] text-balance">
                {t("about.geo.title")}
              </p>
              <p className="mt-6 max-w-2xl text-base lg:text-lg text-muted-foreground leading-relaxed">
                {t("about.geo.body")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow={t("about.principles.eyebrow")}
              title={t("about.principles.title")}
            />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 80}>
                <div className="h-full rounded-lg border border-border bg-card p-6 lg:p-8">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-secondary/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
                {t("about.cta.title")}
              </h2>
              <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
                {t("about.cta.description")}
              </p>
              <Button size="lg" to="/contact" className="mt-8">
                {t("about.cta.button")}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
