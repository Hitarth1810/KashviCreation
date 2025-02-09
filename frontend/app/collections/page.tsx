"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const sarees = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  name: `Elegant Saree ${i + 1}`,
  image: `/saree-${(i % 4) + 1}.jpg`,
  
  description: "Beautiful handcrafted saree with intricate designs and vibrant colors.",
}))

export default function Collections() {
  const [cart, setCart] = useState<number[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [])

  const addToCart = (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    setCart([...cart, id])
  }

  const toggleWishlist = (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-center text-amber-800 mb-8"
      >
        Exquisite Saree Collections
      </motion.h1>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {!isLoading &&
            sarees.map((saree) => (
              <motion.div
                key={saree.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link href="/productpage" className="block">
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                    {/* Image Container */}
                    <div className="relative group">
                      <Image
                        src={saree.image || "/placeholder.svg"}
                        alt={saree.name}
                        width={400}
                        height={600}
                        className="w-full h-auto object-cover"
                      />
                      {/* Hover Effect Buttons */}
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-white text-amber-800 p-3 rounded-full shadow-md hover:bg-amber-800 hover:text-white transition-colors duration-300"
                        >
                          <Eye size={24} />
                        </motion.div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => toggleWishlist(e, saree.id)}
                          className={`p-3 rounded-full shadow-md transition-colors duration-300 ${
                            wishlist.includes(saree.id)
                              ? "bg-white text-red-500"
                              : "bg-white text-amber-800 hover:bg-amber-800 hover:text-white"
                          }`}
                        >
                          <Heart size={24} fill={wishlist.includes(saree.id) ? "currentColor" : "none"} />
                        </motion.button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">{saree.name}</h2>
                      <p className="text-gray-600 text-sm mb-4">{saree.description}</p>

                      {/* Button */}
                      {cart.includes(saree.id) ? (
                        <Link href="/cart">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-amber-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-amber-500 transition-colors duration-300 w-full"
                          >
                            View Cart
                          </motion.button>
                        </Link>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => addToCart(e, saree.id)}
                          className="bg-amber-800 text-white py-2 px-4 rounded-lg text-sm hover:bg-amber-700 transition-colors duration-300 w-full"
                        >
                          Add to Cart
                        </motion.button>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

