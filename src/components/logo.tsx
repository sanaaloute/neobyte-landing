import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  // Render the "NeoByte" wordmark next to the mark.
  withWordmark?: boolean;
}

// Company logo: the head mark, navy on light theme and white on dark theme.
export function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/brand/logo-mark.png"
        alt="NeoByte Technology"
        width={32}
        height={32}
        className="h-8 w-8 dark:hidden"
        priority
      />
      <Image
        src="/brand/logo-mark-white.png"
        alt=""
        aria-hidden="true"
        width={32}
        height={32}
        className="hidden h-8 w-8 dark:block"
        priority
      />
      {withWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight">
          NeoByte
        </span>
      )}
    </span>
  );
}
