import { createSlice } from '@reduxjs/toolkit'

const loadBasketFromLocalStorage = () => {
	const storedBasket = localStorage.getItem('basket')
	return storedBasket ? JSON.parse(storedBasket) : { products: [] }
}

const saveBasketToLocalStorage = basket => {
	localStorage.setItem('basket', JSON.stringify(basket))
}

const basketSlice = createSlice({
	name: 'basket',
	initialState: loadBasketFromLocalStorage(),
	reducers: {
		addItem: (state, action) => {
			const { id, price } = action.payload
			const existingProductIndex = state.products.findIndex(
				product => product.id === id
			)

			if (existingProductIndex !== -1) {
				state.products[existingProductIndex].count += 1
			} else {
				state.products.push({ id, count: 1, price })
			}

			saveBasketToLocalStorage(state)

			return state
		},
		deleteItem: (state, action) => {
			const id = action.payload
			state.products = state.products.filter(product => product.id !== id)

			saveBasketToLocalStorage(state)

			return state
		},
		decrementItem: (state, action) => {
			const id = action.payload
			const existingProductIndex = state.products.findIndex(
				product => product.id === id
			)

			if (existingProductIndex !== -1) {
				state.products[existingProductIndex].count -= 1

				if (state.products[existingProductIndex].count === 0) {
					state.products.splice(existingProductIndex, 1)
				}
			}

			saveBasketToLocalStorage(state)

			return state
		},

		clearBasket: state => {
			state.products = []
			saveBasketToLocalStorage(state)
			return state
		},
	},
})

export const selectProductCountById = productId => state => {
	const product = state.basket.products.find(
		product => product.id === productId
	)
	return product ? product.count : 0
}

export const selectBasketTotal = state => {
	return state.basket.products.reduce(
		(total, product) => total + product.count * product.price,
		0
	)
}

export const selectBasketCount = state => state.basket.products.length

export const {
	addItem,
	deleteItem,
	decrementItem,
	calculateTotal,
	clearBasket,
} = basketSlice.actions

export default basketSlice.reducer
