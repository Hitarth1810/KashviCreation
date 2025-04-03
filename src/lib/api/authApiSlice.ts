import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		checkAuth: builder.query({
			query: () => ({
				url: "/auth/me",
				method: "GET",
			}),
		}),
		login: builder.mutation({
			query: (credentials: { email: string; password: string }) => ({
				url: "/auth/login",
				method: "POST",
				body: credentials,
			}),
		}),
		signup: builder.mutation({
			query: (userData: {
				email: string;
				password: string;
				phone: number;
				name: string;
			}) => ({
				url: "/auth/signup",
				method: "POST",
				body: userData,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useSignupMutation,
	useLogoutMutation,
	useCheckAuthQuery,
} = authApiSlice;
