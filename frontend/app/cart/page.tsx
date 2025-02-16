"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, Package2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserProvider";
import { useAuth } from "@/context/AuthProvider";
import AddressForm from "@/app/components/address-form";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function CartPage() {
  const { getShippingAddress, cart, removeFromCart, clearCart } = useUser();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<
    {
      id: string;
      name: string;
      images: string[];
      colors: string[];
      quantity: number;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (cart.length === 0) {
      setIsLoading(false);
      return;
    }

    const fetchCartDetails = async () => {
      const itemCounts = cart.reduce(
        (acc: { [key: string]: number }, id: string) => {
          acc[id] = (acc[id] || 0) + 1;
          return acc;
        },
        {}
      );

      const productDetails = await Promise.all(
        Object.keys(itemCounts).map(async (id) => {
          const res = await fetch(`/api/product/${id}`);
          const data = await res.json();
          return { ...data, quantity: itemCounts[id] };
        })
      );
      setCartItems(productDetails);
      setIsLoading(false);
    };

    fetchCartDetails();
  }, [cart]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    removeFromCart(id);
  };

  const handleBuyNow = async () => {
    if (!user) {
      router.push("/login?redirect=/cart");
      return;
    }

    if ((await getShippingAddress(user.id))?.length === 0) {
      setIsAddressFormOpen(true);
      return;
    }

    clearCart();
    router.push("/myorders");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9F3EA] to-[#FAEBD7]">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Package2 className="w-16 h-16 animate-bounce text-[#8B1D3F]" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F3EA] to-[#FAEBD7]">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.header 
          className="text-center mb-12"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <h1 className="font-serif text-5xl md:text-5xl text-black mb-4 relative">
            Your Cart
            <motion.div
						initial={{ width: 0 }}
						animate={{ width: "180px" }}
						transition={{ duration: 0.8, delay: 0.3 }}
						className="h-0.5 bg-[#8B1D3F] mx-auto mt-3"
					  />
          </h1>
          <p className="text-black text-lg">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.header>

        {cartItems.length === 0 ? (
          <motion.div
            className="flex items-center justify-center min-h-[60vh]"
            variants={fadeIn}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center max-w-md w-full text-center">
              <ShoppingBag className="w-32 h-32 text-[#8B1D3F] mb-6 mx-auto" />
              <h2 className="font-serif text-3xl text-black mb-4">
                Your cart is empty
              </h2>
              <p className="text-black mb-8">
                Looks like you haven&apos;t added anything to your cart yet.
                Start shopping to fill it with amazing products!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/collections")}
                className="px-8 py-4 bg-[#8B1D3F] text-white rounded-lg hover:bg-[#6E152F] transition-colors duration-300 text-lg font-medium"
              >
                Browse Collections
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="min-h-[60vh] grid lg:grid-cols-12 gap-8 relative">
            <motion.div 
              className="lg:col-span-8"
              variants={fadeIn}
              initial="initial"
              animate="animate"
            >
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6 flex flex-col sm:flex-row gap-6">
                      <div className="relative w-full sm:w-48 aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={item.images[0] || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-contain transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-serif text-2xl text-black mb-2">
                            {item.name}
                          </h3>
                          <p className="text-black mb-4">
                            Color: {item.colors[0]}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center border-2 border-[#8B1D3F] rounded-lg overflow-hidden">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-3 hover:bg-[#F9F3EA] transition-colors"
                            >
                              <Minus size={16} className="text-black" />
                            </motion.button>
                            <span className="w-12 text-center font-medium text-black">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-3 hover:bg-[#F9F3EA] transition-colors"
                            >
                              <Plus size={16} className="text-black" />
                            </motion.button>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeItem(item.id)}
                            className="p-3 text-[#8B1D3F] hover:text-[#6E152F] transition-colors"
                          >
                            <Trash2 size={20} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="lg:col-span-4 sticky top-24 h-fit"
              variants={fadeIn}
              initial="initial"
              animate="animate"
            >
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="font-serif text-2xl text-black mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-black">
                    <span>Subtotal</span>
                    <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)} items</span>
                  </div>
                  <div className="border-t border-[#8B1D3F] pt-4">
                    <div className="flex justify-between text-lg font-medium text-black">
                      <span>Total</span>
                      <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)} items</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={handleBuyNow}
                  className="w-full bg-[#8B1D3F] text-white py-4 px-8 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl hover:bg-[#6E152F] transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {isAddressFormOpen && (
        <AddressForm
          isOpen={isAddressFormOpen}
          setIsOpen={setIsAddressFormOpen}
        />
      )}
    </div>
  );
}

export default CartPage;