import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: () => ({
                url: "/products",
                method: "GET",
            }),
        }),
        fetchProductById: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
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