"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Eyebrow } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { submitContact } from "@/lib/api";
import { contactInfo, serviceOptions } from "@/data/contact";

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
    website: "", // honeypot — must stay empty
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await submitContact({
        ...formData,
        lang: i18n.language?.toLowerCase().startsWith("fr") ? "fr" : "en",
      });

      if (response.success) {
        setSubmitStatus({
          type: "success",
          message: response.message || t("contact.form.success"),
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
          website: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            response.errors?.map((err) => err.msg).join(", ") ||
            response.error ||
            t("contact.form.error"),
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: t("contact.form.networkError"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden pt-32 lg:pt-40 pb-16 lg:pb-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_30%_20%,black,transparent)]"
        />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: hero copy + contact info */}
            <Reveal>
              <Eyebrow>{t("contact.hero.eyebrow")}</Eyebrow>
              <h1 className="mt-4 font-display text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
                {t("contact.hero.title")}
              </h1>
              <p className="mt-5 max-w-xl text-base lg:text-lg text-muted-foreground leading-relaxed">
                {t("contact.hero.subtitle")}
              </p>

              <div className="mt-10 lg:mt-12">
                <h2 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {t("contact.info.title")}
                </h2>
                <ul className="mt-5 space-y-5">
                  <li className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-card">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">
                        {t("contact.info.email")}
                      </p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-card">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">
                        {t("contact.info.phone")}
                      </p>
                      <a
                        href={`tel:${contactInfo.phoneHref}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-card">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">
                        {t("contact.info.address")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {contactInfo.address}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* Right: form */}
            <Reveal delay={120}>
              <div className="rounded-lg border border-border bg-card p-6 lg:p-8">
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  {t("contact.form.title")}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {t("contact.form.description")}
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-sm font-medium mb-2 block"
                      >
                        {t("contact.form.name")} *
                      </label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Aminata Sawadogo"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="text-sm font-medium mb-2 block"
                      >
                        {t("contact.form.email")} *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="aminata.sawadogo@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium mb-2 block"
                      >
                        {t("contact.form.phone")}
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+226 70 12 34 56"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="text-sm font-medium mb-2 block"
                      >
                        {t("contact.form.company")}
                      </label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder={t("contact.form.company")}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="text-sm font-medium mb-2 block"
                    >
                      {t("contact.form.service")} *
                    </label>
                    <Select
                      id="service"
                      required
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                    >
                      <option value="" disabled>
                        {t("contact.form.selectService")}
                      </option>
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {t(option.labelKey)}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="text-sm font-medium mb-2 block"
                    >
                      {t("contact.form.message")} *
                    </label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={t("contact.form.messagePlaceholder")}
                    />
                  </div>
                  {/* Honeypot field — hidden from humans, bots fill it in */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="hidden"
                  />
                  {submitStatus.type && (
                    <div
                      className={`p-4 rounded-md text-sm ${
                        submitStatus.type === "success"
                          ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                          : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? t("contact.form.sending")
                      : t("contact.form.sendMessage")}
                    {!isSubmitting && (
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
