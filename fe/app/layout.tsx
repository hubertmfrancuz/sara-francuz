import type { Metadata } from "next";
import {herbik, cutiveMono} from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sara Francuz",
  description: "Designer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${herbik.variable} ${cutiveMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
