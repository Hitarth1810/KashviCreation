"use client"
import Link from "next/link"
import Menu from "./Menu"
import SearchBar from "./SearchBar"
import NavIcons from "./NavIcons"
import Image from "next/image"
import Logo from "@/public/KCLogo.png"
import LogoLetter from "@/public/KCLogoLetter.png"

const Navbar = () => {
  return (
    <nav className="h-16 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 bg-gradient-to-r from-[#FFFAF0] to-[#FFF5E6] shadow-lg sticky top-0 z-50">
      {/* MOBILE NAVBAR */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={Logo || "/placeholder.svg"} alt="logo" width={40} height={40} className="opacity-90" priority />
          <span className="text-2xl font-semibold tracking-wide text-gray-800">Kashvi</span>
        </Link>
        <Menu />
      </div>

      {/* DESKTOP NAVBAR */}
      <div className="hidden md:flex items-center justify-between h-full">
        {/* LEFT SIDE */}
        <div className="flex items-center space-x-8 ">
          <Link href="/" className="flex items-center space-x-3 mr-4">
            <Image src={Logo || "/placeholder.svg"} alt="logo" width={40} height={50} className="opacity-90" priority />
            <Image
              src={LogoLetter || "/placeholder.svg"}
              alt="logoletter"
              width={90}
              height={30}
              className="opacity-90"
              priority
            />
          </Link>

          <div className="hidden lg:flex space-x-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/collections">Collections</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <NavLink href="/blog">Blogs</NavLink>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-6">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out border-b-2 border-transparent hover:border-gray-900"
  >
    {children}
  </Link>
)

export default Navbar

