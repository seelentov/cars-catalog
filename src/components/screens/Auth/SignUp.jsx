/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from './../../../hooks/useActions'
import styles from './Auth.module.scss'
import { Form } from './Form'

export const SignUp = ({ setPage }) => {
	const { setUser } = useActions('user')
	const [weakpass, setWeakpass] = useState(false)
	const [notEmail, setNotEmail] = useState(false)
	const [emailAlreadyUse, setEmailAlreadyUse] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()

	const handleSubmit = (e, email, password) => {
		e.preventDefault()
		setIsLoading(true)
		setWeakpass(false)
		setNotEmail(false)
		const auth = getAuth()
		createUserWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				setUser({
					email: user.email,
					id: user.uid,
					token: user.accessToken,
				})

				navigate('/')
			})
			.then(() => {
				setIsLoading(false)
			})
			.catch(e => {
				console.log(e)
				if (e.message.includes('password')) {
					setWeakpass(true)
				} else {
					setWeakpass(false)
				}
				if (e.message.includes('invalid-email')) {
					setNotEmail(true)
				} else {
					setNotEmail(false)
				}
				if (e.message.includes('email-already-in-use')) {
					setEmailAlreadyUse(true)
				} else {
					setEmailAlreadyUse(false)
				}
				setIsLoading(false)
			})
	}

	return (
		<div>
			{isLoading && (
				<div className={styles.loading}>
					<div></div>
				</div>
			)}
			<Form title='Регистрация' handleSubmit={handleSubmit} />
			<button onClick={() => setPage(null)}>Назад</button>
			<p
				className={styles.error}
				style={{ display: weakpass ? 'block' : 'none' }}
			>
				Слишком короткий пароль
			</p>
			<p
				className={styles.error}
				style={{ display: notEmail ? 'block' : 'none' }}
			>
				Введите корректный E-mail
			</p>
			<p
				className={styles.error}
				style={{ display: emailAlreadyUse ? 'block' : 'none' }}
			>
				E-mail уже используется
			</p>
		</div>
	)
}
