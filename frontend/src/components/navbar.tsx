import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "products", href: "/products" },
  { key: "industries", href: "/industries" },
  { key: "contact", href: "/contact" },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [currentLang, setCurrentLang] = useState<"en" | "fr">(i18n.language as "en" | "fr" || "en");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const lang = (i18n.language as "en" | "fr") || "en";
    setCurrentLang(lang);
  }, [i18n.language]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-black font-bold text-lg">N</span>
            </div>
            <span className="font-display text-xl font-bold text-black dark:text-white">
              Neobyte Technology
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              aria-label="Toggle language"
              title={currentLang === "en" ? "Français" : "English"}
              className="flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{currentLang.toUpperCase()}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button variant="gradient" to="/contact">
              {t("nav.getQuote")}
            </Button>
          </div>

          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              aria-label="Toggle language"
              title={currentLang === "en" ? "Français" : "English"}
              className="flex items-center space-x-1 px-2"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium">{currentLang.toUpperCase()}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                  location.pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <div className="pt-2">
              <Button variant="gradient" to="/contact" className="w-full" onClick={() => setIsOpen(false)}>
                {t("nav.getQuote")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

