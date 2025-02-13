"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { Eye, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Product } from "@/types/product"

export default function Collections() {
  const [cart, setCart] = useState<number[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sarees, setSarees] = useState<Product[]>([])

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

  useEffect(() => {
    axios.get("/api/product")
      .then(response => {
        setSarees(response.data)
        setIsLoading(false)
      })
      .catch(error => console.error("Error fetching products:", error))
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-2 sm:p-4 md:p-8">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-amber-800 mb-6"
      >
        Our Collection
      </motion.h1>

      {/* Collections Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4 max-w-screen-2xl mx-auto">
        <AnimatePresence>
          {!isLoading &&
            sarees.map((saree) => (
              <motion.div
                key={saree.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="min-h-[450px] sm:min-h-[520px] h-full"
              >
                <Link href="/productpage" className="block h-full">
                  <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-full flex flex-col rounded-lg">
                    {/* Image Container */}
                    <div className="relative group w-full ">
                      <div className="aspect-[3/4] w-full relative overflow-hidden rounded-lg">
                        <Image
                          src={saree.images[0] || "/placeholder.svg"}
                          alt={saree.name}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        />
                      </div>
                      {/* Hover Effect Buttons - Only visible on desktop */}
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg hidden lg:flex">
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
                          onClick={(e) => toggleWishlist(e, Number(saree.id))}
                          className={`p-3 rounded-full shadow-md transition-colors duration-300 ${
                            wishlist.includes(Number(saree.id))
                              ? "bg-white text-red-500"
                              : "bg-white text-amber-800 "
                          }`}
                        >
                          <Heart size={24} fill={wishlist.includes(Number(saree.id)) ? "currentColor" : "none"} />
                        </motion.button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">{saree.name}</h2>
                      <div className="flex-grow overflow-y-auto max-h-24">
                        <p className="text-gray-600 text-sm">{saree.description}</p>
                      </div>

                      {/* Buttons Container */}
                      <div className="mt-4 flex gap-2">
                        {/* Add to Cart/View Cart Button */}
                        {cart.includes(Number(saree.id)) ? (
                          <Link href="/cart" className="flex-grow">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-white text-amber-800 border border-amber-800 py-2 px-4 rounded-lg text-sm hover:bg-amber-900 hover:text-white transition-colors duration-300 w-full"
                            >
                              View Cart
                            </motion.button>
                          </Link>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => addToCart(e, Number(saree.id))}
                            className="bg-white text-amber-800 border border-amber-800 py-2 px-4 rounded-lg text-sm hover:bg-amber-900 hover:text-white transition-colors duration-300 flex-grow"
                          >
                            Add to Cart
                          </motion.button>
                        )}
                        
                        {/* Mobile Wishlist Button - Only visible on mobile/tablet */}
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => toggleWishlist(e, Number(saree.id))}
                          className={`lg:hidden p-2 rounded-lg shadow-md transition-colors duration-300 border ${
                            wishlist.includes(Number(saree.id))
                              ? "bg-white text-red-500 border-red-500"
                              : "bg-white text-amber-800 border-amber-800 hover:bg-amber-900 hover:text-white"
                          }`}
                        >
                          <Heart 
                            size={24} 
                            fill={wishlist.includes(Number(saree.id)) ? "currentColor" : "none"}
                          />
                        </motion.button>
                      </div>
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