import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bevan - Portfolio",
  description:
    "Bevantyo Satria Pinandhita — AI/ML Engineer, Full-Stack & Blockchain Developer, and Autonomous Systems Specialist portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
