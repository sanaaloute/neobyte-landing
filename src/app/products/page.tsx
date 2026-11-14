"use client";

import { useTranslation } from "react-i18next";
import { Check, ArrowUpRight, Smartphone, Apple } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ProductVisual } from "@/components/website-preview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { products } from "@/data/products";

const channelIcons: Record<string, LucideIcon> = {
  Android: Smartphone,
  iOS: Apple,
};

export default function Products() {
  const { t } = useTranslation();

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
            <Eyebrow>{t("products.hero.eyebrow")}</Eyebrow>
            <h1 className="mt-4 font-display text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
              {t("products.hero.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-base lg:text-lg text-muted-foreground leading-relaxed">
              {t("products.hero.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Products */}
      {products.map((product, index) => {
        const features = t(`products.items.${product.id}.features`, {
          returnObjects: true,
        }) as string[];
        const stack = t(`products.items.${product.id}.stack`, {
          returnObjects: true,
        }) as string[];
        const isLive = product.status === "live";
        return (
          <section
            key={product.id}
            className={cn(
              "border-t border-border py-20 lg:py-28",
              index % 2 === 1 && "bg-secondary/40"
            )}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <Reveal className={cn(index % 2 === 1 && "lg:order-2")}>
                  <ProductVisual product={product} />
                </Reveal>
                <Reveal delay={120}>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium",
                      isLive
                        ? "border-brand/40 text-brand"
                        : "border-border text-muted-foreground"
                    )}
                  >
                    {isLive ? t("products.statusLive") : t("products.statusDev")}
                  </span>
                  <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                    {t(`products.items.${product.id}.name`)}
                  </h2>
                  <p className="mt-2 text-lg text-muted-foreground">
                    {t(`products.items.${product.id}.tagline`)}
                  </p>
                  <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                    {t(`products.items.${product.id}.description`)}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {(product.link || product.channels) && (
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      {product.link && (
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {t("products.visitSite")}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {product.channels?.map((channel) => {
                        const ChannelIcon = channelIcons[channel];
                        const href = product.storeLinks?.[channel];
                        const chipClass =
                          "inline-flex items-center gap-1.5 rounded-md border border-brand/40 px-2.5 py-1.5 font-mono text-xs font-medium text-brand";
                        return href ? (
                          <a
                            key={channel}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              chipClass,
                              "transition-colors hover:bg-brand/10"
                            )}
                          >
                            {ChannelIcon && (
                              <ChannelIcon className="h-3.5 w-3.5" />
                            )}
                            {channel}
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        ) : (
                          <span key={channel} className={chipClass}>
                            {ChannelIcon && (
                              <ChannelIcon className="h-3.5 w-3.5" />
                            )}
                            {channel}
                          </span>
                        );
                      })}
                    </div>
                  )}
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
                {t("products.cta.title")}
              </h2>
              <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
                {t("products.cta.description")}
              </p>
              <Button size="lg" to="/contact" className="mt-8">
                {t("products.cta.button")}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
