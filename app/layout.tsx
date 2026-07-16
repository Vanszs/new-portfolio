import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Bevan - Portfolio | AI/ML Engineer & Full-Stack Developer",
    template: "%s | Bevan - Portfolio"
  },
  description:
    "Bevantyo Satria Pinandhita (Bevan) - AI/ML Engineer, Full-Stack & Blockchain Developer, and Autonomous Systems Specialist. Hire for custom web app development, machine learning models, and smart contract solutions.",
  keywords: [
    "programmer",
    "web developer",
    "full stack developer",
    "software engineer",
    "AI engineer",
    "machine learning developer",
    "blockchain developer",
    "smart contract developer",
    "Bevantyo Satria Pinandhita",
    "Bevan Satria",
    "Next.js developer",
    "react developer",
    "hire developer",
    "Indonesia programmer",
    "freelance coder",
    "autonomous systems"
  ],
  authors: [{ name: "Bevantyo Satria Pinandhita" }],
  creator: "Bevantyo Satria Pinandhita",
  publisher: "Bevantyo Satria Pinandhita",
  metadataBase: new URL("https://bevansatria.my.id"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bevan - Portfolio | AI/ML Engineer & Full-Stack Developer",
    description: "Bevantyo Satria Pinandhita - AI/ML Engineer, Full-Stack & Blockchain Developer, and Autonomous Systems Specialist portfolio.",
    url: "https://bevansatria.my.id",
    siteName: "Bevantyo Satria Pinandhita Portfolio",
    images: [
      {
        url: "/portfolio-updated.png",
        width: 1200,
        height: 630,
        alt: "Bevan Portfolio Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bevan - Portfolio | AI/ML Engineer & Full-Stack Developer",
    description: "Bevantyo Satria Pinandhita - AI/ML Engineer, Full-Stack & Blockchain Developer, and Autonomous Systems Specialist portfolio.",
    images: ["/portfolio-updated.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Bevantyo Satria Pinandhita",
    "alternateName": "Bevan Satria",
    "url": "https://bevansatria.my.id",
    "image": "https://bevansatria.my.id/portfolio-updated.png",
    "sameAs": [
      "https://github.com/Vanszs"
    ],
    "jobTitle": "AI/ML Engineer, Full-Stack & Blockchain Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "description": "Bevantyo Satria Pinandhita (Bevan) - AI/ML Engineer, Full-Stack & Blockchain Developer, and Autonomous Systems Specialist portfolio."
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
