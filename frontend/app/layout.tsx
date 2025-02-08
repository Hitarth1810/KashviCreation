import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang='en'>
			<body>
				<Navbar />
				<div className='w-full h-[2px] bg-gradient-to-r from-transparent via-[#ff9933] to-transparent '></div>
				{children}
				<Footer />
			</body>
		</html>
	);
}
