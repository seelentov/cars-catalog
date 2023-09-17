/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import {
	useAddToFavoriteMutation,
	useDeleteTaskMutation,
	useUnFavoriteMutation,
} from '../../../store/api/cars.api'
import { useThisStore } from './../../../hooks/useThisStore'
import styles from './CarsCatalog.module.scss'

import { useAuth } from '../../../hooks/useAuth'

export const CarItem = ({ car }) => {
	const { id, image, name, price, likes } = car
	const [deleteTask] = useDeleteTaskMutation()
	const [addToFavorite] = useAddToFavoriteMutation()
	const [unFavoriteQuery] = useUnFavoriteMutation()
	const user = useThisStore('user')

	const formatPrice = price =>
		price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

	const handleDelete = (e, id) => {
		e.preventDefault()
		deleteTask(id)
	}
	const handleFavorite = (e, id) => {
		e.preventDefault()
		addToFavorite({ id, user: user.id, likes })
	}

	const unFavorive = (e, id) => {
		e.preventDefault()
		unFavoriteQuery({ id, user: user.id, likes })
	}
	return (
		<div className={styles.item}>
			<img src={image} alt={name} />
			<h2>{name.toUpperCase()}</h2>
			<p>{formatPrice(price)} $</p>
			<Link to={`/cars/${id}`}>
				<button>Read more</button>
			</Link>
			<button onClick={e => handleDelete(e, id)}>Delete</button>
			{useAuth() &&
				(likes.every(e => e !== user.id) ? (
					<button onClick={e => handleFavorite(e, id)}>Add to favorite</button>
				) : (
					<button onClick={e => unFavorive(e, id)}>unfavorite</button>
				))}
		</div>
	)
}
