"use client"
import { AuthProvider } from "@/context/AuthProvider";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current route

  // Hide Navbar and Footer for admin routes
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {!isAdminRoute && <Navbar />} {/* Show Navbar only if not on admin route */}
          {!isAdminRoute && (
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#ff9933] to-transparent"></div>
          )}
          <main>{children}</main>
          {!isAdminRoute && <Footer />} {/* Show Footer only if not on admin route */}
        </AuthProvider>
      </body>
    </html>
  );
}
