import { Button } from "./ui/button";

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
}

export function Hero({
  title,
  subtitle,
  primaryCTA = { text: "Get Started", href: "/contact" },
  secondaryCTA = { text: "Learn More", href: "/about" },
}: HeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-white dark:bg-black pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-black dark:text-white">
            {title}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="default" size="lg" to={primaryCTA.href}>
              {primaryCTA.text}
            </Button>
            {secondaryCTA && (
              <Button variant="outline" size="lg" to={secondaryCTA.href}>
                {secondaryCTA.text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


