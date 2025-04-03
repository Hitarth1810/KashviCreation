import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userReducer } from "./features/user/userSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			[apiSlice.reducerPath]: apiSlice.reducer,
			user: userReducer
		},

		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(apiSlice.middleware),
		devTools: process.env.NODE_ENV !== "production",
	});
};

setupListeners(makeStore().dispatch);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
