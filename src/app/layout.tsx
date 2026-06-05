import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { integralCF } from "@/styles/fonts";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Puthankada Hardware",
  description: "Quality hardware items for all your construction and renovation needs",
  icons: {
    icon: [
      { url: "/images/puthan.jpg", type: "image/jpeg" },
    ],
    apple: { url: "/images/puthan.jpg", type: "image/jpeg" },
    shortcut: "/images/puthan.jpg",
  }
};

export const viewport: Viewport = {
  themeColor: "#2e7d32",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${integralCF.variable} font-sans flex flex-col min-h-screen`}>
        <HolyLoader color="#2e7d32" />
        <Providers>
          {/* Navbar */}
          <TopNavbar />
          
          {/* Main Content - Grows to fill available space */}
          <main className="flex-1">
            {children}
          </main>
          
          {/* Footer - Always at bottom */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
