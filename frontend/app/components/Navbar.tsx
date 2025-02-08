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
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-[#FFFAF0] shadow-md sticky top-0 z-50">
      {/* MOBILE NAVBAR */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/">
          <div className="text-2xl tracking-wide">Kashvi</div>
        </Link>
        <Menu />
      </div>

      {/* DESKTOP NAVBAR */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* LEFT SIDE */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex">
              <Image src={Logo || "/placeholder.svg"} alt="logo" className="opacity-90" priority />
              <Image src={LogoLetter || "/placeholder.svg"} alt="logoletter" className="opacity-90 pl-2" priority />
            </div>
          </Link>
          <div className="hidden xl:flex gap-8">
            <Link href="/">Home</Link>
            <Link href="/">NewIn</Link>
            <Link href="/">Collections</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
            <Link href="/" className="hover:text-gray-600 transition">Home</Link>
            <Link href="/" className="hover:text-gray-600 transition">NewIn</Link>
            <Link href="/" className="hover:text-gray-600 transition">Collections</Link>
            <Link href="/" className="hover:text-gray-600 transition">About</Link>
            <Link href="/" className="hover:text-gray-600 transition">Contact</Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-end gap-6">
          <div className="flex-1 flex justify-end">
            <SearchBar />
          </div>
          <NavIcons />
        </div>
      </div>
    </div>
  )
}

export default Navbar
