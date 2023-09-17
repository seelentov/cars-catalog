/* eslint-disable react/prop-types */
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import styles from './Auth.module.scss'
import { Form } from './Form'
export const Login = ({ setPage }) => {
	const { setUser } = useActions('user')
	const [invalid, setInvalid] = useState(false)
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = (e, email, password) => {
		e.preventDefault()
		setIsLoading(true)
		setInvalid(false)
		const auth = getAuth()
		signInWithEmailAndPassword(auth, email, password)
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
			.catch(() => {
				setInvalid(true)
				setIsLoading(false)
			})
	}

	return (
		<>
			{isLoading && (
				<div className={styles.loading}>
					<div></div>
				</div>
			)}
			<div className={styles.login}>
				<Form title='Войти' handleSubmit={handleSubmit} />
				<button onClick={() => setPage(null)}>Назад</button>
				<p
					className={styles.error}
					style={{ display: invalid ? 'block' : 'none' }}
				>
					Неверный логин или пароль
				</p>
			</div>
		</>
	)
}
