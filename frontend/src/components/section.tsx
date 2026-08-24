import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 lg:py-28", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

// Small mono uppercase label used above section titles, with a short brand
// rule that makes the label/headline hierarchy read as deliberate.
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[13px] font-medium uppercase tracking-[0.2em] text-brand",
        className
      )}
    >
      <span aria-hidden="true" className="h-px w-6 shrink-0 bg-brand" />
      {children}
    </p>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 lg:mb-16 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Eyebrow className={align === "center" ? "justify-center" : undefined}>
        {eyebrow}
      </Eyebrow>
      <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15] text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
