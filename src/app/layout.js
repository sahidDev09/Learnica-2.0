"use client";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

import { ClerkProvider } from "@clerk/nextjs";
import TanstackProvider from "./TanstackProvider";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavFoot =
    pathname === "/error" || pathname.startsWith("/dashboard");

  return (
    <html lang="en">
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
