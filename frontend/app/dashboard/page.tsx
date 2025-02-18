"use client";

import { useUser } from "@/context/UserProvider";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  LayoutGrid,
  LogOut,
  Menu,
  Package,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import AddressForm from "../components/address-form";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  category: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { wishlist, removeFromWishlist, addToCart } = useUser();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
  ];

  useEffect(() => {
    const fetchWishlistItems = async () => {
      if (activeTab !== "wishlist") return;

      setIsLoading(true);
      try {
        if (wishlist.length === 0) {
          setWishlistItems([]);
          return;
        }

        const productRequests = wishlist.map((id) =>
          axios.get(`/api/product/${id}`).then((res) => res.data)
        );
        const products = await Promise.all(productRequests);
        setWishlistItems(products);
      } catch (error) {
        console.error("Error fetching wishlist products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlistItems();
  }, [wishlist, activeTab]);

  const removeItem = async (id: string) => {
    removeFromWishlist(id);
    const updatedItems = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedItems);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsSidebarOpen(false); // Close sidebar on mobile when tab changes
  };

  return (
    <div className="min-h-screen bg-[#FDF7F3]">
      {/* Mobile Menu Button - Outside sidebar */}
      {!isSidebarOpen && (
  <button
    onClick={() => setIsSidebarOpen(true)}
    className="absolute top-20 left-4 z-30 p-2 bg-white rounded-lg shadow-md md:hidden"
  >
    <Menu className="h-6 w-6 text-[#9B2C2C]" />
  </button>
)}

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || (typeof window !== "undefined" && window.innerWidth >= 768)) && (
            <motion.aside
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`fixed md:sticky top-0 h-screen w-64 border-r bg-white z-40 ${isSidebarOpen ? "block" : "hidden md:block"
                }`}
            >
              {/* Close button - Absolute positioned at the top */}
              {isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="absolute top-4 right-4 p-2 text-[#9B2C2C] hover:bg-red-50 rounded-lg md:hidden"
                >
                  <X className="h-6 w-6" />
                </button>
              )}

              {/* Sidebar content with proper padding */}
              <div className="p-6 pt-20 md:pt-6 h-full overflow-y-auto">
                {/* Dashboard header */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    {/* Back button - visible only on mobile */}
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden"
                      aria-label="Close sidebar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-600"
                      >
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <h1 className="text-xl font-semibold text-[#9B2C2C]">My Dashboard</h1>
                  </div>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => handleTabChange("overview")}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors ${activeTab === "overview"
                      ? "bg-[#9B2C2C]/10 text-[#9B2C2C]"
                      : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                    Overview
                  </button>
                  <button
                    onClick={() => handleTabChange("orders")}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors ${activeTab === "orders"
                      ? "bg-[#9B2C2C]/10 text-[#9B2C2C]"
                      : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <Package className="h-4 w-4" />
                    My Orders
                  </button>

                  <button
                    onClick={() => handleTabChange("wishlist")}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors ${activeTab === "wishlist"
                      ? "bg-[#9B2C2C]/10 text-[#9B2C2C]"
                      : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <Heart className="h-4 w-4" />
                    Wishlist
                  </button>

                  <div className="my-4 h-px bg-gray-200" />
                  <button
                    onClick={() => handleTabChange("settings")}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors ${activeTab === "settings"
                      ? "bg-[#9B2C2C]/10 text-[#9B2C2C]"
                      : "text-gray-600 hover:bg-gray-100"
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
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-6 pt-16 md:pt-6">
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
                      <h3 className="text-sm font-medium text-gray-600">
                        Total Orders
                      </h3>
                      <Package className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-gray-500">
                        +2 from last month
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="rounded-lg border bg-white p-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-600">
                        Wishlist Items
                      </h3>
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
                  <p className="text-sm text-gray-500">
                    Your recent purchases and their status
                  </p>
                  <div className="mt-4 space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
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
                            <p className="text-sm text-gray-500">
                              {order.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Qty: {order.quantity}</p>
                          <p
                            className={`text-sm ${order.status === "Delivered"
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
                  <p className="text-sm text-gray-500">
                    Items you&apos;ve saved for later
                  </p>
                  <div className="mt-4 flex gap-4 overflow-x-auto pb-4">
                    {wishlistItems.map((item) => (
                      <div
                        key={item.id}
                        className="w-[250px] shrink-0 rounded-lg border bg-white p-4"
                      >
                        <div className="relative aspect-square overflow-hidden rounded-lg">
                          <Image
                            src={item.images[0] || "/placeholder.svg"}
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

            {activeTab === "wishlist" && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Heart className="w-24 h-24 animate-pulse text-[#8B1D3F]" />
                  </div>
                ) : wishlistItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <Heart
                      className="w-24 h-24 text-[#8B1D3F] mb-4"
                      strokeWidth={1.5}
                    />
                    <h2 className="text-3xl text-[#8B1D3F] font-medium mb-3">
                      Your wishlist is empty
                    </h2>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto text-center">
                      Add items to your wishlist to keep track of products you
                      love.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative group bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300"
                      >
                        <div className="relative">
                          <div className="aspect-[3/4] relative overflow-hidden">
                            <Image
                              src={item.images[0] || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="absolute top-2 right-2 p-2 text-white hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={24} />
                          </button>
                        </div>

                        <div className="p-3 bg-[#fcfbf7]">
                          <h2 className="text-gray-800 text-sm font-medium mb-1 truncate">
                            {item.name}
                          </h2>
                          <p className="text-gray-600 text-xs mb-2">
                            D.No.{item.id}
                          </p>
                          <button
                            onClick={() => addToCart(item.id)}
                            className="w-full bg-white text-[#8B1D3F] border border-[#8B1D3F] py-2 px-4 rounded-sm text-sm hover:bg-[#8B1D3F] hover:text-white transition-colors duration-300"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg border bg-white p-6"
              >
                <h2 className="text-lg font-semibold">Account Settings</h2>
                <p className="text-sm text-gray-500">
                  Manage your account details and security
                </p>

                <div className="mt-6 space-y-6">
                  {/* Address Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Delivery Address</h3>
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="w-full rounded-md bg-[#8B4513] px-4 py-2 text-white hover:bg-[#723A0F] transition-colors"
                    >
                      Add/Update Address
                    </button>
                    <AddressForm
                      isOpen={showAddressForm}
                      setIsOpen={setShowAddressForm}
                    />
                  </div>

                  <div className="h-px bg-gray-200" />

                  {/* Account Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Information</h3>
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                      >
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
                      <label
                        htmlFor="current-password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#9B2C2C] focus:outline-none focus:ring-1 focus:ring-[#9B2C2C]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#9B2C2C] focus:outline-none focus:ring-1 focus:ring-[#9B2C2C]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium text-gray-700"
                      >
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

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
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
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
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
  );
}