import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setCategoryId } from '../../redux/Slice/Search'
import Skeleton from './Skeleton'

import style from './Menu.module.scss'

export default function Menu() {
	const dispatch = useDispatch()
	const categoryid = useSelector(state => state.search.categoryId)
	const [status, setStatus] = React.useState('loading')

	const [items, setItems] = React.useState([])

	const requestAPI = async () => {
		try {
			const res = await axios.get(`/products/categories`)
			setItems(res.data)
			setStatus('notloading')
		} catch (err) {}
	}

	React.useEffect(() => {
		setStatus('loading')
		requestAPI()
	}, [])

	const menu = items.map((obj, index) => (
		<li key={index}>
			<Link to='/' onClick={() => dispatch(setCategoryId(obj.id))}>
				<span className={categoryid === obj.id ? style.actine : ''}>
					{obj.title}
				</span>
			</Link>
		</li>
	))
	const skeletons = [...new Array(4)].map((_, index) => (
		<Skeleton key={index} />
	))

	return (
		<nav className={style.nav}>
			<ul>{status === 'loading' ? skeletons : menu}</ul>
		</nav>
	)
}
