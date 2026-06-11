import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "MOHAN Foundation – E-Learning | Organ Donation & Transplantation Courses",
    template: "%s | MOHAN Foundation E-Learning",
  },
  description:
    "MOHAN Foundation's CPD-accredited e-learning platform for organ donation and transplantation. Courses for healthcare professionals, paramedical staff, and the general public. Est. 1997.",
  keywords: [
    "organ donation courses",
    "transplant coordination",
    "brainstem death certification",
    "MOHAN Foundation",
    "CPD accredited courses",
    "organ transplantation training",
    "healthcare professional courses India",
    "transplant coordinator certificate",
    "PGDTC",
    "e-learning organ donation",
  ],
  authors: [{ name: "MOHAN Foundation", url: "https://el.mohanfoundation.org" }],
  creator: "MOHAN Foundation",
  publisher: "MOHAN Foundation",
  metadataBase: new URL("https://el.mohanfoundation.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://el.mohanfoundation.org",
    siteName: "MOHAN Foundation E-Learning",
    title: "MOHAN Foundation – CPD-Accredited Organ Donation & Transplantation Courses",
    description:
      "Join thousands of healthcare professionals trained by MOHAN Foundation. CPD-accredited courses in Transplant Coordination, Brainstem Death, Legal Aspects, and more.",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "MOHAN Foundation – Multi Organ Harvesting Aid Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MOHAN Foundation – Organ Donation & Transplantation Courses",
    description:
      "CPD-accredited e-learning for healthcare professionals in organ donation and transplantation. Established 1997.",
    images: ["/logo.png"],
    creator: "@MOHANFoundation",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col relative">
        <CustomCursor />
        <Navbar />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
