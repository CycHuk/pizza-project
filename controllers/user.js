const { prisma } = require('../prisma/prisma-client')
const brypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const login = async (req, res) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(400).json({ ...errors.array() })
	}

	try {
		const { phoneNumber, password } = req.body
		if (!phoneNumber || !password) {
			return res.status(400).json({ message: 'Заполните обязательные поля' })
		}

		const user = await prisma.User.findFirst({
			where: {
				phoneNumber,
			},
		})

		const isPasswordCorrect =
			user && (await brypt.compare(password, user.password))
		const secret = process.env.JWT_SECRET

		if (user && isPasswordCorrect && secret) {
			const token = jwt.sign({ id: user.id }, secret, { expiresIn: '30m' })

			res.cookie('token', token, {
				httpOnly: true,
			})

			res.status(200).json({
				id: user.id,
				phoneNumber: user.phoneNumber,
				name: user.name,
				addressDefault: user.addressDefault,
			})
		} else {
			return res
				.status(400)
				.json({ message: 'Неверно введен логин или пароль' })
		}
	} catch {
		return res.status(400).json({ message: 'Что-то пошло не так' })
	}
}

const register = async (req, res) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(400).json({ ...errors.array() })
	}

	try {
		const { phoneNumber, password, name } = req.body

		if (!phoneNumber || !password || !name) {
			return res.status(400).json({ message: 'Заполните обязательные поля' })
		}

		const registeredUser = await prisma.User.findFirst({
			where: {
				phoneNumber,
			},
		})

		if (registeredUser) {
			return res.status(400).json({ message: 'Номер уже зарегистрирован' })
		}

		const salt = await brypt.genSalt(10)
		const hashedPassword = await brypt.hash(password, salt)

		const user = await prisma.user.create({
			data: {
				phoneNumber,
				name,
				password: hashedPassword,
			},
		})

		if (user) {
			const secret = process.env.JWT_SECRET
			const token = jwt.sign({ id: user.id }, secret, { expiresIn: '30m' })

			res.cookie('token', token, {
				httpOnly: true,
			})

			return res.status(201).json({
				id: user.id,
				phoneNumber: user.phoneNumber,
				name,
				addressDefault: user.addressDefault,
			})
		} else {
			return res
				.status(400)
				.json({ message: 'Не удалось создать пользователя' })
		}
	} catch (error) {
		return res.status(400).json({ message: 'Что-то пошло не так' })
	}
}

const current = async (req, res) => {
	try {
		const userWithoutSensitiveData = { ...req.user }

		delete userWithoutSensitiveData.password

		res.status(200).json(userWithoutSensitiveData)
	} catch (error) {
		return res.status(400).json({ message: 'Что-то пошло не так' })
	}
}

const logout = async (req, res) => {
	try {
		res.clearCookie('token')
		res.status(200).json({ message: 'Ждем вас снова' })
	} catch (error) {
		return res.status(400).json({ message: 'Что-то пошло не так' })
	}
}
const update = async (req, res) => {
	try {
		const user = { ...req.user }
		const { name, addressDefault } = req.body

		const updatedUser = await prisma.user.update({
			where: { id: user.id },
			data: { name, addressDefault },
		})

		res.status(200).json(updatedUser)
	} catch (error) {
		return res.status(400).json({ message: 'Что-то пошло не так' })
	}
}

module.exports = {
	login,
	register,
	current,
	logout,
	update,
}
