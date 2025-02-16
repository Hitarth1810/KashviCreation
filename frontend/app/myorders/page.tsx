"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ShoppingBag, CheckCircle, Clock, XCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface OrderItem {
  id: number
  name: string
  image: string
  color: string
  status: "Delivered" | "Processing" | "Cancelled"
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders)
      const ordersWithDetails = parsedOrders.map((itemId: number) => ({
        id: itemId,
        name: `Elegant Saree ${itemId}`,
        image: `/saree-${(itemId % 4) + 1}.jpg`,
        color: ["Royal Blue", "Deep Red", "Emerald Green", "Golden"][itemId % 4],
        status: ["Delivered", "Processing", "Cancelled"][itemId % 3],
      }))
      setOrders(ordersWithDetails)
    }
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 800)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FDF7F3] to-rose-50 flex items-center justify-center">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-amber-800">
          <ShoppingBag className="w-12 h-12 animate-bounce" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF7F3] to-rose-50 p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-serif text-black mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            My Orders
          </motion.h1>
          <motion.div
            className="h-0.5 w-24 bg-[#8B1D3F] mx-auto rounded-full"
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
            {orders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-12"
              >
                <ShoppingBag className="w-16 h-16 mx-auto text-amber-800/30 mb-4" />
                <p className="text-xl text-[#8B1D3F] font-medium">You have no orders</p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col md:flex-row items-start md:items-center gap-6 p-4 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Order Image with Hover Effect */}
                    <div className="relative w-full md:w-32 aspect-[3/4] group">
                      <Image
                        src={order.image || "/placeholder.svg"}
                        alt={order.name}
                        fill
                        className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300 rounded-lg" />
                    </div>

                    {/* Order Details with Enhanced Typography */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">{order.name}</h3>
                        <p className="text-[#8B1D3F] font-medium">Color: {order.color}</p>
                      </div>

                      {/* Order Status */}
                      <div className="flex items-center gap-4">
                        <span className={`flex items-center gap-2 text-${order.status === "Delivered" ? "green" : order.status === "Processing" ? "amber" : "red"}-600 font-medium`}>
                          {order.status === "Delivered" && <CheckCircle size={20} />}
                          {order.status === "Processing" && <Clock size={20} />}
                          {order.status === "Cancelled" && <XCircle size={20} />}
                          {order.status}
                        </span>
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