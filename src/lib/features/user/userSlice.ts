import { authApiSlice } from "@/lib/api/authApiSlice";
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
		shippingAddress: [] as Array<object>,
		loading: true,
		error: true,
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
		setUserError: (state, action) => {
			state.error = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(authApiSlice.endpoints.login.matchFulfilled, (state) => {
				state.error = false;
				state.loading = false;
			})
			.addMatcher(authApiSlice.endpoints.logout.matchFulfilled, (state) => {
				state.error = true;
				state.loading = true;
			})
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

export const {
	setUser,
	setCart,
	setWishlist,
	setShippingAddress,
	setLoading,
	setUserError,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
