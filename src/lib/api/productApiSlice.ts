import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: () => ({
                url: "/product",
                method: "GET",
            }),
        }),
        fetchProductById: builder.query({
            query: (id) => ({
                url: `/product/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useFetchProductsQuery,
    useFetchProductByIdQuery,
    useLazyFetchProductByIdQuery
} = productApiSlice;