import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userData",
    initialState: {
        user: null,
        cart: [],
        wishlist: [],
        shippingAddress: null,
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
    }
})

export const { setUser, setCart, setWishlist, setShippingAddress } = userSlice.actions;
export const userReducer = userSlice.reducer;