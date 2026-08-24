"use client";

import { Hero } from "@/components/home/hero";
import { Positioning } from "@/components/home/positioning";
import { Pillars } from "@/components/home/pillars";
import { ProductsShowcase } from "@/components/home/products-showcase";
import { Process } from "@/components/home/process";
import { Industries } from "@/components/home/industries";
import { FinalCta } from "@/components/home/cta";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Positioning />
      <Pillars />
      <ProductsShowcase />
      <Process />
      <Industries />
      <FinalCta />
    </main>
  );
}
