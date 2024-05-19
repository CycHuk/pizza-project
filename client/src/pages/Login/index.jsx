import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputMask from 'react-input-mask'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useLoginMutation, useCurrentQuery } from '../../redux/API/User'

import style from './Login.module.scss'

const Login = () => {
	let navigate = useNavigate()

	const { data } = useCurrentQuery()

	if (data) {
		navigate('/')
	}

	const [login] = useLoginMutation()

	const initialFormData = {
		phoneNumber: '',
		password: '',
	}

	const [formData, setFormData] = React.useState(initialFormData)

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await login({ ...formData }).unwrap()
			await navigate('/Account')
		} catch (error) {
			let errorMessage

			if (error.data && error.data[0] && error.data[0].msg) {
				errorMessage = error.data[0].msg
			} else if (error.data && error.data.message) {
				errorMessage = error.data.message
			} else {
				errorMessage = 'Что-то пошло не так'
			}
			toast.error(errorMessage, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
			})
		}
	}

	return (
		<main className={'container ' + style.main}>
			<h2 className={style.title}>Авторизация</h2>
			<form className={style.form} onSubmit={handleSubmit}>
				<div className={style.inputGroup}>
					<label htmlFor='phoneNumber'>Номер телефона:</label>
					<InputMask
						type='tel'
						id='phoneNumber'
						name='phoneNumber'
						value={formData.phoneNumber}
						onChange={handleChange}
						mask='+7 (999) 999-99-99'
						maskChar='_'
						required
					/>
				</div>
				<div className={style.inputGroup}>
					<label htmlFor='password'>Пароль:</label>
					<input
						type='password'
						id='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>
				<div className={style.buttonGroup}>
					<button type='submit'>Войти</button>
					<button type='button'>
						<Link to='/Register'>Регистрация</Link>
					</button>
				</div>
			</form>
		</main>
	)
}

export default Login
