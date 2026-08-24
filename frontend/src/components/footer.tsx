"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Logo } from "./logo";
import { contactInfo } from "@/data/contact";

const solutionLinks = [
  { key: "ai", href: "/services#ai" },
  { key: "software", href: "/services#software" },
  { key: "cloud", href: "/services#cloud" },
  { key: "commerce", href: "/services#commerce" },
];

const companyLinks = [
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "industries", href: "/#industries" },
  { key: "contact", href: "/contact" },
];

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="space-y-5">
            <Link href="/" aria-label="NeoByte Technology — home">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer.description")}
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phoneHref}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                {contactInfo.address}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
              {t("footer.solutions.title")}
            </h3>
            <ul className="space-y-2.5">
              {solutionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(`footer.solutions.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
              {t("footer.company.title")}
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(`footer.company.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
              {t("footer.contact.title")}
            </h3>
            <p className="font-display text-lg font-semibold tracking-tight mb-4">
              {t("nav.cta")}
            </p>
            <Button variant="outline" size="sm" to="/contact">
              {t("contact.hero.primaryCTA")}
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NeoByte Technology.{" "}
              {t("footer.copyright")}
            </p>
            <Link
              href="/policy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.legal.termsAndPolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
