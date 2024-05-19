import React from 'react'
import axios from 'axios'

import style from './Home.module.scss'

import ProductBlock from '../../components/ProductBlock'
import Empty from '../../components/ProductBlock/Empty'
import Skeleton from '../../components/ProductBlock/Skeleton'

import Filters from '../../components/Filters'
import { useSelector } from 'react-redux'
import SortingSelector from '../../components/SortBlock'

function Home() {
	const category = useSelector(state => state.search.categoryId)
	const subcategory = useSelector(state => state.search.subcategoryId)
	const sortBy = useSelector(state => state.search.sortBy)

	const [status, setStatus] = React.useState('loading')
	const [page, setPage] = React.useState({ active: 1, max: 1 })
	const [item, setItem] = React.useState([])

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`/products/getPage`, {
					params: {
						categoryId: category,
						subcategoryId: subcategory,
						limit: 6,
						sortBy: sortBy,
					},
				})
				setPage({ active: 1, max: response.data.pageCount })
			} catch (error) {
				console.error(error)
			}
		}

		fetchData()
	}, [subcategory, category, sortBy])

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`/products`, {
					params: {
						categoryId: category,
						subcategoryId: subcategory,
						page: page.active,
						limit: 6,
						sortBy: sortBy,
					},
				})
				setItem(response.data)
			} catch (error) {
				console.error(error)
			} finally {
				setStatus('notloading')
			}
		}
		setStatus('loading')
		fetchData()
	}, [page, subcategory, category, sortBy])

	const pagination = (
		<>
			<button
				onClick={() => {
					if (page.active > 1) {
						setPage({ active: page.active - 1, max: page.max })
					}
				}}
				className={
					style.button + ' ' + (page.active === 1 ? style.notActive : ' ')
				}
			>
				{'<'}
			</button>
			{page.max > 2
				? [...new Array(page.max)].map((item, index) => (
						<button
							className={
								style.button +
								' ' +
								(page.active === index + 1 ? style.notActive : ' ')
							}
							key={index}
							onClick={() => setPage({ active: index + 1, max: page.max })}
						>
							{index}
						</button>
				  ))
				: ''}
			<button
				onClick={() => {
					if (page.active < page.max) {
						setPage({ active: page.active + 1, max: page.max })
					}
				}}
				className={
					style.button +
					' ' +
					(page.active === page.max ? style.notActive : ' ')
				}
			>
				{'>'}
			</button>
		</>
	)

	const product = (
		<>
			<div className={style.product}>
				{item.map(item => (
					<ProductBlock {...item} key={item.title} />
				))}
			</div>
			<div className={style.pagination}>{page.max > 1 ? pagination : ''}</div>
		</>
	)

	const skeletons = (
		<div className={style.product}>
			{[...new Array(6)].map((_, index) => (
				<Skeleton key={index} />
			))}
		</div>
	)

	const ProductBlocks = <>{item.length ? product : <Empty />}</>

	return (
		<main className={'container ' + style.main}>
			<div className={style.panel}>
				<div className={style.filters}>
					<Filters />
				</div>
				{status === 'loading' || item.length ? <SortingSelector /> : ''}
			</div>
			{status === 'loading' ? skeletons : ProductBlocks}
		</main>
	)
}

export default Home
