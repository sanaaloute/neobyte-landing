"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "solutions", href: "/services" },
  { key: "products", href: "/products" },
  { key: "industries", href: "/#industries" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const currentLang = i18n.language?.toLowerCase().startsWith("fr")
    ? "fr"
    : "en";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === "en" ? "fr" : "en");
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || isOpen
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" aria-label="NeoByte Technology — home">
            <Logo />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full",
                  pathname === item.href
                    ? "text-foreground after:w-full"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              aria-label="Toggle language"
              title={currentLang === "en" ? "Français" : "English"}
              className="flex items-center gap-1.5"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">
                {currentLang.toUpperCase()}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 hidden dark:block" />
              <Moon className="h-5 w-5 dark:hidden" />
            </Button>
            <Button size="sm" to="/contact" className="ml-2">
              {t("nav.cta")}
            </Button>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              aria-label="Toggle language"
              title={currentLang === "en" ? "Français" : "English"}
              className="flex items-center gap-1 px-2"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium">
                {currentLang.toUpperCase()}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 hidden dark:block" />
              <Moon className="h-5 w-5 dark:hidden" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden border-t border-border py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-md text-base font-medium transition-colors",
                  pathname === item.href
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <div className="pt-3 px-3">
              <Button
                to="/contact"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.cta")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
