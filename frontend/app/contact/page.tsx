"use client";

import { Hero } from "@/components/hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

const services = [
  "AI Software Development",
  "AI Chatbots with RAG",
  "AI Agents & Automation",
  "Mobile App Development",
  "Web App Development",
  "Desktop App Development",
  "Security Systems",
  "Cloud & DevOps",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
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
      const { submitContact } = await import("@/lib/api");
      const response = await submitContact(formData);

      if (response.success) {
        setSubmitStatus({
          type: "success",
          message: response.message || "Thank you for your message! We'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            response.errors?.map((e) => e.msg).join(", ") ||
            response.error ||
            "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <Hero
        title="Get In Touch"
        subtitle="Ready to start your project? Let's discuss how we can help transform your business."
        primaryCTA={{ text: "Schedule a Call", href: "#" }}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="text-sm font-medium mb-2 block">
                          Name *
                        </label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="text-sm font-medium mb-2 block">
                          Email *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="text-sm font-medium mb-2 block">
                          Phone
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+1 (234) 567-890"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="text-sm font-medium mb-2 block">
                          Company
                        </label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          placeholder="Your Company"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="service" className="text-sm font-medium mb-2 block">
                        Service Needed *
                      </label>
                      <Select
                        required
                        value={formData.service}
                        onValueChange={(value) =>
                          setFormData({ ...formData, service: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="message" className="text-sm font-medium mb-2 block">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    {submitStatus.type && (
                      <div
                        className={`p-4 rounded-md ${
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
                      variant="gradient"
                      className="w-full group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      {!isSubmitting && (
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white dark:text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a
                        href="mailto:neobytech.ai@gmail.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        neobytech.ai@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-white dark:text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a
                        href="tel:+22673528252"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +226 73528252
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white dark:text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        Saaba
                        <br />
                        Ouagadougou
                        <br />
                        Burkina Faso
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
