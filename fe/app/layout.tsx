import type { Metadata } from "next";
import {herbik, cutiveMono} from "@/lib/fonts";
import {client} from "@/lib/sanity";
import {collectionsQuery, contactInfoQuery} from "@/lib/queries";
import {Collection, ContactInfo} from "@/lib/types";
import ClientLayout from "./components/ClientLayout";
import {CartProvider} from "./context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sara Francuz",
  description: "Designer Portfolio",
};

// Revalidate collections every 24 hours (they rarely change)
export const revalidate = 86400

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const collections: Collection[] = await client.fetch(
    collectionsQuery,
    {},
    {
      next: { revalidate: 86400, tags: ['collections'] }
    }
  );

  const contactInfo: ContactInfo = await client.fetch(
    contactInfoQuery,
    {},
    {
      next: { revalidate: 86400, tags: ['about-page'] }
    }
  );

  return (
    <html lang="en">
      <body
        className={`${herbik.variable} ${cutiveMono.variable} antialiased`}
      >
        <CartProvider>
          <ClientLayout collections={collections} contactInfo={contactInfo}>
            {children}
          </ClientLayout>
        </CartProvider>
      </body>
    </html>
  );
}
