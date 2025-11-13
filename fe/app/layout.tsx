import type { Metadata } from "next";
import {herbik, cutiveMono} from "@/lib/fonts";
import {client} from "@/lib/sanity";
import {collectionsQuery} from "@/lib/queries";
import {Collection} from "@/lib/types";
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

  return (
    <html lang="en">
      <body
        className={`${herbik.variable} ${cutiveMono.variable} antialiased`}
      >
        <CartProvider>
          <ClientLayout collections={collections}>
            {children}
          </ClientLayout>
        </CartProvider>
      </body>
    </html>
  );
}
