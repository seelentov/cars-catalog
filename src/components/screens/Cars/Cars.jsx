/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */

import { NewCarForm } from './NewCarForm'

import { CarsCatalog } from './CarsCatalog'

const Cars = () => {


	return (
		<section>
			<h1>Cars catalog</h1>
			<NewCarForm />
			<CarsCatalog />
		</section>
	)
}

export default Cars
