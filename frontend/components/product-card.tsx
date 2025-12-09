"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  delay?: number;
}

export function ProductCard({
  title,
  description,
  image,
  features,
  delay = 0,
}: ProductCardProps) {
  return (
    <Card className="h-full overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-b from-blue-50 to-blue-600 dark:from-blue-900 dark:to-blue-950">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">Key Features:</h4>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start">
                <span className="mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
