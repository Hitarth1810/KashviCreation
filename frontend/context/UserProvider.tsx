"use client";

import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
interface Address {
	
		pincode: string
		address: string
		area: string
		landmark: string
		city: string,
		state: string,
		isDefault: boolean,
		instructions: string | null,
	
}
interface UserContextType {
	cart: string[];
	wishlist: string[];
	shippingAddress: Address | null;
	getShippingAddress: (id: string) => Promise<Address[] | null>;
	setShippingAddress: (address: Address) => Promise<boolean>;
	addToCart: (productId: string) => Promise<void>;
	removeFromCart: (productId: string) => Promise<void>;
	clearCart: () => void;
	addToWishlist: (productId: string) => Promise<void>;
	removeFromWishlist: (productId: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [cart, setCart] = useState([]);
	const [wishlist, setWishlist] = useState([]);
	const [shippingAddress, setShippingAddressState] = useState<Address | null>(null);

	const { user } = useAuth();
	// Load cart from API on mount
	useEffect(() => {
		if (user) {
			getShippingAddress().then((address) => {
				if (address) setShippingAddressState(address);
			});
		}
	}, [user]);
	
	useEffect(() => {
		if (!user) return;

		const fetchCart = async () => {
			try {
				const res = await axios.get(
					`/api/protected/user/cart?userId=${user.id}`
				);
				if (res.status === 200) {
					const data = res.data;
					setCart(data);
				}
			} catch (error) {
				console.error("Error fetching cart:", error);
			}
		};
		fetchCart();

		const fetchWishlist = async () => {
			try {
				const res = await axios.get(
					`/api/protected/user/wishlist?userId=${user.id}`
				);
				if (res.status === 200) {
					const data = res.data;
					setWishlist(data);
				}
			} catch (e) {
				console.error("Error fetching wishlist:", e);
			}
		};
		fetchWishlist();
	}, [user]);

	const addToCart = async (productId: string) => {
		try {
			const res = await axios.post("/api/protected/user/cart", {productId,quantity: 1 });
			console.log(res)
			if (res.status === 200) {
				const data = res.data
				console.log(data)
				setCart(data.Cart);
			}
		} catch (error) {
			console.error("Error adding to cart:", error);
		}
	};

	const removeFromCart = async (id: string) => {
		try {
			const res = await axios("/api/protected/user/cart", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				data: { productId: id },
			});
			if (res.status === 200) {
				const data = res.data;
				setCart(data);
			}
		} catch (error) {
			console.error("Error removing from cart:", error);
		}
	};

	const clearCart = () => {
		setCart([]);
	};

	const addToWishlist = async (productId: string) => {
		try {
			const res = await axios("/api/protected/user/wishlist", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				data: { productId },
			});
			if (res.status === 200) {
				const data = res.data;
				setWishlist(data);
			}
		} catch (error) {
			console.error("Error adding to cart:", error);
		}
	};

	const removeFromWishlist = async (id: string) => {
		try {
			const res = await axios("/api/protected/user/wishlist", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				data: { productId: id },
			});
			if (res.status === 200) {
				const data = res.data;
				setWishlist(data);
			}
		} catch (error) {
			console.error("Error removing from cart:", error);
		}
	};
	

	const getShippingAddress = async () => {
		try {
			const res = await axios.get("/api/protected/user/shipping-address");
			if (res.status === 200) {
				const address = res.data;
			setShippingAddressState(address); // Store in state
			return address;
			}
		} catch (error) {
			console.error("Error fetching shipping address:", error);
		}
		return null;
	};

	const setShippingAddress = async (address: Address) => {
		try {
		  console.log('Sending address data:', address); // Debug log
		  const res = await axios.post("/api/protected/user/shipping-address", address, {
			headers: {
			  'Content-Type': 'application/json'
			},
			withCredentials: true
		  });
		  
		  if (res.status === 200) {
			setShippingAddressState(address); // Update state with new address
			return true;
		  }
		  return false;
		} catch (error) {
		  if (axios.isAxiosError(error)) {
			console.error('Axios error details:', {
			  message: error.message,
			  response: error.response?.data,
			  status: error.response?.status
			});
			
			// Handle specific error cases
			if (error.response?.status === 400) {
				throw new Error(error.response.data.message || 'Invalid address data');
			  } else if (error.response?.status === 401) {
				throw new Error('Please login to save address');
			  }
			}
			throw new Error('Failed to save address');
		}
	  };

	return (
		<UserContext.Provider
			value={{
				cart,
				wishlist,
				shippingAddress,
				addToCart,
				removeFromCart,
				clearCart,
				addToWishlist,
				removeFromWishlist,
				getShippingAddress,
				setShippingAddress
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within an UserProvider");
	}
	return context;
};
