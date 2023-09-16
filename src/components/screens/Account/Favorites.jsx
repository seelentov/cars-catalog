/* eslint-disable react/prop-types */
import { useGetTaskQuery } from '../../../store/api/cars.api'
import { CarItem } from '../Cars/CarsCatalog'
import styles from '../Cars/CarsCatalog.module.scss'

export const Favorites = ({ id }) => {
	const { isLoading, data } = useGetTaskQuery()

	return (
		<>
			<h1>Favorites</h1>
			{isLoading && (
				<div className={styles.loading}>
					<div></div>
				</div>
			)}
			<div className={styles.items}>
				{data && data.filter(e => e.likes.some(e => e === id)).length == 0 && (
					<p>Favorites not found</p>
				)}
				{data ? (
					data
						.filter(e => e.likes.some(e => e === id))
						.map(car => <CarItem key={car.id} car={car} />)
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
