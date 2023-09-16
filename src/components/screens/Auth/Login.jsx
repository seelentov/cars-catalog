import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import styles from './Auth.module.scss'
import { Form } from './Form'

export const Login = () => {
	const { setUser } = useActions('user')
	const [invalid, setInvalid] = useState(false)
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = (e, email, password) => {
		e.preventDefault()
		setIsLoading(true)
		setTimeout(() => {
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
				.catch(() => setInvalid(true))
			setIsLoading(false)
		}, 200)
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
				<Link to='/signup'>
					<button>Еще нет аккаунта?</button>
				</Link>
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
