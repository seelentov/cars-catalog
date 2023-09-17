/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { useGetTaskQuery } from '../../../store/api/cars.api'
import { CarItem } from './CarItem'
import styles from './CarsCatalog.module.scss'

import { useState } from 'react'
import Select from 'react-select'
export const CarsCatalog = () => {
	const { isLoading, data } = useGetTaskQuery()
	const [filterName, setFilterName] = useState('')
	const [filter, setFilter] = useState([
		{ value: 'id', label: 'ID' },
		{ value: 'asc', label: 'ASC' },
	])

	const getFiltered = data => {
		return data
			.filter(car => {
				if (filterName === '') {
					return car
				} else {
					return car.name.includes(filterName)
				}
			})
			.sort((a, b) => {
				if (filter[0].value === 'name') {
					return filter[1].value === 'asc'
						? a.name.localeCompare(b.name)
						: b.name.localeCompare(a.name)
				} else if (filter[0].value === 'price') {
					return filter[1].value === 'asc'
						? a.price - b.price
						: a.price + b.price
				} else {
					return filter[1].value === 'asc' ? a.id - b.id : a.id + b.id
				}
			})
	}

  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: '#242424' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? 'white' : '#242424',
        color: isSelected ? '#242424' : 'white',
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
  };

	return (
		<>
			<input
        placeholder='Поиск..'
				className={styles.filter}
				type='text'
				name='filter'
				value={filterName}
				onChange={e => setFilterName(e.target.value)}
			/>
			<div className={styles.select}>
        Сортировать: 
				<Select
					styles={colourStyles}
					value={filter[0]}
					options={[
						{ value: 'id', label: 'ID' },
						{ value: 'name', label: 'Имя' },
						{ value: 'price', label: 'Цена' },
					]}
					onChange={e => setFilter([e, filter[1]])}
				/>
				<Select
					styles={colourStyles}
					value={filter[1]}
					options={[
						{ value: 'asc', label: 'ASC' },
						{ value: 'desc', label: 'DESC' },
					]}
					onChange={e => setFilter([filter[0], e])}
				/>
			</div>
			{isLoading && (
				<div className={styles.loading}>
					<div></div>
				</div>
			)}
			<div className={styles.items}>
				{data ? (
					getFiltered(data).map(car => <CarItem key={car.id} car={car} />)
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
