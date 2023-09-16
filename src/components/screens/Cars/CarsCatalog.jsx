/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useThisStore } from '../../../hooks/useThisStore'
import {
	useAddToFavoriteMutation,
	useDeleteTaskMutation,
	useGetTaskQuery,
	useUnFavoriteMutation,
} from '../../../store/api/cars.api'
import styles from './CarsCatalog.module.scss'

export const CarsCatalog = () => {
	const { isLoading, data } = useGetTaskQuery()

	return (
		<>
			{isLoading && (
				<div className={styles.loading}>
					<div></div>
				</div>
			)}
			<div className={styles.items}>
				{data ? (
					data.map(car => <CarItem key={car.id} car={car} />)
				) : !isLoading ? (
					<div className={styles.error}>
						<p>Not Found</p>
					</div>
				) : (
					''
				)}
			</div>
		</>
	)
}

export const CarItem = ({ car }) => {
	const { id, image, name, price, likes } = car
	const [deleteTask] = useDeleteTaskMutation()
	const [addToFavorite] = useAddToFavoriteMutation()
	const [unFavoriteQuery] = useUnFavoriteMutation()
	const user = useThisStore('user')

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
			<h2>{name}</h2>
			<p>{price} $</p>
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
