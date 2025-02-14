"use client"

import type React from "react"

import { useState, useEffect, useRef, type MouseEvent, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import NavIcons from "./NavIcons"
import Image from "next/image"
import { MenuIcon, X, Search } from "lucide-react"
import Logo from "@/public/KCLogo.png"
import LogoLetter from "@/public/KCLogoLetter.png"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    const handleClickOutside = (event: MouseEvent | Event) => {
      // Handle search container click outside
      if (
        searchContainerRef.current &&
        event.target instanceof Node &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setMobileSearchOpen(false)
      }

      // Handle mobile menu click outside
      if (
        mobileMenuRef.current &&
        menuButtonRef.current &&
        event.target instanceof Node &&
        !mobileMenuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const query = searchParams.get("search")
    if (query) {
      setSearchQuery(decodeURIComponent(query))
    }
  }, [])

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/collections?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setMobileSearchOpen(false)
    }
  }

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false)
  }

  const handleSearchButtonClick = () => {
    setMobileMenuOpen(false) // Close mobile menu when search is opened
    setMobileSearchOpen(true)
  }

  return (
    <div className="sticky top-0 z-50">
      <nav
        className={`relative w-full transition-all duration-300 ${
          scrolled
            ? "h-14 bg-gradient-to-r from-[#D84C7B]/90 via-[#B0325C]/90 to-[#9B2D4F]/90 shadow-lg backdrop-blur-sm"
            : "h-16 bg-gradient-to-r from-[#D84C7B] via-[#B0325C] to-[#9B2D4F]"
        }`}
      >
        {/* MOBILE AND TABLET NAVBAR (up to lg breakpoint) */}
        <div className="h-full px-4 flex items-center justify-between lg:hidden">
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src={Logo || "/placeholder.svg"}
              alt="logo"
              width={35}
              height={35}
              className="transition-all duration-300 group-hover:scale-110"
              priority
            />
            <span className="font-playfair text-xl font-semibold tracking-wide text-white">Kashvi</span>
          </Link>

          <div className="flex items-center space-x-4">
            <button onClick={handleSearchButtonClick} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Search className="w-6 h-6 text-white" />
            </button>
            <div className="flex items-center space-x-2">
              <NavIcons />
            </div>
            <button
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <MenuIcon className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Search Bar - Below navbar */}
        <div
          ref={searchContainerRef}
          className={`
            absolute w-full bg-gradient-to-r from-[#D84C7B] via-[#B0325C] to-[#9B2D4F]
            transition-all duration-300 transform 
            ${mobileSearchOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}
            lg:hidden
          `}
        >
          <form onSubmit={handleSearch} className="px-4 py-3 flex items-center space-x-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-white/20 text-white placeholder-white/70 rounded-lg px-4 py-2.5
                       focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/25"
            />
            <button
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </form>
        </div>

        {/* Mobile/Tablet Menu Dropdown */}
        <div
          ref={mobileMenuRef}
          className={`
            lg:hidden absolute top-full left-0 w-full bg-gradient-to-b from-[#8B1D3F] to-[#D84C7B] shadow-lg
            transition-all duration-300 ease-in-out transform
            ${mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}
          `}
        >
          <div className="px-4 py-6 space-y-4">
            <MobileNavLink href="/" onClick={handleMobileNavClick}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/collections" onClick={handleMobileNavClick}>
              Collections
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={handleMobileNavClick}>
              About
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={handleMobileNavClick}>
              Contact
            </MobileNavLink>
            <MobileNavLink href="/blog" onClick={handleMobileNavClick}>
              Blog
            </MobileNavLink>
          </div>
        </div>

        {/* DESKTOP NAVBAR (lg and above) */}
        <div className="hidden lg:flex items-center justify-between h-full px-8 xl:px-16 2xl:px-24">
          {/* LEFT SIDE */}
          <div className="flex items-center space-x-12">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src={Logo || "/placeholder.svg"}
                alt="logo"
                width={35}
                height={45}
                className="transition-all duration-300 group-hover:scale-110"
                priority
              />
              <Image
                src={LogoLetter || "/placeholder.svg"}
                alt="logoletter"
                width={80}
                height={25}
                className="transition-all duration-300 group-hover:scale-105"
                priority
              />
            </Link>

            <div className="flex space-x-8 font-semibold">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/collections">Collections</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
              <NavLink href="/blog">Blog</NavLink>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-6">
            {/* Desktop Search Bar */}
            <div className="relative group">
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-64 xl:w-80 2xl:w-80 bg-white/20 text-white placeholder-white/70 rounded-lg 
                           px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/30
                           transition-all duration-300 focus:bg-white/25"
                />
                <button
                  type="submit"
                  className="absolute right-2 p-1.5 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Search className="w-5 h-5 text-white" />
                </button>
              </form>
            </div>

            <div className="flex items-center space-x-3">
              <NavIcons />
            </div>
          </div>
        </div>

        {/* Animated Golden Line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden">
          <div
            className="w-full h-full bg-gradient-to-r from-[#FFD700]/40 via-[#FFD700] to-[#FFD700]/40
                         animate-shimmer"
          />
        </div>
      </nav>
    </div>
  )
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="relative font-playfair text-white hover:text-[#FFD700] transition-colors duration-300 group"
  >
    <span>{children}</span>
    <span
      className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 
                   group-hover:w-full opacity-0 group-hover:opacity-100"
    />
  </Link>
)

const MobileNavLink = ({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick: () => void
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="block font-playfair text-lg text-white/90 hover:text-[#FFD700] transition-colors duration-300 px-2 py-1
              hover:bg-white/10 rounded"
  >
    {children}
  </Link>
)

export default Navbar

