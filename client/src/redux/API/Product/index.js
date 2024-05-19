import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
	reducerPath: 'product',
	baseQuery: fetchBaseQuery({ baseUrl: '/products' }),
	endpoints: build => ({
		getProduct: build.query({
			query: id => `/${id}`,
		}),
	}),
})

export const { useGetProductQuery } = productApi
