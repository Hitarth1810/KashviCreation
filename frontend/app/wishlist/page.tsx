"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Trash2, ExternalLink, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface WishlistItem {
  id: number
  name: string
  image: string
  color: string
  dateAdded: string
  productUrl: string
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      const parsedWishlist = JSON.parse(savedWishlist)
      setWishlistItems(parsedWishlist)
    }
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 800)
  }, [])

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const removeItem = (id: number) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const addToCart = (item: WishlistItem) => {
    // Implement add to cart functionality here
    console.log(`Added ${item.name} to cart`)
    // You can also remove the item from wishlist if needed
    // removeItem(item.id)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-purple-800">
          <Heart className="w-12 h-12 animate-pulse" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFF5E9] p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-purple-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your Wishlist
          </motion.h1>
          <motion.div
            className="h-1 w-24 bg-purple-800 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </header>

        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {wishlistItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-12"
              >
                <Heart className="w-16 h-16 mx-auto text-purple-800/30 mb-4" />
                <p className="text-xl text-purple-800/50 font-medium">Your wishlist is empty</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-purple-600 font-medium">Color: {item.color}</p>
                      <p className="text-xs text-gray-500">Added on {item.dateAdded}</p>
                      <div className="flex justify-between items-center mt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(item)}
                          className="px-3 py-2 bg-purple-600 text-white rounded-full flex items-center space-x-1 text-sm hover:bg-purple-700 transition-colors"
                        >
                          <ShoppingCart size={16} />
                          <span>Add to Cart</span>
                        </motion.button>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1, color: "rgb(220 38 38)" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 p-2 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 size={20} />
                          </motion.button>
                          <Link href={item.productUrl} passHref>
                            <motion.a
                              whileHover={{ scale: 1.1, color: "rgb(79 70 229)" }}
                              whileTap={{ scale: 0.9 }}
                              className="text-indigo-400 p-2 hover:bg-indigo-50 rounded-full transition-colors"
                            >
                              <ExternalLink size={20} />
                            </motion.a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}

