"use client";

import { useTranslation } from "react-i18next";
import { Section, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ProductVisual } from "@/components/website-preview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { featuredProducts } from "@/data/products";

export function ProductsShowcase() {
  const { t } = useTranslation();

  return (
    <Section id="products">
      <SectionHeader
        eyebrow={t("home.products.eyebrow")}
        title={t("home.products.title")}
        description={t("home.products.subtitle")}
      />
      <div className="space-y-16 lg:space-y-24">
        {featuredProducts.map((product, index) => {
          const stack = t(`products.items.${product.id}.stack`, {
            returnObjects: true,
          }) as string[];
          const isLive = product.status === "live";
          return (
            <Reveal key={product.id}>
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div
                  className={cn(index % 2 === 1 && "lg:order-2")}
                >
                  <ProductVisual product={product} />
                </div>
                <div className={cn(index % 2 === 1 && "lg:order-1")}>
                  <span
                    className={cn(
                      "inline-block rounded-sm border px-2 py-0.5 font-mono text-xs uppercase tracking-wider",
                      isLive
                        ? "border-brand/40 text-brand"
                        : "border-border text-muted-foreground"
                    )}
                  >
                    {isLive
                      ? t("products.statusLive")
                      : t("products.statusDev")}
                  </span>
                  <h3 className="mt-4 font-display text-2xl lg:text-3xl font-semibold tracking-tight">
                    {t(`products.items.${product.id}.name`)}
                  </h3>
                  <p className="mt-1 text-base text-muted-foreground">
                    {t(`products.items.${product.id}.tagline`)}
                  </p>
                  <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                    {t(`products.items.${product.id}.description`)}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-sm border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={150}>
        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" to="/products">
            {t("home.products.cta")}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
