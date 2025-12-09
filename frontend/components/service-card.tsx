"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getIcon } from "@/lib/icon-map";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  delay?: number;
}

export function ServiceCard({
  icon: iconName,
  title,
  description,
  href = "/services",
  delay = 0,
}: ServiceCardProps) {
  const Icon = getIcon(iconName);
  
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-white dark:text-black" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild variant="ghost">
          <Link href={href}>
            Learn More
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
