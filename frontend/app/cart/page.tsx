"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserProvider";

function CartPage() {
	const { cart, removeFromCart, clearCart } = useUser();
	const [cartItems, setCartItems] = useState<{ id: string; name: string; image: string; color: string; quantity: number }[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (cart.length === 0) {
			setIsLoading(false);
			return;
		}

		const fetchCartDetails = async () => {
			const itemCounts = cart.reduce((acc: { [key: string]: number }, id: string) => {
				acc[id] = (acc[id] || 0) + 1;
				return acc;
			}, {});

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
		removeFromCart(id);
	};

	const handleBuyNow = () => {
		clearCart();
		router.push("/myorders");
	};

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100'>
				<motion.div
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
				>
					<ShoppingBag className='w-12 h-12 animate-bounce text-amber-800' />
				</motion.div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8'>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className='max-w-4xl mx-auto'
			>
				<header className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold text-amber-800 mb-4'>
						Shopping Cart
					</h1>
				</header>

				<motion.div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8'>
					<AnimatePresence mode='wait'>
						{cartItems.length === 0 ? (
							<div className='text-center py-12'>
								<ShoppingBag className='w-16 h-16 mx-auto text-amber-800/30 mb-4' />
								<p className='text-xl text-amber-800/50 font-medium'>
									Your cart is empty
								</p>
							</div>
						) : (
							<div className='space-y-6'>
								{cartItems.map((item) => (
									<motion.div
										key={item.id}
										className='flex items-center gap-6 p-4 bg-white shadow-lg rounded-xl'
									>
										<div className='relative w-32 aspect-[3/4]'>
											<Image
												src={item.image || "/placeholder.svg"}
												alt={item.name}
												fill
												className='object-cover rounded-lg'
											/>
										</div>
										<div className='flex-1 space-y-2'>
											<h3 className='text-xl font-semibold text-gray-900'>
												{item.name}
											</h3>
											<p className='text-amber-700 font-medium'>
												Color: {item.color}
											</p>
											<div className='flex items-center gap-4'>
												<div className='flex items-center border rounded-full'>
													<button
														onClick={() => updateQuantity(item.id, -1)}
														className='p-2'
													>
														<Minus size={16} />
													</button>
													<span className='w-12 text-center font-medium'>
														{item.quantity}
													</span>
													<button
														onClick={() => updateQuantity(item.id, 1)}
														className='p-2'
													>
														<Plus size={16} />
													</button>
												</div>
												<button
													onClick={() => removeItem(item.id)}
													className='text-red-400'
												>
													<Trash2 size={20} />
												</button>
											</div>
										</div>
									</motion.div>
								))}

								<button
									onClick={handleBuyNow}
									className='mt-8 w-full bg-amber-500 text-white py-3 px-6 rounded-full shadow-lg'
								>
									Buy Now
								</button>
							</div>
						)}
					</AnimatePresence>
				</motion.div>
			</motion.div>
		</div>
	);
}

export default CartPage;
