import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/components/ReduxProvider";

export const metadata: Metadata = {
  title: "Luxura - Premium E-Commerce Catalog",
  description:
    "Discover premium quality products with our modern e-commerce catalog featuring advanced filtering, sorting, and seamless shopping experience.",
  keywords: "e-commerce, shopping, products, online store, luxury goods",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
