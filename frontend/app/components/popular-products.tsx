"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import type React from "react";

interface Product {
  id: number;
  name: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Multi Color Net Embroidered Set",
    image:
      "https://res.cloudinary.com/diujpbja7/image/upload/v1739209833/24341-2_ljehuw.jpg",
  },
  {
    id: 2,
    name: "Green Quilted Jacket And Pant Set",
    image: "/dummy2.jpg",
  },
  {
    id: 3,
    name: "Yellow Silk Floral Embroidered Bundi",
    image: "/dummy3.jpeg",
  },
  {
    id: 4,
    name: "Wine Pure Banarasi Silk Lehenga Choli",
    image: "/dummy4.jpg",
  },
];

export function PopularProducts() {
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  const toggleWishlist = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative bg-gradient-to-b from-white to-[#FFF5E9] px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 xl:px-16 2xl:px-32">
      {/* Simplified Indian-style heading */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          {/* Decorative paisley design */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#8B1D3F" className="hidden sm:block">
            <path d="M12 0C8.5 0 6.5 2.5 6.5 5.5c0 2 1.5 4 3.5 5.5-2-1.5-3.5-3.5-3.5-5.5C6.5 2.5 8.5 0 12 0z"/>
          </svg>
          <h2 
            className="font-serif text-2xl sm:text-3xl tracking-wide relative"
            style={{ fontFamily: "Tenor Sans, serif" }}
          >
            Best Sellers
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-[#8B1D3F]"></div>
          </h2>
          {/* Mirrored paisley */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#8B1D3F" className="hidden sm:block transform scale-x-[-1]">
            <path d="M12 0C8.5 0 6.5 2.5 6.5 5.5c0 2 1.5 4 3.5 5.5-2-1.5-3.5-3.5-3.5-5.5C6.5 2.5 8.5 0 12 0z"/>
          </svg>
        </div>
        <Link href="/">
          <motion.button 
            whileHover={{ x: 5 }}
            className="text-sm sm:text-base text-gray-600 hover:text-[#8B1D3F] pl-0 hover:cursor-pointer"
          >
            View All Collection →
          </motion.button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 md:gap-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="group w-full max-w-md mx-auto sm:max-w-none"
            whileHover={{ scale: 1.0 }}
            onHoverStart={() => setHoveredProduct(product.id)}
            onHoverEnd={() => setHoveredProduct(null)}
          >
            <div className="flex flex-col w-full">
              <Link href={`/product/${product.id}`}>
                <div className="relative w-full">
                  <svg
                    width="100%"
                    viewBox="0 0 253 383"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-all duration-500 ${
                      hoveredProduct === product.id ? 'drop-shadow-2xl scale-105' : ''
                    }`}
                  >
                    <clipPath id={`clip-path-${product.id}`}>
                      <path
                        d="M247.335 57.1045C251.599 61.5573 252 72.3043 252 72.3043V381.525H1.46753V71.8293C1.46753 71.8293 1.86867 61.0823 6.13294 56.6295C8.24985 54.4191 9.88515 53.5891 12.6645 52.3546C17.2226 50.3301 21.4669 52.3026 25.2611 49.0296C27.935 46.7231 28.6077 45.2105 29.9265 41.9047C32.5084 35.4331 30.5104 30.7418 34.1254 24.805C37.2597 19.6575 39.2037 17.7977 44.3893 14.8301C50.368 11.4087 54.4157 10.7285 61.1848 9.6052C69.2768 8.26238 82.1792 9.6052 82.1792 9.6052C82.1792 9.6052 93.0377 10.4795 99.9077 9.6052C110.77 8.2228 123.546 1.84697 126.501 0.580322C129.455 1.84697 142.698 8.69779 153.56 10.0802C160.43 10.9545 171.289 10.0802 171.289 10.0802C171.289 10.0802 184.191 8.73738 192.283 10.0802C199.052 11.2035 203.1 11.8837 209.078 15.3051C214.264 18.2727 216.208 20.1325 219.342 25.28C222.957 31.2168 220.959 35.9081 223.541 42.3797C224.86 45.6855 225.533 47.1981 228.207 49.5046C232.001 52.7776 236.245 50.805 240.803 52.8296C243.583 54.0641 245.218 54.8941 247.335 57.1045Z"
                      />
                    </clipPath>

                    {/* Brown border path */}
                    <path
                      d="M247.335 57.1045C251.599 61.5573 252 72.3043 252 72.3043V381.525H1.46753V71.8293C1.46753 71.8293 1.86867 61.0823 6.13294 56.6295C8.24985 54.4191 9.88515 53.5891 12.6645 52.3546C17.2226 50.3301 21.4669 52.3026 25.2611 49.0296C27.935 46.7231 28.6077 45.2105 29.9265 41.9047C32.5084 35.4331 30.5104 30.7418 34.1254 24.805C37.2597 19.6575 39.2037 17.7977 44.3893 14.8301C50.368 11.4087 54.4157 10.7285 61.1848 9.6052C69.2768 8.26238 82.1792 9.6052 82.1792 9.6052C82.1792 9.6052 93.0377 10.4795 99.9077 9.6052C110.77 8.2228 123.546 1.84697 126.501 0.580322C129.455 1.84697 142.698 8.69779 153.56 10.0802C160.43 10.9545 171.289 10.0802 171.289 10.0802C171.289 10.0802 184.191 8.73738 192.283 10.0802C199.052 11.2035 203.1 11.8837 209.078 15.3051C214.264 18.2727 216.208 20.1325 219.342 25.28C222.957 31.2168 220.959 35.9081 223.541 42.3797C224.86 45.6855 225.533 47.1981 228.207 49.5046C232.001 52.7776 236.245 50.805 240.803 52.8296C243.583 54.0641 245.218 54.8941 247.335 57.1045Z"
                      stroke="#8B4513"
                      strokeWidth="5"
                      fill="none"
                    />

                    <g clipPath={`url(#clip-path-${product.id})`}>
                      <rect
                        width="100%"
                        height="100%"
                        className="group-hover:fill-black group-hover:opacity-20 transition-all duration-500"
                      />
                      <foreignObject width="100%" height="100%">
                        <div className="h-full relative">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            unoptimized={true}
                          />
                          {/* Centered action buttons */}
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                              opacity: hoveredProduct === product.id ? 1 : 0,
                              y: hoveredProduct === product.id ? 0 : 20
                            }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex items-center justify-center gap-6 bg-black bg-opacity-20"
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="bg-white text-[#8B1D3F] p-3 rounded-full shadow-lg hover:bg-[#8B1D3F] hover:text-white transition-colors duration-300"
                            >
                              <Eye className="w-5 h-5" />
                            </motion.div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => toggleWishlist(e, product.id)}
                              className={`p-3 rounded-full shadow-lg transition-colors duration-300 ${
                                wishlist.includes(product.id)
                                  ? "bg-white text-red-500"
                                  : "bg-white text-[#8B1D3F] hover:bg-[#8B1D3F] hover:text-white"
                              }`}
                            >
                              <Heart
                                className="w-5 h-5"
                                fill={wishlist.includes(product.id) ? "currentColor" : "none"}
                              />
                            </motion.button>
                          </motion.div>
                        </div>
                      </foreignObject>
                    </g>
                  </svg>
                </div>
              </Link>

              {/* Product details */}
              <motion.div 
                className="mt-4 space-y-3 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-medium text-sm sm:text-base text-gray-800 line-clamp-2 min-h-[40px] group-hover:text-[#8B1D3F] transition-colors duration-300">
                  {product.name}
                </h3>
                {cart.includes(product.id) ? (
                  <Link href="/cart" className="block w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#8B1D3F] text-white text-sm 
                      hover:bg-white hover:text-[#8B1D3F] hover:border-[#8B1D3F] border 
                      transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      View Cart
                    </motion.button>
                  </Link>
                ) : (
                  <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => addToCart(e, product.id)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white text-[#8B1D3F] text-sm 
                  border border-[#8B1D3F] hover:bg-[#8B1D3F] hover:text-white 
                  transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);
}

export default PopularProducts;