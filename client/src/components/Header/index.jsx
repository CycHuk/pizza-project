import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectBasketCount } from '../../redux/Slice/Basket'

import style from './Header.module.scss'

import logo from '../../assets/img/icon/logo.png'
import yandex from '../../assets/img/Header/yandex.png'
import point from '../../assets/img/Header/point.svg'
import star from '../../assets/img/Header/star.svg'
import account from '../../assets/img/Header/account.svg'

import Menu from '../Menu'

const Header = () => {
	const basketCount = useSelector(selectBasketCount)
	return (
		<header className='container'>
			<div className={style.title}>
				<img src={logo} alt='logo' />
				<div className={style.yandex}>
					<h1>
						Доставка по <span>Новосибирску</span>
					</h1>
					<div className={style.yandex__lower}>
						<img src={yandex} alt='yandex' />
						<h2>Яндекс еда</h2>
						<img src={point} alt='point' />
						<p>
							4.8 <img src={star} alt='star' />
						</p>
						<p className={style.text}>
							Время доставки <img src={point} alt='star' /> от 31 мин
						</p>
					</div>
				</div>
				<div className={style.basket}>
					<Link to='/Cart'>
						<span>Корзина | {basketCount}</span>
					</Link>
					<Link to='/Account'>
						<img src={account} alt='account' />
					</Link>
				</div>
			</div>
			<div className={style.bottom}>
				<hr />
				<Menu />
				<hr />
			</div>
		</header>
	)
}

export default Header
