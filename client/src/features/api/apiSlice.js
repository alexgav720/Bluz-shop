import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../utils/constants"
// import { buildUrl } from "../../utils/common";


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: ({ id }) => `/products/${id}?populate=*`,
            providesTags: ['Product'],
        }),
        getProducts: builder.query({
            query: (params) => (`/products`+params),
            providesTags: ['Product'],
            invalidatesTags: ['Product'],
        }),
    }),
})

export const { useGetProductQuery, useGetProductsQuery } = apiSlice;
// export const { endpoints, reducerPath, reducer, middleware } = apiSlice