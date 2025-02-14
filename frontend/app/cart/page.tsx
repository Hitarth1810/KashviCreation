"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserProvider"

function CartPage() {
  const { cart, removeFromCart, clearCart } = useUser()
  const [cartItems, setCartItems] = useState<
    { id: string; name: string; image: string; color: string; quantity: number }[]
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (cart.length === 0) {
      setIsLoading(false)
      return
    }

    const fetchCartDetails = async () => {
      const itemCounts = cart.reduce((acc: { [key: string]: number }, id: string) => {
        acc[id] = (acc[id] || 0) + 1
        return acc
      }, {})

      const productDetails = await Promise.all(
        Object.keys(itemCounts).map(async (id) => {
          const res = await fetch(`/api/product/${id}`)
          const data = await res.json()
          return { ...data, quantity: itemCounts[id] }
        }),
      )
      setCartItems(productDetails)
      setIsLoading(false)
    }

    fetchCartDetails()
  }, [cart])

  const updateQuantity = (id: string, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item)),
    )
  }

  const removeItem = (id: string) => {
    removeFromCart(id)
  }

  const handleBuyNow = () => {
    clearCart()
    router.push("/myorders")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <ShoppingBag className="w-16 h-16 animate-bounce text-amber-800" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        <header className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-amber-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your Shopping Cart
          </motion.h1>
          <motion.div
            className="h-1 w-24 bg-amber-800 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </header>

        <motion.div
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {cartItems.length === 0 ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ShoppingBag className="w-24 h-24 mx-auto text-amber-800/30 mb-6" />
                <p className="text-2xl text-amber-800/70 font-medium mb-4">Your cart is empty</p>
                <button
                  onClick={() => router.push("/collections")}
                  className="px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors duration-300"
                >
                  Continue Shopping
                </button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="flex items-center gap-6 p-4 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="relative w-32 aspect-[3/4]">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-amber-700 font-medium">Color: {item.color}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border-2 border-amber-500 rounded-full overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-amber-100 transition-colors duration-200"
                          >
                            <Minus size={16} className="text-amber-700" />
                          </button>
                          <span className="w-12 text-center font-medium text-amber-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-amber-100 transition-colors duration-200"
                          >
                            <Plus size={16} className="text-amber-700" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-600 transition-colors duration-200"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <motion.button
                  onClick={handleBuyNow}
                  className="mt-12 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 px-8 rounded-full shadow-lg text-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Buy Now
                </motion.button>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CartPage