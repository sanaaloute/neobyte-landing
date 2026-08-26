import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-4 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button size="lg" to="/" className="mt-8">
          <Home className="mr-2 h-4 w-4" />
          Go home
        </Button>
      </div>
    </div>
  );
}
