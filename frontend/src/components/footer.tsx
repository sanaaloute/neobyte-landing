import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const footerLinks = {
  company: [
    { key: "aboutUs", href: "/about" },
    { key: "services", href: "/services" },
    { key: "products", href: "/products" },
    { key: "industries", href: "/industries" },
  ],
  services: [
    { key: "aiDevelopment", href: "/services#ai" },
    { key: "mobileApps", href: "/services#mobile" },
    { key: "webDevelopment", href: "/services#web" },
    { key: "securitySystems", href: "/services#security" },
    { key: "desktopApps", href: "/services#desktop" },
  ],
  legal: [
    { key: "termsAndPolicy", href: "/policy" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
];

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-lg">N</span>
              </div>
              <span className="font-display text-xl font-bold text-black dark:text-white">
                Neobyte Technology
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(`footer.company.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(`footer.services.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Saaba, Ouagadougou, Burkina Faso
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href="mailto:neobytech.ai@gmail.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  neobytech.ai@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a
                  href="tel:+22673528252"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  +226 73528252
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Neobyte Technology. {t("footer.copyright")}
            </p>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t(`footer.legal.${link.key}`)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

