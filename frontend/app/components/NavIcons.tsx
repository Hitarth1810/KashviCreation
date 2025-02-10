"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Heart, ShoppingCart, User, LogOut, Package, UserCircle, UserPlus, LogIn } from "lucide-react"
import Cookies from "js-cookie"
import { useAuth } from "@/context/AuthProvider"
import { motion, AnimatePresence } from "framer-motion"

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [cartItems, setCartItems] = useState<number[]>([])
  const router = useRouter()
  const { user, logout } = useAuth()

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
      if (!target.closest(".profile-menu")) {
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

  const handleLogout = async () => {
    Cookies.remove("token")
    await logout()
    setIsProfileOpen(false)
    router.push("/")
  }

  const handleNavigation = (path: string) => {
    setIsProfileOpen(false)
    router.push(path)
  }

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div className="flex items-center gap-2 xl:gap-4 relative">
      {/* Wishlist Icon */}
      <Link href="/wishlist" className="p-1 text-gray-700 hover:text-blue-600 transition-colors">
        <Heart className="h-[22px] w-[22px]" />
      </Link>

      {/* Profile Dropdown */}
      <div className="profile-menu relative">
        <button
          className="p-1 text-gray-700 hover:text-blue-600 transition-colors"
          onClick={() => setIsProfileOpen((prev) => !prev)}
        >
          <User className="h-[22px] w-[22px]" />
        </button>

        {/* Enhanced Animated Dropdown */}
        <AnimatePresence>
          {isProfileOpen && (
            <>
              {/* Backdrop blur overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/5 backdrop-blur-sm z-40"
                onClick={() => setIsProfileOpen(false)}
              />

              {/* Dropdown menu */}
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-12 right-0 bg-white shadow-lg shadow-black/5 w-72 border border-gray-100 rounded-xl z-50 p-3 overflow-hidden"
              >
                {user ? (
                  <div className="space-y-2">
                    {/* User info section */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name || "User"}</p>
                      <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                    </div>

                    {/* Menu items */}
                    <div className="py-2">
                      <motion.div variants={itemVariants}>
                        <button
                          onClick={() => handleNavigation("/dashboard")}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all group"
                        >
                          <UserCircle className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          My Profile
                        </button>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <button
                          onClick={() => handleNavigation("/my-orders")}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all group"
                        >
                          <Package className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          My Orders
                        </button>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all group"
                        >
                          <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-500 transition-colors" />
                          Logout
                        </button>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 space-y-3">
                    <motion.div variants={itemVariants}>
                      <button
                        onClick={() => handleNavigation("/signup")}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
                      >
                        <UserPlus className="w-4 h-4" />
                        Sign Up
                      </button>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <button
                        onClick={() => handleNavigation("/signin")}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all border border-gray-200"
                      >
                        <LogIn className="w-4 h-4 text-gray-400" />
                        Sign In
                      </button>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Cart Icon */}
      <Link href="/cart" className="p-1 text-gray-700 hover:text-blue-600 transition-colors relative">
        <ShoppingCart className="h-[22px] w-[22px]" />
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

