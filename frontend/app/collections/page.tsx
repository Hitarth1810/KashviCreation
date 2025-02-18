"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Heart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/types/product";
import type React from "react";
import { useUser } from "@/context/UserProvider";
import { useSearchParams } from "next/navigation";

interface FilterState {
  categories: string[];
  colors: string[];
}

interface CategoryCount {
  name: string;
  count: number;
}

interface ColorCount {
  name: string;
  count: number;
}

// Separate component to handle search params
function ProductGrid({ allSarees, filters, isLoading, toggleWishlist, addToCart, cart, wishlist }: {
  allSarees: Product[];
  filters: FilterState;
  isLoading: boolean;
  toggleWishlist: (e: React.MouseEvent, id: string) => void;
  addToCart: (id: string) => void;
  cart: string[];
  wishlist: string[];
}) {
  const searchParams = useSearchParams();
  const keywords = searchParams.getAll("keywords");

  const filteredSarees = useMemo(() => {
    return allSarees.filter((saree: Product) => {
      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(saree.category);
      const colorMatch =
        filters.colors.length === 0 ||
        saree.colors.some((color) => filters.colors.includes(color));

      let keywordMatch = true;
      if (keywords.length > 0) {
        const searchableText = [
          saree.name,
          saree.id,
          saree.description,
          saree.category,
          ...saree.colors,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const searchableWords = searchableText.split(/\s+/);

        keywordMatch = keywords.every((encodedKeyword) => {
          const keyword = decodeURIComponent(encodedKeyword).toLowerCase();
          return searchableWords.some((word) => word.includes(keyword));
        });
      }

      return categoryMatch && colorMatch && keywordMatch;
    });
  }, [allSarees, filters, keywords]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
      <AnimatePresence>
        {!isLoading &&
          filteredSarees.map((saree) => (
            <motion.div
              key={saree.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative group bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <Link href={`/productpage/${saree.id}`}>
                <div className="relative">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <Image
                      src={saree.images[0] || "/placeholder.svg"}
                      alt={saree.name}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:block hidden">
                    <button
                      onClick={(e) => toggleWishlist(e, saree.id)}
                      className="absolute top-2 left-2 p-2"
                    >
                      <Heart
                        size={24}
                        className={`${
                          wishlist.includes(saree.id)
                            ? "fill-[#fd0202] stroke-[#8b1d1d00]"
                            : "stroke-white"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-[#fcfbf7]">
                  <h2 className="text-gray-800 text-sm font-medium mb-1 truncate">
                    {saree.name}
                  </h2>
                  <p className="text-gray-600 text-xs mb-2">
                    D.No.{saree.id}
                  </p>

                  <div className="flex gap-2 md:hidden">
                    {cart.includes(saree.id) ? (
                      <Link href="/cart" className="flex-1">
                        <button className="w-full bg-[#8B1D3F] text-white border border-[#8B1D3F] py-2 px-4 rounded-sm text-sm hover:bg-[#8B1D3F] hover:text-white transition-colors duration-300">
                          View Cart
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(saree.id);
                        }}
                        className="flex-1 bg-white text-[#8B1D3F] border border-[#8B1D3F] py-2 px-4 rounded-sm text-sm hover:bg-[#8B1D3F] hover:text-white transition-colors duration-300"
                      >
                        Add to Cart
                      </button>
                    )}
                    <button
                      onClick={(e) => toggleWishlist(e, saree.id)}
                      className="bg-white border border-[#8B1D3F] p-2 rounded-sm hover:text-white transition-colors duration-300"
                    >
                      <Heart
                        size={20}
                        className={`${
                          wishlist.includes(saree.id)
                            ? "fill-red-500 stroke-red-500"
                            : "stroke-[#8B1D3F]"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="hidden md:block">
                    {cart.includes(saree.id) ? (
                      <Link href="/cart">
                        <button className="w-full text-white border border-[#8B1D3F] py-2 px-4 rounded-sm text-sm bg-[#8B1D3F] hover:bg-white hover:text-[#8B1D3F] transition-colors duration-300">
                          View Cart
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(saree.id);
                        }}
                        className="w-full bg-white text-[#8B1D3F] border border-[#8B1D3F] py-2 px-4 rounded-sm text-sm hover:bg-[#8B1D3F] hover:text-white transition-colors duration-300"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}


export default function Collections() {
  const { cart, addToCart, addToWishlist, removeFromWishlist, wishlist } = useUser();

  const [isLoading, setIsLoading] = useState(true);
  const [allSarees, setAllSarees] = useState<Product[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryCount[]>([]);
  const [colors, setColors] = useState<ColorCount[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    colors: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/product`);
        const products = response.data;
        setAllSarees(products);

        const categoryMap = new Map<string, number>();
        const colorMap = new Map<string, number>();

        products.forEach((product: Product) => {
          const categoryCount = categoryMap.get(product.category) || 0;
          categoryMap.set(product.category, categoryCount + 1);

          product.colors.forEach((color) => {
            const colorCount = colorMap.get(color) || 0;
            colorMap.set(color, colorCount + 1);
          });
        });

        setCategories(
          Array.from(categoryMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => a.name.localeCompare(b.name))
        );

        setColors(
          Array.from(colorMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => a.name.localeCompare(b.name))
        );

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (wishlist.includes(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  const toggleFilter = (type: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const clearFilters = () => {
    setFilters({ categories: [], colors: [] });
  };

  // Rest of your component remains the same until the return statement

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF7F3] to-rose-50">
      {/* Header and filter sections remain the same */}
      <div className='pt-6 pb-12 text-center'>
					<motion.div
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
					>
						<h1 className='text-5xl font-serif tracking-wide text-gray-800'>
							Our Collection
						</h1>
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: "180px" }}
							transition={{ duration: 0.8, delay: 0.3 }}
							className='h-0.5 bg-[#8B1D3F] mx-auto mt-3'
						/>
					</motion.div>
				</div>

				{/* Mobile Filter Button */}
				<Suspense fallback={<div>Loading...</div>}>
					<div className='md:hidden px-2 mb-4'>
						<button
							onClick={() => setIsMobileFilterOpen(true)}
							className='flex items-center gap-2 text-gray-700 font-medium px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<line x1='21' y1='4' x2='14' y2='4'></line>
								<line x1='10' y1='4' x2='3' y2='4'></line>
								<line x1='21' y1='12' x2='12' y2='12'></line>
								<line x1='8' y1='12' x2='3' y2='12'></line>
								<line x1='21' y1='20' x2='16' y2='20'></line>
								<line x1='12' y1='20' x2='3' y2='20'></line>
								<line x1='14' y1='2' x2='14' y2='6'></line>
								<line x1='8' y1='10' x2='8' y2='14'></line>
								<line x1='16' y1='18' x2='16' y2='22'></line>
							</svg>
							<span>Filters</span>
						</button>
					</div>
				</Suspense>
      <div className="max-w-[2000px] mx-auto px-2 md:px-4">
        <div className="flex flex-col md:flex-row gap-6 relative">
          {/* Filter sidebar components remain the same */}
          <Suspense fallback={<div>Loading...</div>}>
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								className='hidden md:block w-72 flex-shrink-0'
							>
								<div className='sticky top-20 bottom-16 max-h-[calc(100vh-2rem)] overflow-y-auto'>
									<div className='bg-white rounded-xl shadow-md overflow-hidden'>
										<div className='p-6'>
											<h2 className='text-2xl font-serif tracking-wide text-gray-800 mb-6 text-center'>
												Filters
											</h2>

											<div className='space-y-8'>
												{/* Category Section */}
												<motion.div
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{ delay: 0.2 }}
													className='space-y-4'
												>
													<h3 className='text-lg font-medium text-gray-800'>
														Category
													</h3>
													<div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent' />
													<div className='space-y-3 pt-2'>
														{categories.map((category) => (
															<label
																key={category.name}
																className='flex items-center gap-3 cursor-pointer group'
															>
																<input
																	type='checkbox'
																	checked={filters.categories.includes(
																		category.name
																	)}
																	onChange={() =>
																		toggleFilter("categories", category.name)
																	}
																	className='h-5 w-5 rounded border-gray-300 text-[#8B1D3F] focus:ring-[#8B1D3F]'
																/>
																<span className='text-gray-600 group-hover:text-gray-800 transition-colors duration-200'>
																	{category.name}
																	<span className='text-gray-400 ml-1 text-sm'>
																		({category.count})
																	</span>
																</span>
															</label>
														))}
													</div>
												</motion.div>

												{/* Color Section */}
												<motion.div
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{ delay: 0.3 }}
													className='space-y-4'
												>
													<h3 className='text-lg font-medium text-gray-800'>
														Colour
													</h3>
													<div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent' />
													<div className='space-y-3 pt-2'>
														{colors.map((color) => (
															<label
																key={color.name}
																className='flex items-center gap-3 cursor-pointer group'
															>
																<div className='relative'>
																	<input
																		type='checkbox'
																		checked={filters.colors.includes(
																			color.name
																		)}
																		onChange={() =>
																			toggleFilter("colors", color.name)
																		}
																		className='peer h-5 w-5 rounded border-gray-300 text-[#8B1D3F] focus:ring-[#8B1D3F]'
																	/>
																</div>
																<span
																	className='w-5 h-5 rounded-full border border-gray-200 shadow-sm'
																	style={{ backgroundColor: color.name }}
																/>
																<span className='text-gray-600 group-hover:text-gray-800 transition-colors duration-200'>
																	{color.name}
																	<span className='text-gray-400 ml-1 text-sm'>
																		({color.count})
																	</span>
																</span>
															</label>
														))}
													</div>
												</motion.div>
											</div>

											{(filters.categories.length > 0 ||
												filters.colors.length > 0) && (
												<motion.button
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													onClick={clearFilters}
													className='mt-8 w-full py-2 px-4 text-sm text-[#8B1D3F] hover:text-white border border-[#8B1D3F] hover:bg-[#8B1D3F] rounded-lg transition-all duration-300 flex items-center justify-center gap-2'
												>
													<X size={16} />
													Clear all filters
												</motion.button>
											)}
										</div>
									</div>
								</div>
							</motion.div>
						</Suspense>
						{/* Mobile Filter Sidebar */}
						<Suspense fallback={<div>Loading...</div>}>
							<AnimatePresence>
								{isMobileFilterOpen && (
									<motion.div
										initial={{ x: "-100%" }}
										animate={{ x: 0 }}
										exit={{ x: "-100%" }}
										transition={{ type: "tween" }}
										className='fixed inset-0 z-50 bg-white md:hidden'
									>
										<div className='flex flex-col h-full'>
											<div className='flex items-center justify-between p-4 border-b'>
												<h2 className='text-lg font-medium'>Filters</h2>
												<button
													onClick={() => setIsMobileFilterOpen(false)}
													className='p-2 hover:bg-gray-100 rounded-full'
												>
													<X size={24} />
												</button>
											</div>

											<div className='flex-1 overflow-y-auto p-4'>
												<div className='mb-6'>
													<h3 className='text-lg font-medium mb-3'>Category</h3>
													<div className='space-y-3'>
														{categories.map((category) => (
															<label
																key={category.name}
																className='flex items-center gap-2'
															>
																<input
																	type='checkbox'
																	checked={filters.categories.includes(
																		category.name
																	)}
																	onChange={() =>
																		toggleFilter("categories", category.name)
																	}
																	className='rounded border-gray-300 text-[#8B1D3F] focus:ring-[#8B1D3F]'
																/>
																<span className='text-sm text-gray-600'>
																	{category.name}
																	<span className='text-gray-400 ml-1'>
																		({category.count})
																	</span>
																</span>
															</label>
														))}
													</div>
												</div>

												<div>
													<h3 className='text-lg font-medium mb-3'>Colour</h3>
													<div className='space-y-3'>
														{colors.map((color) => (
															<label
																key={color.name}
																className='flex items-center gap-2'
															>
																<input
																	type='checkbox'
																	checked={filters.colors.includes(color.name)}
																	onChange={() =>
																		toggleFilter("colors", color.name)
																	}
																	className='rounded border-gray-300 text-[#8B1D3F] focus:ring-[#8B1D3F]'
																/>
																<span
																	className='w-4 h-4 rounded-full'
																	style={{ backgroundColor: color.name }}
																/>
																<span className='text-sm text-gray-600'>
																	{color.name}
																	<span className='text-gray-400 ml-1'>
																		({color.count})
																	</span>
																</span>
															</label>
														))}
													</div>
												</div>
											</div>

											<div className='border-t p-4'>
												<div className='flex gap-4'>
													<button
														onClick={clearFilters}
														className='flex-1 py-2 border border-gray-300 rounded-md text-gray-600'
													>
														Clear all
													</button>
													<button
														onClick={() => setIsMobileFilterOpen(false)}
														className='flex-1 py-2 bg-[#8B1D3F] text-white rounded-md'
													>
														Apply
													</button>
												</div>
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</Suspense>
          <div className="flex-1">
            <Suspense fallback={<div>Loading products...</div>}>
              <ProductGrid
                allSarees={allSarees}
                filters={filters}
                isLoading={isLoading}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
                cart={cart}
                wishlist={wishlist}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}