import { apiSlice } from "./apiSlice";

export const userDataApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchCart: builder.query({
			query: (userId: string) => ({
				url: "/protected/user/cart",
				params: { userId },
				method: "GET",
			}),
		}),
		fetchWishlist: builder.query({
			query: (userId: string) => ({
				url: "/protected/user/wishlist",
				params: { userId },
				method: "GET",
			}),
		}),
		addToCart: builder.mutation({
			query: (productId: string) => ({
				url: "/protected/user/cart",
				method: "POST",
				body: { productId },
			}),
		}),
		removeFromCart: builder.mutation({
			query: (productId: string) => ({
				url: `/protected/user/cart?productId=${productId}`,
				params: { productId },
				method: "DELETE",
			}),
		}),
		clearCart: builder.mutation({
			query: () => ({
				url: "/protected/user/cart",
				method: "DELETE",
			}),
		}),
		addToWishlist: builder.mutation({
			query: (productId: string) => ({
				url: "/protected/user/wishlist",
				method: "POST",
				body: { productId },
			}),
		}),
		removeFromWishlist: builder.mutation({
			query: (productId: string) => ({
				url: `/protected/user/wishlist?productId=${productId}`,
				method: "DELETE",
			}),
		}),
		getShippingAddress: builder.query({
			query: (userId: string) => ({
				url: "/protected/user/shipping-address",
				params: { userId },
				method: "GET",
			}),
		}),
		setShippingAddress: builder.mutation({
			query: (address: {
				pincode: string;
				address: string;
				area: string;
				landmark: string;
				city: string;
				state: string;
				isDefault: boolean;
				instructions: string | null;
			}) => ({
				url: "/protected/user/shipping-address",
				method: "POST",
				body: address,
			}),
		}),
		sendOrder: builder.mutation({
			query: (orderIds: string[]) => ({
				url: `/protected/user/order`,
				method: "POST",
				body: { products: orderIds },
			}),
		}),
		getOrders: builder.query({
			query: (userId: string) => ({
				url: "/protected/user/order",
				params: { userId },
				method: "GET",
			}),
		}),
		
	}),
});

export const {
	useFetchCartQuery,
	useFetchWishlistQuery,
	useAddToCartMutation,
	useRemoveFromCartMutation,
	useClearCartMutation,
	useAddToWishlistMutation,
	useRemoveFromWishlistMutation,
	useGetShippingAddressQuery,
	useSetShippingAddressMutation,
	useSendOrderMutation,
	useGetOrdersQuery,
	useLazyGetOrdersQuery,
} = userDataApiSlice;
