"use client";

import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  LogOut,
  Menu,
  Package,
  Settings,
  X,
  User,
  MapPin,
  Plus,
  Edit,
  Star,
  Trash2,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import AddressForm from "../components/address-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { RootState } from "@/lib/store";
import {
  useGetOrdersQuery,
  useAddToCartMutation,
  useGetShippingAddressQuery,
  useRemoveFromWishlistMutation,
} from "@/lib/api/userDataApiSlice";

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  category: string;
}
interface Address {
  id: string;
  pincode: string;
  address: string;
  area: string;
  landmark: string;
  city: string;
  state: string;
  isDefault: boolean;
  instructions: string | null;
}
interface OrderItem {
  id: string;
  name: string;
  images: string[];
  colors: string[];
}

interface Order {
  id: string;
  products: OrderItem[];
  status: "PENDING" | "CONFIRMED" | "COMPLETE" | "CANCELLED";
  date: string;
}

export default function Dashboard() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  //const { wishlist, removeFromWishlist, addToCart, getShippingAddress } = useUser();
  const user  = useSelector((state: RootState) => state.user.user);
  const { wishlist} = useSelector((state: RootState) => state.user);
  const { data: orders = [], isLoading: loadingOrders } = useGetOrdersQuery(user?.id, { skip: !user?.id });
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToCart] = useAddToCartMutation();
  const { data: addresseData } = useGetShippingAddressQuery(user.id);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState("personal");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const router = useRouter();

  useEffect(() => {
  console.log("ORDERS:", orders);
}, [orders]);

  useEffect(() => {
    setAddresses(addresseData);
  }, [router, addresseData]);

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

  const [, setEditingAddress] = useState<Address | null>(null);

  useEffect(() => {
  console.log("User ID:", user?.id);
  console.log("Orders:", orders);
  console.log("Loading:", loadingOrders);
}, [user, orders, loadingOrders]);

  return (
    <div className="min-h-screen bg-[#FDF7F3]">
      {/* Mobile Menu Button - Outside sidebar */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-20 left-4 z-50 p-2 bg-white rounded-lg shadow-md md:hidden"
        >
          <Menu className="h-6 w-6 text-[#9B2C2C]" />
        </button>
      )}

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen ||
            (typeof window !== "undefined" && window.innerWidth >= 768)) && (
            <motion.aside
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`fixed md:sticky top-0 h-screen w-64 border-r bg-white z-40 ${
                isSidebarOpen ? "block" : "hidden md:block"
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
                    <h1 className="text-xl font-semibold text-[#9B2C2C]">
                      My Dashboard
                    </h1>
                  </div>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => handleTabChange("orders")}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors ${
                      activeTab === "orders"
                        ? "bg-[#9B2C2C]/10 text-[#9B2C2C]"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Package className="h-4 w-4" />
                    My Orders
                  </button>
                  <button
                    onClick={() => handleTabChange("wishlist")}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors ${
                      activeTab === "wishlist"
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
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors ${
                      activeTab === "settings"
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
            {activeTab === "orders" && (
              <motion.div
                key={activeTab}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-lg font-semibold text-[#8B1D3F] mb-4">
                  My Orders
                </h2>

                <AnimatePresence mode="wait" >
                  <div className="space-y-6">
                    {loadingOrders ? (
                      <div className="flex items-center justify-center py-20 text-gray-500">
                        Loading your orders...
                      </div>
                    ) : Array.isArray(orders) && orders.length > 0 ? (
                      orders.map((order: Order, index: number) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.1 }}
                          className="rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                          <div
                            className="flex items-center justify-between p-4 cursor-pointer"
                            onClick={() =>
                              setExpandedOrder((prev) =>
                                prev === order.id ? null : order.id
                              )
                            }
                          >
                            <div className="flex items-center gap-4">
                              <div className="relative w-20 aspect-square">
                                <Image
                                  src={
                                    order.products[0]?.images?.[0] ||
                                    "/placeholder.svg"
                                  }
                                  alt="Order product"
                                  width={80}
                                  height={80}
                                  className="object-cover rounded-lg"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-gray-600">
                                  Order ID: {order.id}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {new Date(order.date).toLocaleDateString()}
                                </p>
                                <div className="mt-2 flex flex-col gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-700 font-medium">
                                      Status:
                                    </span>
                                    <span
                                      className={`flex items-center gap-2 ${
                                        order.status === "COMPLETE"
                                          ? "text-green-600"
                                          : order.status === "CONFIRMED"
                                          ? "text-amber-600"
                                          : "text-red-600"
                                      } font-medium`}
                                    >
                                      {order.status === "COMPLETE" && (
                                        <CheckCircle size={16} />
                                      )}
                                      {order.status === "PENDING" && (
                                        <Clock size={16} />
                                      )}
                                      {order.status === "CANCELLED" && (
                                        <XCircle size={16} />
                                      )}
                                      {order.status}
                                    </span>
                                  </div>

                                  {/* Status Notes */}
                                  {order.status === "PENDING" && (
                                    <div className="bg-yellow-100 text-yellow-800 text-sm rounded-xl px-4 py-2 shadow-inner border border-yellow-300 mt-1">
                                      📩 You’ll receive an invoice via email once your
                                order is confirmed by the admin.
                                    </div>
                                  )}
                                  {order.status === "CONFIRMED" && (
                                    <div className="bg-yellow-100 text-yellow-800 text-sm rounded-xl px-4 py-2 shadow-inner border border-yellow-300 mt-1">
                                      📩 Your order has been successfully placed, and an invoice has been sent to your registered email address.
                                <br className="hidden sm:block" />
                                🕵️‍♂️ Don’t forget to check your spam folder too!
                                    </div>
                                  )}
                                  {order.status === "CANCELLED" && (
                                    <div className="bg-yellow-100 text-yellow-800 text-sm rounded-xl px-4 py-2 shadow-inner border border-yellow-300 mt-1">
                                      📩 Sorry, your order has been cancelled. Please contact the store for more information.
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            {expandedOrder === order.id ? (
                              <ChevronUp size={24} />
                            ) : (
                              <ChevronDown size={24} />
                            )}
                          </div>

                          {/* Order items collapsible */}
                          <AnimatePresence>
                            {expandedOrder === order.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-gray-200"
                              >
                                {order.products.map(
                                  (item: OrderItem, itemIndex: number) => (
                                    <div
                                      key={item.id}
                                      className={`p-4 flex items-center gap-4 ${
                                        itemIndex !== order.products.length - 1
                                          ? "border-b border-gray-200"
                                          : ""
                                      }`}
                                    >
                                      <div className="relative w-16 aspect-square">
                                        <Image
                                          src={
                                            item.images[0] || "/placeholder.svg"
                                          }
                                          alt={item.name}
                                          fill
                                          className="object-cover rounded-lg"
                                        />
                                      </div>
                                      <div>
                                        <h3 className="font-medium text-gray-900">
                                          {item.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                          Color: {item.colors?.[0] || "N/A"}
                                        </p>
                                      </div>
                                    </div>
                                  )
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-10 text-gray-500">
                        You haven&apos;t placed any orders yet.
                      </div>
                    )}
                  </div>
                </AnimatePresence>
              </motion.div>
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
                <h2 className="text-lg font-semibold mb-6">Account Settings</h2>

                <div className="flex border-b mb-6">
                  <button
                    onClick={() => setActiveSettingsTab("personal")}
                    className={`flex items-center px-4 py-2 border-b-2 ${
                      activeSettingsTab === "personal"
                        ? "border-[#9B2C2C] text-[#9B2C2C]"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Personal Info
                  </button>
                  {addresses.map((address, index) => (
                    <button
                      key={address.id}
                      onClick={() =>
                        setActiveSettingsTab(`address-${address.id}`)
                      }
                      className={`flex items-center px-4 py-2 border-b-2 ${
                        activeSettingsTab === `address-${address.id}`
                          ? "border-[#9B2C2C] text-[#9B2C2C]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Address {index + 1}
                      {address.isDefault && (
                        <Star className="w-3 h-3 ml-1 text-yellow-500" />
                      )}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setShowAddressForm(true);
                      setEditingAddress(null);
                    }}
                    className="flex items-center px-4 py-2 text-[#9B2C2C] hover:bg-[#9B2C2C]/10 rounded-lg ml-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Address
                  </button>
                </div>

                {activeSettingsTab === "personal" ? (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Personal Information
                      </h3>
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          defaultValue={user?.name}
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
                      <button className="rounded-md bg-[#9B2C2C] px-4 py-2 text-white hover:bg-[#9B2C2C]/90">
                        Update Password
                      </button>
                    </div>

                    <div className="h-px bg-gray-200" />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Contact Information
                      </h3>
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
                          defaultValue={user?.email}
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
                          defaultValue={user.phone || ""}
                          disabled
                          className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500 shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {addresses.map((address) => {
                      if (activeSettingsTab === `address-${address.id}`) {
                        function handleSetDefaultAddress(id: string): void {
                          setAddresses((prevAddresses) =>
                            prevAddresses.map((address) =>
                              address.id === id
                                ? { ...address, isDefault: true }
                                : { ...address, isDefault: false }
                            )
                          );
                        }

                        return (
                          <div key={address.id} className="space-y-4">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-medium">
                                Delivery Address
                                {address.isDefault && (
                                  <span className="ml-2 text-sm text-yellow-600 font-normal">
                                    (Default)
                                  </span>
                                )}
                              </h3>
                              <div className="space-x-2">
                                <button
                                  onClick={() => {
                                    setEditingAddress(address);
                                    setShowAddressForm(true);
                                  }}
                                  className="text-[#9B2C2C] hover:bg-[#9B2C2C]/10 p-2 rounded-lg"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                {!address.isDefault && (
                                  <button
                                    onClick={() =>
                                      handleSetDefaultAddress(address.id)
                                    }
                                    className="text-yellow-600 hover:bg-yellow-50 p-2 rounded-lg"
                                  >
                                    <Star className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                              <p className="text-gray-700">{address.address}</p>
                              <p className="text-gray-700">
                                {address.area}
                                {address.landmark &&
                                  `, Near ${address.landmark}`}
                              </p>
                              <p className="text-gray-700">
                                {address.city}, {address.state} -{" "}
                                {address.pincode}
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
                <AddressForm
                  isOpen={showAddressForm}
                  setIsOpenAction={(open) => setShowAddressForm(open)}
                />
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
