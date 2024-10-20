"use client";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import TanstackProvider from "./TanstackProvider";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavFoot =
    pathname === "/error" || pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Learnica</title>
      </head>
      <body>
        <ClerkProvider>
          <TanstackProvider>
            {!hideNavFoot && (
              <Suspense fallback={<div>...</div>}>
                <Navbar />
              </Suspense>
            )}
            {children}
            {!hideNavFoot && <Footer />}
          </TanstackProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}