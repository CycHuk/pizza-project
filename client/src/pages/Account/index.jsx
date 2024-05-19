import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import History from '../../components/History'

import {
	useCurrentQuery,
	useLogoutMutation,
	useUpdateUserMutation,
} from '../../redux/API/User'

import style from './Account.module.scss'

const Account = () => {
	const { data, isError, isLoading } = useCurrentQuery()
	const [logout] = useLogoutMutation()
	const [updateUser] = useUpdateUserMutation()
	const navigate = useNavigate()

	const [editMode, setEditMode] = useState(false)
	const [editedName, setEditedName] = useState('')
	const [editedAddress, setEditedAddress] = useState('')

	useEffect(() => {
		if (data) {
			setEditedName(data.name || '')
			setEditedAddress(data.addressDefault || '')
		}
	}, [data])

	const handleEdit = () => {
		setEditMode(true)
	}

	const handleSave = async () => {
		await updateUser({ name: editedName, addressDefault: editedAddress })
		setEditMode(false)
	}

	const handleCancel = () => {
		setEditMode(false)
		setEditedName(data?.name || '')
		setEditedAddress(data?.addressDefault || '')
	}

	if (isLoading) {
		return <main className={'container ' + style.main}>Загрузка</main>
	}

	if (isError) {
		navigate('/login')
	}

	return (
		<main className={'container ' + style.main}>
			<div className={style.profile}>
				<h2>Профиль</h2>
				{editMode ? (
					<>
						<label>
							Имя:
							<input
								type='text'
								value={editedName}
								onChange={e => setEditedName(e.target.value)}
							/>
						</label>
						<label>
							Адрес:
							<input
								type='text'
								value={editedAddress}
								onChange={e => setEditedAddress(e.target.value)}
							/>
						</label>
						<button onClick={handleSave}>Сохранить</button>
						<button onClick={handleCancel}>Отмена</button>
					</>
				) : (
					<>
						<p>
							<strong>Имя:</strong> {data?.name}
						</p>
						<p>
							<strong>Телефон:</strong> {data?.phoneNumber}
						</p>
						<p>
							<strong>Адрес:</strong> {data?.addressDefault}
						</p>
						<button onClick={handleEdit}>Редактировать</button>
						<button
							onClick={() => {
								logout()
								navigate('/')
							}}
						>
							Выйти
						</button>
					</>
				)}
			</div>
			<History />
		</main>
	)
}

export default Account
