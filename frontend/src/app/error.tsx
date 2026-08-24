"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-3xl font-semibold tracking-tight mb-4">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mb-4">
          An unexpected error occurred. Please try again.
        </p>
        {process.env.NODE_ENV === "development" && error.stack && (
          <pre className="mb-4 p-4 bg-muted rounded text-sm text-left overflow-auto">
            {error.stack}
          </pre>
        )}
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
