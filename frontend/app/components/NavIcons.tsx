"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Heart, ShoppingCart, User } from "lucide-react"

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const router = useRouter()
  const isLoggedIn = false // This should be replaced with your actual authentication logic

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
      <button className="text-foreground">
        <ShoppingCart className="h-[22px] w-[22px]" />
        <span className="sr-only">Cart</span>
      </button>
      
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

