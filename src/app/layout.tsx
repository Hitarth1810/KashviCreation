"use client";

import { Kalam } from "next/font/google";
import { AuthProvider } from "@/context/AuthProvider";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import { UserProvider } from "@/context/UserProvider";
import WhatsAppButton from "./components/WhatsAppButton";
import StoreProvider from "./StoreProvider";
import React, { Suspense } from "react";

// Initialize Kalam font
const kalam = Kalam({
	weight: ["400", "700"],
	subsets: ["devanagari"],
	variable: "--font-kalam",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname()

	// Hide Navbar and Footer for admin routes
	const isAdminRoute = pathname.startsWith("/admin");

	return (
		<html lang='en' className={`${kalam.variable}`}>
			<body>
				<StoreProvider>
					<AuthProvider>
						<UserProvider>
							<Suspense>
								{!isAdminRoute && <Navbar />}
								{!isAdminRoute && (
									<div className='w-full h-[2px] bg-gradient-to-r from-transparent via-[#ff9933] to-transparent'></div>
								)}
								<main>{children}</main>
								{!isAdminRoute && <Footer />}
								{!isAdminRoute && <WhatsAppButton />}
							</Suspense>
						</UserProvider>
					</AuthProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
