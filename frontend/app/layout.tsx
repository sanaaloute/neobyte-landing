import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neobyte Technology | AI Software Development & Solutions",
  description:
    "Leading AI software development company specializing in AI solutions, chatbots, mobile apps, security systems, and custom software development.",
  keywords: [
    "AI software development",
    "AI chatbots",
    "mobile app development",
    "custom software",
    "cybersecurity",
    "IoT solutions",
  ],
  authors: [{ name: "Neobyte Technology" }],
  openGraph: {
    title: "Neobyte Technology | AI Software Development",
    description:
      "Building intelligent software for the future. AI solutions, chatbots, mobile apps, and custom development.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neobyte Technology | AI Software Development",
    description:
      "Building intelligent software for the future. AI solutions, chatbots, mobile apps, and custom development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}



