"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductMockup, PhoneFrame } from "@/components/product-mockup";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

// Builds a live screenshot URL for a product website via the Microlink API.
// Used only when a product has no checked-in local screenshots.
function screenshotUrl(url: string): string {
  const params = new URLSearchParams({
    url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    "viewport.width": "1440",
    "viewport.height": "900",
  });
  return `https://api.microlink.io/?${params.toString()}`;
}

function BrowserChrome({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-border" />
      <span className="h-2.5 w-2.5 rounded-full bg-border" />
      <span className="h-2.5 w-2.5 rounded-full bg-border" />
      {label && (
        <span className="ml-3 font-mono text-[10px] text-muted-foreground">
          {label}
        </span>
      )}
      <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-brand">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
        live
      </span>
    </div>
  );
}

interface ProductGalleryProps {
  images: string[];
  label?: string;
  visual: Product["visual"];
  className?: string;
}

// Slidable gallery of real product screenshots inside browser chrome.
// Falls back to the abstract ProductMockup if every image fails to load.
export function ProductGallery({
  images,
  label,
  visual,
  className,
}: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const [failedAll, setFailedAll] = useState(false);

  const go = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) => (i + dir + images.length) % images.length),
    [images.length]
  );

  if (failedAll || images.length === 0) {
    return (
      <ProductMockup visual={visual} label={label} className={className} />
    );
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      className={cn(
        "group overflow-hidden rounded-lg border border-border bg-secondary/50 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <BrowserChrome label={label} />
      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={src} className="relative h-full w-full shrink-0">
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
                loading={i === 0 ? "eager" : "lazy"}
                onError={() => {
                  if (images.length === 1) setFailedAll(true);
                }}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 p-1.5 text-muted-foreground shadow-sm transition-all hover:bg-background hover:text-foreground sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 p-1.5 text-muted-foreground shadow-sm transition-all hover:bg-background hover:text-foreground sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Go to image ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index
                      ? "w-5 bg-brand"
                      : "w-1.5 bg-foreground/25 hover:bg-foreground/40"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface ProductVisualProps {
  product: Product;
  className?: string;
}

// Phone-frame gallery of real app screenshots. Falls back to the abstract
// phone mockup if every image fails to load.
function ProductPhoneGallery({
  images,
  visual,
  className,
}: {
  images: string[];
  visual: Product["visual"];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [failedAll, setFailedAll] = useState(false);

  const go = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) => (i + dir + images.length) % images.length),
    [images.length]
  );

  if (failedAll) {
    return (
      <ProductMockup visual={visual} formFactor="phone" className={className} />
    );
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      className="group relative outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <PhoneFrame className={className}>
        <div className="relative h-full w-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((src, i) => (
              <div key={src} className="relative h-full w-full shrink-0">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 80vw, 300px"
                  className="object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  onError={() => {
                    if (images.length === 1) setFailedAll(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </PhoneFrame>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 p-1.5 text-muted-foreground shadow-sm transition-all hover:bg-background hover:text-foreground sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 p-1.5 text-muted-foreground shadow-sm transition-all hover:bg-background hover:text-foreground sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index
                    ? "w-5 bg-brand"
                    : "w-1.5 bg-foreground/25 hover:bg-foreground/40"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Real screenshots when available, abstract mockup otherwise. Web products
// render in browser chrome, mobile-app products in a phone frame. Prefers
// checked-in local screenshots; falls back to a live Microlink capture for
// web products when none exist.
export function ProductVisual({ product, className }: ProductVisualProps) {
  const label = product.label ?? product.link?.replace(/^https?:\/\//, "");
  if (product.formFactor === "phone") {
    if (product.screenshots?.length) {
      return (
        <ProductPhoneGallery
          images={product.screenshots}
          visual={product.visual}
          className={className}
        />
      );
    }
    return (
      <ProductMockup
        visual={product.visual}
        formFactor="phone"
        className={className}
      />
    );
  }
  const images =
    product.screenshots?.length
      ? product.screenshots
      : product.link
        ? [screenshotUrl(product.link)]
        : [];
  if (images.length > 0) {
    return (
      <ProductGallery
        images={images}
        label={label}
        visual={product.visual}
        className={className}
      />
    );
  }
  return (
    <ProductMockup visual={product.visual} label={label} className={className} />
  );
}
