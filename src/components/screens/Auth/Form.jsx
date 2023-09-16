/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import styles from './Auth.module.scss'

export const Form = ({ title, handleSubmit }) => {
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')

	useEffect(() => {
		setEmail('test@test.test')
		setPass('testtest')
	}, [])

	return (
		<div className={styles.form}>
			<h1>{title}</h1>
			<input
				type='mail'
				name='email'
				value={email}
				placeholder='E-mail'
				onChange={e => setEmail(e.target.value)}
			/>
			<input
				type='password'
				name='pass'
				placeholder='Пароль'
				value={pass}
				onChange={e => setPass(e.target.value)}
			/>
			<button onClick={e => handleSubmit(e, email, pass)}>Отправить</button>
		</div>
	)
}
