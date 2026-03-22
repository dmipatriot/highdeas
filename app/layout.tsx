import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "HIGHDEAS",
  description: "A terminal-inspired archive of AI-generated ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="scanline" />
        <Header />
        <Sidebar />
        <main className="lg:ml-64 pt-14 pb-8">
          {children}
        </main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
