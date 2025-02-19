"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ShoppingBag, CheckCircle, Clock, XCircle, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "@/context/UserProvider"
import { useAuth } from "@/context/AuthProvider"
import { Status } from "@prisma/client"

interface OrderItem {
  id: string
  name: string
  images: string[]
  colors: string[]
}

interface Order {
  id: string
  products: OrderItem[]
  status: Status
  date: string
}

export default function OrdersPage() {
  const { user } = useAuth()
  const { getOrders } = useUser()
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Dummy data for demonstration
  // const dummyOrders: Order[] = [
  //   {
  //     id: "ORD-2024-001",
  //     status: "Processing",
  //     date: "2024-02-19",
  //     items: [
  //       {
  //         id: "1",
  //         name: "Classic White T-Shirt",
  //         image: "/api/placeholder/400/400",
  //         color: "White"
  //       },
  //       {
  //         id: "2",
  //         name: "Denim Blue Jeans",
  //         image: "/api/placeholder/400/400",
  //         color: "Blue"
  //       }
  //     ]
  //   },
  //   {
  //     id: "ORD-2024-002",
  //     status: "Delivered",
  //     date: "2024-02-18",
  //     items: [
  //       {
  //         id: "3",
  //         name: "Leather Jacket",
  //         image: "/api/placeholder/400/400",
  //         color: "Black"
  //       },
  //       {
  //         id: "4",
  //         name: "Cotton Sweater",
  //         image: "/api/placeholder/400/400",
  //         color: "Gray"
  //       }
  //     ]
  //   }
  // ]

  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getOrders(user!.id)
        setOrders(orders)
      } catch (error) {
        console.error("Error fetching orders:", error)
      }
    }
    fetchOrders()
    setTimeout(() => setIsLoading(false), 800)
  }, [getOrders, user])

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

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
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Order Header */}
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => toggleOrder(order.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 aspect-square">
                        <Image
                          src={order.products[0]?.images[0] || "/placeholder.svg"}
                          alt="First item"
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Order ID: {order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-gray-700 font-medium">Status:</span>
                          <span className={`flex items-center gap-2 ${
                            order.status === Status.COMPLETE ? "text-green-600" : 
                            order.status === Status.CONFIRMED ? "text-amber-600" : 
                            "text-red-600"
                          } font-medium`}>
                            {order.status === Status.COMPLETE && <CheckCircle size={16} />}
                            {order.status === Status.PENDING && <Clock size={16} />}
                            {order.status === Status.CANCELLED && <XCircle size={16} />}
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    {expandedOrder === order.id? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>

                  {/* Order Items */}
                  <AnimatePresence>
                    {expandedOrder === order.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-200"
                      >
                        {order.products.map((item, itemIndex) => (
                          <div 
                            key={item.id}
                            className={`p-4 flex items-center gap-4 ${
                              itemIndex !== order.products.length - 1 ? "border-b border-gray-200" : ""
                            }`}
                          >
                            <div className="relative w-16 aspect-square">
                              <Image
                                src={item.images[0] || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{item.name}</h3>
                              <p className="text-sm text-gray-600">Color: {item.colors[0]}</p>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}