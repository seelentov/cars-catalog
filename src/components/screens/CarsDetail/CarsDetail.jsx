/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
	useGetPostQuery,
	useUpdateDescMutation,
} from '../../../store/api/cars.api'
import styles from './CarsDetail.module.scss'
export const CarsDetail = () => {
	const { id } = useParams()

	const { isLoading, data } = useGetPostQuery(id)

	return (
		<>
			{isLoading && (
				<div className={styles.loading}>
					<div></div>
				</div>
			)}
			{data ? (
				<CarItem key={data.id} car={data} />
			) : (
				!isLoading && (
					<div className={styles.error}>
						<p>Car not Found</p>
					</div>
				)
			)}
		</>
	)
}

const CarItem = ({ car }) => {
	return (
		<>
			<Link to='/cars'>Back</Link>
			<div className={styles.item}>
				<div className={styles.image}>
					<img src={car.image} alt={car.name} />
				</div>
				<div className={styles.info}>
					<h1>
						{car.name}
					</h1>
					<p>{car.price} $</p>
				</div>
			</div>
			<CarDesc id={car.id} desc={car.desc} />
		</>
	)
}

const CarDesc = ({ id, desc }) => {
	const [text, setText] = useState(desc)
	const [edit, setEdit] = useState(false)
	const ref = useRef()

	useEffect(() => {
		if (edit) {
			ref.current.focus()
		}
	}, [edit])

	const [update] = useUpdateDescMutation()

	const handleSubmit = e => {
		e.preventDefault()
		update({ id, text })
		setEdit(!edit)
	}

	const toggleEdit = () => {
		setEdit(!edit)
		if (edit) {
			update({ id, text })
		}
	}

	return (
		<>
			{edit ? (
				<form onSubmit={e => handleSubmit(e)}>
					<textarea
						ref={ref}
						onBlur={() => toggleEdit()}
						className={styles.edit}
						value={text}
						name='desc'
						onChange={e => setText(e.target.value)}
					/>
				</form>
			) : (
				<div className={styles.edit} onClick={() => toggleEdit()}>
					{text}
				</div>
			)}
		</>
	)
}
