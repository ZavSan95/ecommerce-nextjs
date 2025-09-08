import type { Metadata } from "next";

import "./globals.css";
import { geistSans, geistMono, titleFont } from "@/config/fonts";

export const metadata: Metadata = {
  title: "Ecommerce | SHOP",
  description: "Descripion metadata",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
