"use client";

import { useTranslation } from "react-i18next";
import { Eyebrow } from "@/components/section";
import { Reveal } from "@/components/reveal";

const sections = [
  {
    id: "privacy",
    base: "policy.privacy",
    blocks: [
      "introduction",
      "collection",
      "use",
      "sharing",
      "security",
      "retention",
      "rights",
      "contact",
    ],
  },
  {
    id: "terms",
    base: "policy.terms",
    blocks: [
      "acceptance",
      "description",
      "obligations",
      "ip",
      "payments",
      "availability",
      "liability",
      "termination",
      "amendments",
      "law",
    ],
  },
  {
    id: "cookies",
    base: "policy.cookies",
    blocks: [
      "introduction",
      "what",
      "types",
      "use",
      "managing",
      "updates",
      "contact",
    ],
  },
];

export default function Policy() {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b border-border pt-32 lg:pt-40 pb-12 lg:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>{t("policy.companyName")}</Eyebrow>
              <h1 className="mt-4 font-display text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
                {t("policy.title")}
              </h1>
              <nav aria-label="Policy sections" className="mt-8 flex flex-wrap gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="rounded-full border border-border px-3.5 py-1.5 font-mono text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                  >
                    {t(`${section.base}.title`)}
                  </a>
                ))}
              </nav>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 border-b border-border py-12 lg:py-16 last:border-b-0"
            >
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                {t(`${section.base}.title`)}
              </h2>
              <div className="mt-8 space-y-8">
                {section.blocks.map((block) => {
                  const base = `${section.base}.${block}`;
                  const items = t(`${base}.items`, {
                    returnObjects: true,
                  });
                  return (
                    <div key={block}>
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {t(`${base}.title`)}
                      </h3>
                      {i18n.exists(`${base}.body`) && (
                        <p className="mt-3 text-sm lg:text-base text-muted-foreground leading-relaxed">
                          {t(`${base}.body`)}
                        </p>
                      )}
                      {i18n.exists(`${base}.intro`) && (
                        <p className="mt-3 text-sm lg:text-base text-muted-foreground leading-relaxed">
                          {t(`${base}.intro`)}
                        </p>
                      )}
                      {Array.isArray(items) && (
                        <ul className="mt-3 list-disc pl-5 space-y-2 text-sm lg:text-base text-muted-foreground leading-relaxed">
                          {(items as string[]).map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
      <div className="pb-16 lg:pb-24" />
    </div>
  );
}
