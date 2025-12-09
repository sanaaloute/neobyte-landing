"use client";

import { Hero } from "@/components/hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getIcon } from "@/lib/icon-map";

const values = [
  {
    icon: "Target",
    title: "Innovation First",
    description:
      "We stay ahead of the curve by embracing cutting-edge technologies and innovative solutions.",
  },
  {
    icon: "Users",
    title: "Client-Centric",
    description:
      "Your success is our success. We build long-term partnerships based on trust and results.",
  },
  {
    icon: "Award",
    title: "Excellence",
    description:
      "We strive for perfection in every project, delivering high-quality solutions that exceed expectations.",
  },
  {
    icon: "Zap",
    title: "Agility",
    description:
      "Fast-paced development with agile methodologies to deliver value quickly and iteratively.",
  },
  {
    icon: "Heart",
    title: "Passion",
    description:
      "We love what we do, and it shows in the quality and dedication we bring to every project.",
  },
  {
    icon: "Shield",
    title: "Security",
    description:
      "Security is built into every solution from the ground up, protecting your data and users.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <Hero
        title="About Neobyte Technology"
        subtitle="We're a team of passionate engineers, designers, and AI experts dedicated to building intelligent software solutions."
        primaryCTA={{ text: "Get in Touch", href: "/contact" }}
        secondaryCTA={{ text: "View Services", href: "/services" }}
      />

      <section className="py-16 lg:py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Neobyte Technology, we believe in the power of artificial intelligence
                and innovative software to solve complex business challenges. Our mission
                is to democratize AI technology and make it accessible to businesses of
                all sizes, enabling them to automate processes, enhance customer
                experiences, and drive growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-b from-blue-50 to-blue-600 dark:from-blue-900 dark:to-blue-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = getIcon(value.icon);
              return (
                <Card key={value.title} className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white dark:text-black" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {value.description}
                    </CardDescription>
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
