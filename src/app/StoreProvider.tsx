"use client";
import React, { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store";
import { useCheckAuthQuery } from "@/lib/api/authApiSlice";
import {
	setUser,
	setCart,
	setWishlist,
	setShippingAddress,
	setLoading,
	setUserError,
} from "@/lib/features/user/userSlice";
import {
	useFetchCartQuery,
	useFetchWishlistQuery,
	useGetShippingAddressQuery,
} from "@/lib/api/userDataApiSlice";

function DataInitializer({ store }: { store: AppStore }) {
	const { data: user, isSuccess: isAuthSuccess } = useCheckAuthQuery(undefined);
	const { data: cart } = useFetchCartQuery(user?.id, {
		skip: !isAuthSuccess || !user?.id,
	});
	const { data: wishlist } = useFetchWishlistQuery(user?.id, {
		skip: !isAuthSuccess || !user?.id,
	});
	const { data: shippingAddress } = useGetShippingAddressQuery(user?.id, {
		skip: !isAuthSuccess || !user?.id,
	});

	useEffect(() => {
		store.dispatch(setLoading(true));
		if (!isAuthSuccess) store.dispatch(setUserError(true));
		else store.dispatch(setUserError(false));

		if (user) store.dispatch(setUser(user));
		if (cart) store.dispatch(setCart(cart));
		if (wishlist) store.dispatch(setWishlist(wishlist));
		if (shippingAddress) store.dispatch(setShippingAddress(shippingAddress));
		store.dispatch(setLoading(false));
	}, [user, cart, wishlist, shippingAddress, store, isAuthSuccess]);

	return null;
}

export default function StoreProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const storeRef = useRef<AppStore>(undefined);

	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore();
	}

	return (
		<Provider store={storeRef.current}>
			<DataInitializer store={storeRef.current} />
			{children}
		</Provider>
	);
}
