import type { Metadata } from "next";
import {herbik, cutiveMono} from "@/lib/fonts";
import {client} from "@/lib/sanity";
import {collectionsQuery} from "@/lib/queries";
import {Collection} from "@/lib/types";
import ClientLayout from "./components/ClientLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sara Francuz",
  description: "Designer Portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const collections: Collection[] = await client.fetch(collectionsQuery);

  return (
    <html lang="en">
      <body
        className={`${herbik.variable} ${cutiveMono.variable} antialiased`}
      >
        <ClientLayout collections={collections}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
