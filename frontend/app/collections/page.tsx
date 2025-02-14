"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Product } from "@/types/product"

export default function Collections() {
  const [cart, setCart] = useState<string[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
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
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
  }, [])

  useEffect(() => {
    axios.get("/api/product")
      .then(response => {
        setSarees(response.data)
        setIsLoading(false)
      })
      .catch(error => console.error("Error fetching products:", error))
  }, [])

  const addToCart = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setCart([...cart, id])
  }

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f3ea] to-[#FAEBD7]">
      <div className="pt-6 pb-12 text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-serif tracking-wide text-gray-800">
            Our Collection
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "180px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-[#8B1D3F] mx-auto mt-3"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 max-w-[2000px] mx-auto">
        <AnimatePresence>
          {!isLoading && sarees.map((saree) => (
            <motion.div
              key={saree.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative group bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <Link href={`/productpage/${saree.id}`}>
                <div className="relative">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <Image
                      src={saree.images[0] || "/placeholder.svg"}
                      alt={saree.name}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>

                  {/* Desktop Hover Overlay - Hidden on Mobile */}
                  <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:block hidden">
                    <button
                      onClick={(e) => toggleWishlist(e, saree.id)}
                      className="absolute top-2 left-2 p-2"
                    >
                      <Heart
                        size={24}
                        className={`${wishlist.includes(saree.id) 
                          ? "fill-[#8B1D3F] stroke-[#8B1D3F]" 
                          : "stroke-white"}`}
                      />
                    </button>
                  </div>
                </div>

                <div className="pl-1.5 pr-1.5 pt-2 pb-1.5 bg-[#fcfbf7]">
                  <h2 className="text-gray-800 text-base font-medium mb-1 truncate">
                    {saree.name}
                  </h2>
                  <p className="text-gray-600 text-sm line-height-0.5 mb-2 line-clamp-3">
                    D.No.{saree.id}
                  </p>
                  
                  {/* Mobile Button Layout */}
                  <div className="flex gap-2 md:hidden">
                    {cart.includes(saree.id) ? (
                      <Link href="/cart" className="flex-1">
                        <button className="w-full bg-[#8B1D3F] text-white border border-[#8B1D3F] py-2 px-4 rounded-sm text-sm hover:bg-[#8B1D3F] hover:text-white transition-colors duration-300">
                          View Cart
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={(e) => addToCart(e, saree.id)}
                        className="flex-1 bg-white text-[#8B1D3F] border border-[#8B1D3F] py-2 px-4 rounded-sm text-sm hover:bg-[#8B1D3F] hover:text-white transition-colors duration-300"
                      >
                        Add to Cart
                      </button>
                    )}
                    <button
                      onClick={(e) => toggleWishlist(e, saree.id)}
                      className="bg-white border border-[#8B1D3F] p-2 rounded-sm hover:text-white transition-colors duration-300"
                    >
                      <Heart
                        size={20}
                        className={`${wishlist.includes(saree.id) 
                          ? "fill-red-500 stroke-red-500" 
                          : "stroke-[#8B1D3F]"}`}
                      />
                    </button>
                  </div>

                  {/* Desktop Button Layout */}
                  <div className="hidden md:block">
                    {cart.includes(saree.id) ? (
                      <Link href="/cart">
                        <button className="w-full bg-white text-[#8B1D3F] border border-[#8B1D3F] py-2 px-4 rounded-sm text-sm hover:bg-[#8B1D3F] hover:text-white transition-colors duration-300">
                          View Cart
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={(e) => addToCart(e, saree.id)}
                        className="w-full bg-white text-[#8B1D3F] border border-[#8B1D3F] py-2 px-4 rounded-sm text-sm hover:bg-[#8B1D3F] hover:text-white transition-colors duration-300"
                      >
                        Add to Cart
                      </button>
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