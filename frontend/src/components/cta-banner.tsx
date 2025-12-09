import { Button } from "./ui/button";

interface CTABannerProps {
  title: string;
  description: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
}

export function CTABanner({
  title,
  description,
  primaryCTA = { text: "Get Started", href: "/contact" },
  secondaryCTA,
}: CTABannerProps) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-blue-50 to-blue-600 dark:from-blue-900 dark:to-blue-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">{description}</p>
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


