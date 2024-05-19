import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCurrentQuery } from '../../redux/API/User'
import { useAddOrderMutation } from '../../redux/API/Order'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'
import { clearBasket } from '../../redux/Slice/Basket'

import style from './OrderForm.module.scss'

const OrderForm = ({ onClose }) => {
	const dispatch = useDispatch()
	const basket = useSelector(state => state.basket.products)
	const { data, isError, isLoading } = useCurrentQuery()
	const [addOrder] = useAddOrderMutation()
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		deliveryDate: '',
		deliveryTime: '',
		address: '',
		comments: '',
		basket,
	})

	React.useEffect(() => {
		if (data) {
			setFormData(prevFormData => ({
				...prevFormData,
				address: data.addressDefault,
			}))
		}
	}, [data])

	if (isLoading) {
		return <div className={style.loading}>Загрузка</div>
	}

	if (isError) {
		return (
			<div className={style.auth}>
				<h3>Для оформления нужна регистрация</h3>
				<div className={style.button}>
					<button onClick={() => navigate('/login')}>Войти</button>
					<button onClick={() => navigate('/Register')}>Регистрация</button>
				</div>
			</div>
		)
	}

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			await addOrder({ ...formData }).unwrap()
			await toast.info('Заказ успешно создан', {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
			})
			await dispatch(clearBasket())
			await setFormData({
				deliveryDate: '',
				deliveryTime: '',
				address: '',
				comments: '',
				basket,
			})
			await onClose(false)
		} catch (error) {
			toast.error(error.data.message, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
			})
		}
	}

	return (
		<div className={style.orderForm}>
			<h2>Оформление Заказа</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Дата доставки:
					<input
						type='date'
						name='deliveryDate'
						value={formData.deliveryDate}
						onChange={handleInputChange}
						required
					/>
				</label>
				<br />

				<label>
					Время доставки:
					<input
						type='time'
						name='deliveryTime'
						value={formData.deliveryTime}
						onChange={handleInputChange}
						required
					/>
				</label>
				<br />

				<label>
					Адрес доставки:
					<input
						type='text'
						name='address'
						value={formData.address}
						onChange={handleInputChange}
						required
					/>
				</label>
				<br />

				<label>
					Комментарии:
					<textarea
						name='comments'
						value={formData.comments}
						onChange={handleInputChange}
						maxLength={255}
					/>
				</label>
				<br />

				<button type='submit'>Отправить заказ</button>
			</form>
		</div>
	)
}

export default OrderForm
