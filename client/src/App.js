import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home'
import Cart from './pages/Cart'
import Account from './pages/Account'
import Login from './pages/Login'
import Register from './pages/Register'

import './scss/main.scss'

function App() {
	return (
		<>
			<ToastContainer />
			<MainLayout>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/Cart' element={<Cart />} />
					<Route path='/Account' element={<Account />} />
					<Route path='/Login' element={<Login />} />
					<Route path='/Register' element={<Register />} />

					<Route path='*' element={<Navigate to='/' replace />} />
				</Routes>
			</MainLayout>
		</>
	)
}

export default App
