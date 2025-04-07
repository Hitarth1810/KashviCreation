import { userDataApiSlice } from "@/lib/api/userDataApiSlice";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "userData",
	initialState: {
		user: {
			id: "",
			email: "",
			name: "",
			phone: null as number | null,
			image: "",
			role: "USER",
		},
		cart: [] as Array<string>,
		wishlist: [] as Array<string>,
		shippingAddress: [] as Array<>,
		loading: true,
		error: "",
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setCart: (state, action) => {
			state.cart = action.payload;
		},
		setWishlist: (state, action) => {
			state.wishlist = action.payload;
		},
		setShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				userDataApiSlice.endpoints.addToCart.matchFulfilled,
				(state, action) => {
					state.cart = action.payload;
				}
			)
			.addMatcher(
				userDataApiSlice.endpoints.removeFromCart.matchFulfilled,
				(state, action) => {
					state.cart = action.payload;
				}
			)
			.addMatcher(
				userDataApiSlice.endpoints.clearCart.matchFulfilled,
				(state, action) => {
					state.cart = action.payload;
				}
			)
			.addMatcher(
				userDataApiSlice.endpoints.addToWishlist.matchFulfilled,
				(state, action) => {
					state.wishlist = action.payload;
				}
			)
			.addMatcher(
				userDataApiSlice.endpoints.removeFromWishlist.matchFulfilled,
				(state, action) => {
					state.wishlist = action.payload;
				}
			)
			.addMatcher(
				userDataApiSlice.endpoints.setShippingAddress.matchFulfilled,
				(state, action) => {
					state.shippingAddress = action.payload;
				}
			);
	},
});

export const { setUser, setCart, setWishlist, setShippingAddress, setLoading } =
	userSlice.actions;
export const userReducer = userSlice.reducer;
