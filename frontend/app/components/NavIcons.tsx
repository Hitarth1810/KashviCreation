"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Heart, ShoppingCart, User } from "lucide-react"

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [cartItems, setCartItems] = useState<number[]>([])
  const router = useRouter()
  const isLoggedIn = false // This should be replaced with your actual authentication logic

  useEffect(() => {
    // Load cart from localStorage on component mount
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }

    // Listen for storage events to update cart in real-time across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart") {
        setCartItems(JSON.parse(e.newValue || "[]"))
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/")
    } else {
      setIsProfileOpen((prev) => !prev)
    }
  }

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <button className="text-foreground">
        <Heart className="h-[22px] w-[22px]" />
        <span className="sr-only">Wishlist</span>
      </button>
      <button className="text-foreground" onClick={handleProfile}>
        <User className="h-[22px] w-[22px]" />
        <span className="sr-only">User menu</span>
      </button>
      <Link href="/cart" className="text-foreground relative">
        <ShoppingCart className="h-[22px] w-[22px]" />
        <span className="sr-only">Cart</span>
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </Link>

      {isProfileOpen && isLoggedIn && (
        <div className="absolute p-4 rounded-md top-12 right-0 bg-white shadow-md">
          <Link href="/profile" className="block mb-2">
            Profile
          </Link>
          <button className="block" onClick={() => console.log("Logout clicked")}>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default NavIcons

