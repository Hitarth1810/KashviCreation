import { apiSlice } from "./apiSlice";

export const userDataApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
        fetchCart: builder.query({
            query: () => ({
                url: "/protected/user/cart",
                method: "GET",
            }),
        }),
        fetchWishlist: builder.query({
            query: () => ({
                url: "/protected/user/wishlist",
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
                params: {productId},
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
			query: () => ({
				url: "/protected/user/shipping-address",
				method: "GET",
			}),
		}),
        setShippingAddress: builder.mutation({
            query: (address: {
                name: string;
                address: string;
                city: string;
                state: string;
                country: string;
                zipCode: string;
            }) => ({
                url: "/protected/user/shipping-address",
                method: "POST",
                body: address,
            }),
        }),
        sendOrder: builder.mutation({
            query: (orderId: string) => ({
                url: `/protected/user/order/${orderId}`,
                method: "POST",
            }),
        }),
        getOrders: builder.query({
            query: () => ({
                url: "/protected/user/orders",
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
} = userDataApiSlice;