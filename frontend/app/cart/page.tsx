"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserProvider"
import { motion, AnimatePresence } from "framer-motion"

function CartPage() {
  const { cart, removeFromCart, clearCart } = useUser()
  const [cartItems, setCartItems] = useState<
    { id: string; name: string; images: string[]; colors: string[]; quantity: number }[]
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
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
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
          animate={{ scale: 1, opacity: 1, rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, ease: "easeInOut", times: [0, 0.2, 0.8, 1], repeat: Number.POSITIVE_INFINITY }}
        >
          <ShoppingBag className="w-24 h-24 text-amber-800" />
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.header
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">Your Shopping Cart</h1>
          <motion.div
            className="h-1 w-24 bg-amber-800 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        </motion.header>

        <motion.div
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {cartItems.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ShoppingBag className="w-24 h-24 mx-auto text-amber-800/30 mb-6" />
                </motion.div>
                <p className="text-2xl text-amber-800/70 font-medium mb-4">Your cart is empty</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/collections")}
                  className="px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors duration-300"
                >
                  Continue Shopping
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="items" className="space-y-6">
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-6 p-4 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative w-32 aspect-[3/4]">
                        <Image
                          src={item.images[0] || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-amber-700 font-medium">Color: {item.colors[0]}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border-2 border-amber-500 rounded-full overflow-hidden">
                            <motion.button
                              whileHover={{ backgroundColor: "#FDE68A" }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 transition-colors duration-200"
                            >
                              <Minus size={16} className="text-amber-700" />
                            </motion.button>
                            <span className="w-12 text-center font-medium text-amber-800">{item.quantity}</span>
                            <motion.button
                              whileHover={{ backgroundColor: "#FDE68A" }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 transition-colors duration-200"
                            >
                              <Plus size={16} className="text-amber-700" />
                            </motion.button>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1, color: "#EF4444" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 transition-colors duration-200"
                          >
                            <Trash2 size={20} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBuyNow}
                  className="mt-12 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 px-8 rounded-full shadow-lg text-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                >
                  Buy Now
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CartPage

