import { configureStore } from '@reduxjs/toolkit'

import searchSlice from './Slice/Search'
import basketSlice from './Slice/Basket'

import { userApi } from './API/User'
import { orderApi } from './API/Order'
import { productApi } from './API/Product'

export default configureStore({
	reducer: {
		search: searchSlice,
		basket: basketSlice,
		[userApi.reducerPath]: userApi.reducer,
		[orderApi.reducerPath]: orderApi.reducer,
		[productApi.reducerPath]: productApi.reducer,
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			userApi.middleware,
			orderApi.middleware,
			productApi.middleware
		),
})
