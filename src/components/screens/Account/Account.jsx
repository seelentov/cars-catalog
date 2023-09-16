import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from './../../../hooks/useActions'
import { useThisStore } from './../../../hooks/useThisStore'
import { Favorites } from './Favorites'

import styles from './Account.module.scss'

const Account = () => {
	const navigate = useNavigate()
	const { logout } = useActions()
	const user = useThisStore('user')

	useEffect(() => {
		if (!user.email) {
			navigate('/login')
		}
	}, [user.email, navigate])

	const out = e => {
		e.preventDefault()
		logout()
		navigate('/login')
	}

	return (
		<>
			{user.email && (
				<>
					<div className={styles.info}>
						<p>Your ID: {user.id}</p>
						<p>Your E-mail: {user.email}</p>
						<button onClick={e => out(e)}>Logout</button>
					</div>
					<Favorites id={user.id} />
				</>
			)}
		</>
	)
}

export default Account
