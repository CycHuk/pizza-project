import React, { useState } from 'react'
import QRCode from 'qrcode.react'

import { useGetOrderQuery } from '../../redux/API/Order'
import { useGetProductQuery } from '../../redux/API/Product'

import Popup from '../../layouts/Popup'

import style from './History.module.scss'

const History = () => {
	const { data, isLoading, isError } = useGetOrderQuery()
	const [selectedOrder, setSelectedOrder] = useState(null)
	const [onPopup, setOnPopup] = useState(false)

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return <p>Error fetching data</p>
	}

	const handleDetailsClick = order => {
		setSelectedOrder(order)
		setOnPopup(true)
	}

	return (
		<div className={style.orderHistory}>
			<h2>История заказов</h2>
			<ul>
				{data.orders.map(order => (
					<li key={order.id} className={style.orderItem}>
						<p>ID: {order.id}</p>
						<p>Дата заказа: {formatDateTime(order.orderDate)}</p>
						<p>Дата доставки: {formatDateTime(order.deliveryDate)}</p>
						<div className={style.buttons}>
							<button onClick={() => handleDetailsClick(order)}>
								Подробнее
							</button>
						</div>
					</li>
				))}
			</ul>

			{onPopup && (
				<Popup setActivePopup={setOnPopup}>
					<Order order={selectedOrder} onClose={setOnPopup} />
				</Popup>
			)}
		</div>
	)
}

const Order = ({ onClose, order }) => {
	return (
		<div className={style.orderContainer}>
			<QRCode
				value={JSON.stringify({
					id: order.id,
					userId: order.userId,
					address: order.address,
					orderDate: order.orderDate,
					deliveryDate: order.deliveryDate,
				})}
				size={200}
			/>
			<h3>Состав заказа:</h3>
			{order.orderItems.map(item => (
				<OrderItem item={item} key={item.productId} />
			))}
			<p className={style.price}>
				Общая стоимость заказа:{' '}
				<span>{calculateTotal(order.orderItems)} ₽</span>
			</p>
			<h3>Данные заказа:</h3>
			<p>Адрес: {order.address}</p>

			<button className={style.closeButton} onClick={() => onClose(false)}>
				Закрыть
			</button>
		</div>
	)
}

const OrderItem = ({ item }) => {
	const { data, isLoading, isError } = useGetProductQuery(item.productId)

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return <p>Error fetching data</p>
	}

	return (
		<div className={style.orderItem}>
			<img src={data[0].product.imgUrl} alt='product' />
			<h2>
				{data[0].product.title}:
				{' ' + data[0].sizes + ' ' + data[0].product.unit}
			</h2>
			<p>
				{data[0].price} ₽ * {item.quantity} =
				<span className={style.totalPrice}>
					{data[0].price * item.quantity} ₽
				</span>
			</p>
		</div>
	)
}

const calculateTotal = orderItems => {
	return orderItems
		? orderItems.reduce(
				(total, item) => total + item.quantity * item.product.price,
				0
		  )
		: 0
}

const formatDateTime = dateTimeString => {
	const options = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'UTC',
	}
	const utcDateTime = new Date(dateTimeString)
	utcDateTime.setHours(utcDateTime.getHours())
	return utcDateTime.toLocaleString('ru-RU', options).replace(',', '')
}

export default History
