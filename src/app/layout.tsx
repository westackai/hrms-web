"use client";

import "./globals.css";
import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import LayoutProvider from "../app/layoutprovider";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-gray-50`}>
        <LayoutProvider>{children}</LayoutProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
