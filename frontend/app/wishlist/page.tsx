"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { ShoppingCart, Trash2, ExternalLink, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserProvider";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  category: string;
}

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useUser();
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        if (wishlist.length === 0) {
          setWishlistItems([]);
          setIsLoading(false);
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
  }, [wishlist]);

  const removeItem = async (id: string) => {
    removeFromWishlist(id);
    const updatedItems = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedItems);

    if (updatedItems.length === 0) {
      setWishlistItems([]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f9f3ea] to-[#FAEBD7] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-[#8B1D3F]"
        >
          <Heart className="w-24 h-24 animate-pulse" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f3ea] to-[#FAEBD7]">
      <div className="pt-6 pb-12 text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-serif tracking-wide text-gray-800">Your Wishlist</h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "180px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-[#8B1D3F] mx-auto mt-3"
          />
        </motion.div>
      </div>

      <div className="max-w-[2000px] mx-auto px-1 sm:px-4">
        <AnimatePresence mode="wait">
          {wishlistItems.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <Heart className="w-24 h-24 mx-auto text-[#8B1D3F] mb-4" strokeWidth={1.5} />
                <h2 className="text-3xl text-[#8B1D3F] font-medium mb-3">
                  Your wishlist is empty
                </h2>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Add items to your wishlist to keep track of products you love.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/collections")}
                  className="px-8 py-3 bg-[#8B1D3F] text-white text-lg font-medium rounded-lg hover:bg-[#7a1935] transition-colors duration-300"
                >
                  Explore Collections
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2">
              <AnimatePresence>
                {wishlistItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative group bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300"
                  >
                    <Link href={`/productpage/${item.id}`}>
                      <div className="relative">
                        <div className="aspect-[3/4] relative overflow-hidden">
                          <Image
                            src={item.images[0] || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        </div>

                        <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              removeItem(item.id);
                            }} 
                            className="absolute top-2 right-2 p-2 text-white hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={24} />
                          </button>
                        </div>
                      </div>

                      <div className="p-3 bg-[#fcfbf7]">
                        <h2 className="text-gray-800 text-sm font-medium mb-1 truncate">{item.name}</h2>
                        <p className="text-gray-600 text-xs mb-2">D.No.{item.id}</p>

                        {/* Mobile Button Layout */}
                        <div className="flex gap-2 md:hidden">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(item.id);
                            }}
                            className="flex-1 bg-white text-[#8B1D3F] border border-[#8B1D3F] py-2 px-4 rounded-sm text-sm hover:bg-[#8B1D3F] hover:text-white transition-colors duration-300"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              removeItem(item.id);
                            }}
                            className="bg-white border border-[#8B1D3F] p-2 rounded-sm hover:bg-[#8B1D3F] hover:text-white transition-colors duration-300"
                          >
                            <Trash2 size={20} className="stroke-[#8B1D3F] group-hover:stroke-white" />
                          </button>
                        </div>

                        {/* Desktop Button Layout */}
                        <div className="hidden md:block">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(item.id);
                            }}
                            className="w-full bg-white text-[#8B1D3F] border border-[#8B1D3F] py-2 px-4 rounded-sm text-sm hover:bg-[#8B1D3F] hover:text-white transition-colors duration-300"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}