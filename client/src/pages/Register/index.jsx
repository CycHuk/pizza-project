import React from 'react'
import InputMask from 'react-input-mask'
import { Link, useNavigate } from 'react-router-dom'

import { useRegisterMutation, useCurrentQuery } from '../../redux/API/User'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import style from './Register.module.scss'

const Register = () => {
	const [register] = useRegisterMutation()

	const navigate = useNavigate()

	const { data } = useCurrentQuery()

	if (data) {
		navigate('/')
	}

	const initialFormData = {
		name: '',
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
			await register({ ...formData }).unwrap()
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
			<h2 className={style.title}>Регистрация</h2>
			<form className={style.form} onSubmit={handleSubmit}>
				<div className={style.inputGroup}>
					<label htmlFor='name'>Имя</label>
					<input
						type='text'
						id='name'
						name='name'
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>
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
					<button type='submit'>Регистрация</button>
					<button type='button'>
						<Link to='/login'>Войти</Link>
					</button>
				</div>
			</form>
		</main>
	)
}

export default Register
