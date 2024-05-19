import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
	reducerPath: 'user',
	baseQuery: fetchBaseQuery({ baseUrl: '/users' }),
	endpoints: build => ({
		current: build.query({
			query: () => '/current',
			providesTags: (result, error, id) => [{ type: 'User', id }],
		}),

		login: build.mutation({
			query: body => ({
				url: '/login',
				method: 'POST',
				body,
			}),
		}),

		register: build.mutation({
			query: body => ({
				url: '/register',
				method: 'POST',
				body,
			}),
		}),

		logout: build.mutation({
			query: () => ({
				url: '/logout',
				method: 'GET',
			}),
			invalidatesTags: [{ type: 'User' }],
		}),

		updateUser: build.mutation({
			query: body => ({
				url: '/',
				method: 'PUT',
				body,
			}),
			invalidatesTags: [{ type: 'User' }],
		}),
	}),
})

export const {
	useCurrentQuery,
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useUpdateUserMutation,
} = userApi
