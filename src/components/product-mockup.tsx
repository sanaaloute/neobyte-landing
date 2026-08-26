import { cn } from "@/lib/utils";

// Stylized, abstract product visuals — deliberately illustrative rather than
// fake screenshots or stock photography. Rendered purely with CSS so they are
// crisp at any size and cost zero network requests.

function LegalVisual() {
  return (
    <div className="flex h-full flex-col gap-3 p-5 sm:p-6">
      {/* Query bar */}
      <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-brand" />
        <div className="h-2 w-3/5 rounded-full bg-muted" />
      </div>
      {/* Answer with citations */}
      <div className="flex flex-1 flex-col gap-3 rounded-md border border-border bg-card p-4">
        <div className="space-y-2">
          <div className="h-2 w-full rounded-full bg-muted" />
          <div className="h-2 w-11/12 rounded-full bg-muted" />
          <div className="h-2 w-4/5 rounded-full bg-muted" />
          <div className="h-2 w-3/5 rounded-full bg-muted" />
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {["Code civil", "Art. 1240", "Décret 2023"].map((label) => (
            <span
              key={label}
              className="rounded-sm border border-brand/30 bg-brand/10 px-2 py-1 font-mono text-[10px] text-brand"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      {/* Retrieved documents */}
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="space-y-1.5 rounded-md border border-border bg-card p-2.5"
          >
            <div className="h-1.5 w-2/3 rounded-full bg-brand/50" />
            <div className="h-1.5 w-full rounded-full bg-muted" />
            <div className="h-1.5 w-4/5 rounded-full bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CommerceVisual() {
  return (
    <div className="flex h-full flex-col gap-3 p-5 sm:p-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="h-2.5 w-24 rounded-full bg-foreground/70" />
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-md border border-border bg-card" />
          <div className="h-6 w-16 rounded-md bg-brand" />
        </div>
      </div>
      {/* Product grid */}
      <div className="grid flex-1 grid-cols-3 gap-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-md border border-border bg-card p-2.5"
          >
            <div className="flex-1 rounded-sm bg-muted" />
            <div className="h-1.5 w-4/5 rounded-full bg-foreground/40" />
            <div className="flex items-center justify-between">
              <div className="h-1.5 w-1/3 rounded-full bg-brand/60" />
              <div className="h-3 w-3 rounded-sm border border-border" />
            </div>
          </div>
        ))}
      </div>
      {/* Logistics strip */}
      <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
        <span className="font-mono text-[10px] text-muted-foreground">
          CAN → OUA
        </span>
        <div className="relative h-px flex-1 bg-border">
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand" />
        </div>
        <span className="font-mono text-[10px] text-brand">In transit</span>
      </div>
    </div>
  );
}

function StocksVisual() {
  return (
    <div className="flex h-full flex-col gap-3 p-5 sm:p-6">
      {/* Ticker row */}
      <div className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2">
        <span className="font-mono text-[10px] font-medium text-foreground/80">
          BRVM
        </span>
        <div className="flex gap-3">
          <span className="font-mono text-[10px] text-brand">▲ 2.4%</span>
          <span className="font-mono text-[10px] text-muted-foreground">
            ▼ 0.8%
          </span>
          <span className="font-mono text-[10px] text-brand">▲ 1.1%</span>
        </div>
      </div>
      {/* Chart */}
      <div className="relative flex-1 rounded-md border border-border bg-card p-3">
        <div className="bg-dotgrid absolute inset-3 opacity-60" />
        <svg
          className="relative h-full w-full"
          viewBox="0 0 200 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polyline
            points="0,62 25,55 50,58 75,44 100,48 125,32 150,36 175,22 200,16"
            fill="none"
            stroke="hsl(var(--brand))"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle cx="200" cy="16" r="3" fill="hsl(var(--brand))" />
        </svg>
      </div>
      {/* Chat delivery */}
      <div className="flex flex-col gap-2">
        <div className="w-4/5 self-start rounded-md rounded-bl-none border border-border bg-card px-3 py-2">
          <div className="h-1.5 w-full rounded-full bg-muted" />
          <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-muted" />
        </div>
        <div className="flex w-3/5 items-center gap-2 self-end rounded-md rounded-br-none bg-brand px-3 py-2">
          <div className="h-1.5 w-full rounded-full bg-brand-foreground/50" />
          <span className="font-mono text-[9px] text-brand-foreground">WA</span>
        </div>
      </div>
    </div>
  );
}

function BuilderVisual() {
  return (
    <div className="flex h-full flex-col gap-3 p-5 sm:p-6">
      {/* Prompt bar */}
      <div className="flex items-center gap-2 rounded-md border border-brand/40 bg-card px-3 py-2.5">
        <span className="font-mono text-[10px] text-brand">→</span>
        <div className="h-2 w-2/3 rounded-full bg-foreground/50" />
        <span className="ml-auto h-4 w-8 rounded-sm bg-brand" />
      </div>
      {/* Generated layout blocks assembling */}
      <div className="flex flex-1 flex-col gap-2.5 rounded-md border border-border bg-card p-3">
        <div className="flex items-center justify-between">
          <div className="h-2 w-16 rounded-full bg-foreground/70" />
          <div className="flex gap-1.5">
            <div className="h-1.5 w-6 rounded-full bg-muted" />
            <div className="h-1.5 w-6 rounded-full bg-muted" />
            <div className="h-1.5 w-6 rounded-full bg-muted" />
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-sm bg-muted/60">
          <div className="h-2.5 w-2/5 rounded-full bg-foreground/60" />
          <div className="h-1.5 w-3/5 rounded-full bg-muted" />
          <div className="mt-1 h-5 w-16 rounded-sm bg-brand" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-1 rounded-sm border border-border p-1.5">
              <div className="h-1.5 w-3/4 rounded-full bg-muted" />
              <div className="h-1.5 w-1/2 rounded-full bg-muted" />
            </div>
          ))}
        </div>
      </div>
      {/* Build status */}
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        <span className="font-mono text-[10px] text-muted-foreground">
          deploy · done
        </span>
        <div className="ml-auto h-1.5 w-16 rounded-full bg-muted" />
      </div>
    </div>
  );
}

const visuals = {
  legal: LegalVisual,
  commerce: CommerceVisual,
  stocks: StocksVisual,
  builder: BuilderVisual,
} as const;

interface ProductMockupProps {
  visual: "legal" | "commerce" | "stocks" | "builder";
  label?: string;
  className?: string;
}

export function ProductMockup({ visual, label, className }: ProductMockupProps) {
  const Visual = visuals[visual];
  return (
    <div
      aria-hidden="true"
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-secondary/50 shadow-sm",
        className
      )}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        {label && (
          <span className="ml-3 font-mono text-[10px] text-muted-foreground">
            {label}
          </span>
        )}
      </div>
      <div className="aspect-[16/10]">
        <Visual />
      </div>
    </div>
  );
}
