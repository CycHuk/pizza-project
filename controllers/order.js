const { prisma } = require('../prisma/prisma-client')
const { DateTime } = require('luxon')

const addOrder = async (req, res) => {
	try {
		const { deliveryDate, deliveryTime, address } = req.body

		if (!deliveryDate || !deliveryTime || !address) {
			return res.status(400).json({ message: 'Заполните обязательные поля' })
		}

		const deliveryDateTime = DateTime.fromFormat(
			`${deliveryDate} ${deliveryTime}`,
			'yyyy-MM-dd HH:mm',
			{ zone: 'UTC+7' }
		)

		const orderDate = DateTime.now().setZone('UTC+7')
		const minDeliveryTime = orderDate.plus({ minutes: 45 })
		const maxDeliveryTime = orderDate.plus({ days: 3 })

		if (deliveryDateTime < minDeliveryTime) {
			return res
				.status(400)
				.json({ message: 'Минимальное время доставки 45 минут' })
		}

		if (deliveryDateTime > maxDeliveryTime) {
			return res
				.status(400)
				.json({ message: 'Заказ можно заказать максимум на 3 дня вперед' })
		}

		const offsetInMinutes = orderDate.offset
		const jsDateWithTimeZone = new Date(
			orderDate.toMillis() + offsetInMinutes * 60 * 1000
		)

		const offsetInMinutesDelivery = deliveryDateTime.offset
		const jsDateWithTimeZoneDelivery = new Date(
			deliveryDateTime.toMillis() + offsetInMinutesDelivery * 60 * 1000
		)

		const orderData = {
			address,
			userId: req.user.id,
			orderDate: jsDateWithTimeZone,
			deliveryDate: jsDateWithTimeZoneDelivery,
			comments: req.body.comments,
		}
		const order = await prisma.Order.create({ data: orderData })

		if (req.body.basket) {
			for (const entry of req.body.basket) {
				const orderItem = {
					productId: entry.id,
					orderId: order.id,
					quantity: entry.count,
				}
				await prisma.OrderItems.create({ data: orderItem })
			}
		}

		return res.status(200).json({ message: 'Заказ успешно создан' })
	} catch (error) {
		return res.status(500).json({ message: 'Что-то пошло не так' })
	}
}

const getOrder = async (req, res) => {
	try {
		const orders = await prisma.order.findMany({
			where: {
				userId: req.user.id,
			},
			include: {
				orderItems: {
					include: {
						product: true,
					},
				},
			},
			take: 20,
			orderBy: {
				id: 'desc',
			},
		})

		res.status(200).json({ orders })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Что-то пошло не так' })
	}
}

module.exports = {
	addOrder,
	getOrder,
}
