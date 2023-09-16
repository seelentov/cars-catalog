import { useState } from 'react'
import { usePostTaskMutation } from '../../../store/api/cars.api'
import styles from './CarsCatalog.module.scss'

export const NewCarForm = () => {
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [image, setImage] = useState('')

	const [postCar] = usePostTaskMutation()

	const handleSubmit = e => {
		const formatPrice = price =>
			price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
		e.preventDefault()
		postCar({
			name: name.toUpperCase(),
			price: formatPrice(price),
			image: image ? image : '/public/car.jpg',
			desc: '',
			likes: [],
		})
			.then(() => setPrice(''))
			.then(() => setName(''))
			.then(() => setImage(''))
	}
	return (
		<form onSubmit={e => handleSubmit(e)} className={styles.form}>
			<label>
				Имя
				<input
					placeholder='Имя автомобиля'
					pattern='[A-Za-zА-Яа-я\s]+'
					type='text'
					name='name'
					value={name}
					onChange={e => setName(e.target.value)}
				></input>
			</label>
			<label>
				Цена
				<input
					placeholder='Цена автомобиля'
					min='1'
					type='number'
					name='price'
					value={price}
					onChange={e => setPrice(e.target.value)}
				></input>
			</label>
			<label>
				IMG
				<input
					pattern='^(http|https):\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(\/\S*)?$'
					placeholder='URL изображения автомобиля'
					type='text'
					name='image'
					value={image}
					onChange={e => setImage(e.target.value)}
				></input>
			</label>
			<input
				type='submit'
				value='Добавить'
				disabled={name === '' || price === ''}
			></input>
		</form>
	)
}
