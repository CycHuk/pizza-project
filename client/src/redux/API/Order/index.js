import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
	reducerPath: 'order',
	baseQuery: fetchBaseQuery({ baseUrl: '/order' }),
	endpoints: build => ({
		addOrder: build.mutation({
			query: body => ({
				url: '/addOrder',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Order' }],
		}),
		getOrder: build.query({
			query: () => '/',
			providesTags: id => [{ type: 'Order', id }],
		}),
	}),
})

export const { useAddOrderMutation, useGetOrderQuery } = orderApi
