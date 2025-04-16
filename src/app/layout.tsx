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
import SEO from "./components/SEO"; // ✅ Import your SEO component

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
	const pathname = usePathname();

	// Hide Navbar and Footer for admin routes
	const isAdminRoute = pathname.startsWith("/admin");

	return (
		<html lang='en' className={`${kalam.variable}`}>
			<head>
				{/* ✅ Global SEO Defaults */}
				<SEO
					title='Kashvi Creation - Elegant Sarees for Every Occasion'
					description='Discover a beautiful collection of traditional and designer sarees at Kashvi Creation. Perfect for weddings, festivals, and everyday elegance. Shop now for quality and style!'
					keywords='sarees, Indian sarees, wedding sarees, traditional sarees, designer sarees, Kashvi Creation, ethnic wear, Surat saree shop'
					url={process.env.NEXT_PUBLIC_WEBSITE_URL}
					image='public\logo1.jpg'
					author='Kashvi Creation'
				/>
			</head>
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
