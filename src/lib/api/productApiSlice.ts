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
		fetchReviews: builder.query({
			query: (productId) => ({
				url: `/protected/user/review?productId=${productId}`,
				method: "GET",
			}),
			transformResponse: (
				response: Array<{
					id: string;
					user: { name: string };
					rating: number;
					comment: string;
					createdAt: string;
				}>
			) => {
				return response.map(
					(review: {
						id: string;
						user: { name: string };
						rating: number;
						comment: string;
						createdAt: string;
					}) => ({
						id: review.id,
						name: review.user.name,
						rating: review.rating,
						comment: review.comment,
						date: new Date(review.createdAt).toLocaleDateString(),
					})
				);
			},
		}),
		postReview: builder.mutation({
			query: (reviewData) => ({
				url: "/protected/user/review",
				method: "POST",
				body: reviewData,
			}),
		}),
	}),
});

export const {
	usePostReviewMutation,
	useFetchProductsQuery,
	useFetchProductByIdQuery,
	useLazyFetchProductByIdQuery,
	useFetchReviewsQuery,
} = productApiSlice;
