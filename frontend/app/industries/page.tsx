"use client";

import { Hero } from "@/components/hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getIcon } from "@/lib/icon-map";

const industries = [
  { name: "Fintech", icon: "CreditCard" },
  { name: "Transportation and Logistics", icon: "Truck" },
  { name: "E-commerce", icon: "ShoppingCart" },
  { name: "Bank", icon: "Building2" },
  { name: "Hotel", icon: "Home" },
  { name: "E-government", icon: "Building" },
  { name: "Travel", icon: "PlaneTakeoff" },
  { name: "Healthcare", icon: "Heart" },
  { name: "Retail", icon: "Store" },
  { name: "Manufacturing", icon: "Settings" },
  { name: "Education", icon: "GraduationCap" },
  { name: "Agriculture", icon: "Leaf" },
  { name: "IoT", icon: "Wifi" },
  { name: "Media & Communication", icon: "Megaphone" },
  { name: "Artificial intelligence", icon: "Brain" },
  { name: "Insurance", icon: "Shield" },
];

export default function IndustriesPage() {
  return (
    <div className="flex flex-col">
      <Hero
        title="Industries We Serve"
        subtitle="We provide cutting-edge technology solutions tailored to diverse industries, helping businesses transform and thrive in the digital age."
        primaryCTA={{ text: "Get in Touch", href: "/contact" }}
        secondaryCTA={{ text: "View Services", href: "/services" }}
      />

      <section className="py-16 lg:py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry) => {
              const Icon = getIcon(industry.icon);
              return (
                <Card key={industry.name} className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white dark:text-black" />
                    </div>
                    <CardTitle className="text-lg">{industry.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Tailored solutions for {industry.name.toLowerCase()} industry needs.
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

