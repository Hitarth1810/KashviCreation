"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

interface CartItem {
  id: number
  name: string
  image: string
  color: string
  quantity: number
}

function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      const cartWithDetails = parsedCart.map((itemId: number) => ({
        id: itemId,
        name: `Elegant Saree ${itemId}`,
        image: `/saree-${(itemId % 4) + 1}.jpg`,
        color: ["Royal Blue", "Deep Red", "Emerald Green", "Golden"][itemId % 4],
        quantity: 1,
      }))
      setCartItems(cartWithDetails)
    }
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 800)
  }, [])

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  const updateQuantity = (id: number, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item)),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]")
    localStorage.setItem("cart", JSON.stringify(currentCart.filter((itemId: number) => itemId !== id)))
  }

  const handleBuyNow = () => {
    const currentOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const newOrders = [...currentOrders, ...cartItems.map((item) => item.id)]
    localStorage.setItem("orders", JSON.stringify(newOrders))
    localStorage.removeItem("cart")
    setCartItems([])
    router.push("/myorders")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-amber-800">
          <ShoppingBag className="w-12 h-12 animate-bounce" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-amber-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Shopping Cart
          </motion.h1>
          <motion.div
            className="h-1 w-24 bg-amber-800 mx-auto rounded-full"
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
            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-12"
              >
                <ShoppingBag className="w-16 h-16 mx-auto text-amber-800/30 mb-4" />
                <p className="text-xl text-amber-800/50 font-medium">Your cart is empty</p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col md:flex-row items-start md:items-center gap-6 p-4 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Product Image with Hover Effect */}
                    <div className="relative w-full md:w-32 aspect-[3/4] group">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300 rounded-lg" />
                    </div>

                    {/* Product Details with Enhanced Typography */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">{item.name}</h3>
                        <p className="text-amber-700 font-medium">Color: {item.color}</p>
                      </div>

                      {/* Quantity Controls with Animation */}
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="flex items-center border-2 border-amber-200 rounded-full bg-amber-50/50"
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.button
                            whileHover={{ backgroundColor: "rgb(254 243 199)" }}
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 rounded-l-full transition-colors"
                          >
                            <Minus size={16} className="text-amber-800" />
                          </motion.button>
                          <span className="w-12 text-center font-medium text-amber-900">{item.quantity}</span>
                          <motion.button
                            whileHover={{ backgroundColor: "rgb(254 243 199)" }}
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 rounded-r-full transition-colors"
                          >
                            <Plus size={16} className="text-amber-800" />
                          </motion.button>
                        </motion.div>

                        <motion.button
                          whileHover={{ scale: 1.1, color: "rgb(220 38 38)" }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 p-2 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 size={20} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Buy Now Button */}
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#f59e0b" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBuyNow}
                  className="mt-8 w-full bg-amber-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors duration-300 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
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

