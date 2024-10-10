"use client";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { ReactLenis } from "/src/lib/lenis.jsx";
import { ClerkProvider } from "@clerk/nextjs";
import TanstackProvider from "./TanstackProvider";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavFoot =
    pathname === "/error" || pathname.startsWith("/dashboard");

  return (
    <ClerkProvider>
      <html lang="en">
        <ReactLenis root>
          <body>
            <TanstackProvider>
              {!hideNavFoot && <Navbar />}
              {children}
              {!hideNavFoot && <Footer />}
            </TanstackProvider>
          </body>
        </ReactLenis>
      </html>
    </ClerkProvider>
  );
}
