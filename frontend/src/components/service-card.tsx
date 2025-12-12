import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { getIcon } from "@/lib/icon-map";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
}

export function ServiceCard({
  icon: iconName,
  title,
  description,
  href = "/services",
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
        <Button variant="ghost" asChild>
          <Link to={href}>
            Learn More
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}


