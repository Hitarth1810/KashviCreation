import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
const BASE_URL = "/api";

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
});

export const apiSlice = createApi({
	baseQuery,
	endpoints: () => ({}),
});


