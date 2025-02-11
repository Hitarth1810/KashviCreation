"use client"

import { motion } from "framer-motion"
import { Heart, LayoutGrid, LogOut, Package, Settings } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const recentOrders = [
    {
      id: "1",
      product: "Banarasi Silk Saree",
      status: "Delivered",
      date: "2024-02-10",
      quantity: 2,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/24341-1_page-0005.jpg-KCtZgV3N1AhKh1BHyOXND9rVkiqC7t.jpeg",
    },
    {
      id: "2",
      product: "Wedding Collection Set",
      status: "Processing",
      date: "2024-02-09",
      quantity: 1,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/24341-1_page-0005.jpg-KCtZgV3N1AhKh1BHyOXND9rVkiqC7t.jpeg",
    },
    {
      id: "3",
      product: "Designer Lehenga",
      status: "Shipped",
      date: "2024-02-08",
      quantity: 3,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/24341-1_page-0005.jpg-KCtZgV3N1AhKh1BHyOXND9rVkiqC7t.jpeg",
    },
  ]

  const wishlist = [
    {
      id: "1",
      name: "Bridal Silk Saree",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/24341-1_page-0005.jpg-KCtZgV3N1AhKh1BHyOXND9rVkiqC7t.jpeg",
    },
    {
      id: "2",
      name: "Party Wear Saree",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/24341-1_page-0005.jpg-KCtZgV3N1AhKh1BHyOXND9rVkiqC7t.jpeg",
    },
    {
      id: "3",
      name: "Festive Collection",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/24341-1_page-0005.jpg-KCtZgV3N1AhKh1BHyOXND9rVkiqC7t.jpeg",
    },
  ]

  return (
    <div className="min-h-screen bg-[#FDF7F3]">
      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 h-screen w-64 border-r bg-white p-4"
        >
          <div className="mb-8 flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NfonmaMTbzrkQHVlxYzBH39xYJFu2m.png"
              alt="Kashvi Creation Logo"
              width={40}
              height={40}
              className="rounded"
            />
            <h1 className="text-xl font-semibold">My Dashboard</h1>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors ${
                activeTab === "overview" ? "bg-[#9B2C2C]/10 text-[#9B2C2C]" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors ${
                activeTab === "orders" ? "bg-[#9B2C2C]/10 text-[#9B2C2C]" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Package className="h-4 w-4" />
              Orders
            </button>
            <button
              onClick={() => setActiveTab("wishlist")}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors ${
                activeTab === "wishlist" ? "bg-[#9B2C2C]/10 text-[#9B2C2C]" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Heart className="h-4 w-4" />
              Wishlist
            </button>
            <div className="my-4 h-px bg-gray-200" />
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors ${
                activeTab === "settings" ? "bg-[#9B2C2C]/10 text-[#9B2C2C]" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-red-600 transition-colors hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {activeTab === "overview" && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-lg border bg-white p-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
                      <Package className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-gray-500">+2 from last month</p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="rounded-lg border bg-white p-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-600">Wishlist Items</h3>
                      <Heart className="h-4 w-4 text-[#9B2C2C]" />
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-gray-500">3 items on sale</p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-lg border bg-white p-6"
                >
                  <h2 className="text-lg font-semibold">Recent Orders</h2>
                  <p className="text-sm text-gray-500">Your recent purchases and their status</p>
                  <div className="mt-4 space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src={order.image || "/placeholder.svg"}
                              alt={order.product}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{order.product}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Qty: {order.quantity}</p>
                          <p
                            className={`text-sm ${
                              order.status === "Delivered"
                                ? "text-green-600"
                                : order.status === "Processing"
                                  ? "text-orange-600"
                                  : "text-blue-600"
                            }`}
                          >
                            {order.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-lg border bg-white p-6"
                >
                  <h2 className="text-lg font-semibold">Wishlist</h2>
                  <p className="text-sm text-gray-500">Items you&apos;ve saved for later</p>
                  <div className="mt-4 flex gap-4 overflow-x-auto pb-4">
                    {wishlist.map((item) => (
                      <div key={item.id} className="w-[250px] shrink-0 rounded-lg border bg-white p-4">
                        <div className="relative aspect-square overflow-hidden rounded-lg">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <h3 className="mt-2 font-medium">{item.name}</h3>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            {activeTab === "settings" && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg border bg-white p-6"
              >
                <h2 className="text-lg font-semibold">Account Settings</h2>
                <p className="text-sm text-gray-500">Manage your account details and security</p>

                <div className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        defaultValue="kashvi_user"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#9B2C2C] focus:outline-none focus:ring-1 focus:ring-[#9B2C2C]"
                      />
                    </div>
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#9B2C2C] focus:outline-none focus:ring-1 focus:ring-[#9B2C2C]"
                      />
                    </div>
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#9B2C2C] focus:outline-none focus:ring-1 focus:ring-[#9B2C2C]"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#9B2C2C] focus:outline-none focus:ring-1 focus:ring-[#9B2C2C]"
                      />
                    </div>
                    <button className="rounded-md bg-[#9B2C2C] px-4 py-2 text-white hover:bg-[#9B2C2C]/90">
                      Update Account
                    </button>
                  </div>

                  <div className="h-px bg-gray-200" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        defaultValue="user@example.com"
                        disabled
                        className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500 shadow-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        defaultValue="+91 9876543210"
                        disabled
                        className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500 shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

