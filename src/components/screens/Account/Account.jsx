import { useActions } from './../../../hooks/useActions'
import { useThisStore } from './../../../hooks/useThisStore'
import { Favorites } from './Favorites'
import styles from './Account.module.scss'
import { clearCookieLogin } from './../../../service/cookieLogin';

const Account = () => {
	const { logout } = useActions()
	const user = useThisStore('user')

	const out = e => {
		e.preventDefault()
		logout()
    clearCookieLogin()
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
