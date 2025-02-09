"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Heart, ShoppingCart, User } from "lucide-react"

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [cartItems, setCartItems] = useState<number[]>([])
  const router = useRouter()
  const isLoggedIn = false

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart") {
        setCartItems(JSON.parse(e.newValue || "[]"))
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.profile-menu')) {
        setIsProfileOpen(false)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleProfile = () => {
    setIsProfileOpen((prev) => !prev)
  }

  const handleSignUp = () => {
    router.push("/signup")
    setIsProfileOpen(false)
  }

  const handleSignIn = () => {
    router.push("/signin")
    setIsProfileOpen(false)
  }

  return (
    <div className="flex items-center gap-2 xl:gap-4 relative">
      <Link href="/wishlist" 
        className="p-1 text-gray-700 hover:text-blue-600 transition-colors relative">
      <button className="p-1 text-gray-700 hover:text-blue-600 transition-colors">
        <Heart className="h-[22px] w-[22px]" />
        <span className="sr-only">Wishlist</span>
      </button>
      </Link>
      
      
      <div className="profile-menu relative">
        <button 
          className="p-1 text-gray-700 hover:text-blue-600 transition-colors"
          onClick={handleProfile}
          aria-expanded={isProfileOpen}
        >
          <User className="h-[22px] w-[22px]" />
          <span className="sr-only">User menu</span>
        </button>

        {isProfileOpen && !isLoggedIn && (
          <div className="absolute p-4 rounded-lg top-12 right-0 bg-white shadow-lg w-64 border border-gray-100 z-50">
            <div className="space-y-3">
              <button
                onClick={handleSignUp}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Sign Up
              </button>
              <button
                onClick={handleSignIn}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors border border-gray-200"
              >
                Sign In
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Join us to unlock exclusive features and personalized recommendations
              </p>
            </div>
          </div>
        )}

        {isProfileOpen && isLoggedIn && (
          <div className="absolute p-4 rounded-lg top-12 right-0 bg-white shadow-lg w-64 border border-gray-100">
            <Link 
              href="/profile" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              Profile
            </Link>
            <button 
              onClick={() => console.log("Logout clicked")}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <Link 
        href="/cart" 
        className="p-1 text-gray-700 hover:text-blue-600 transition-colors relative"
      >
        <ShoppingCart className="h-[22px] w-[22px]" />
        <span className="sr-only">Cart</span>
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </Link>
    </div>
  )
}

export default NavIcons