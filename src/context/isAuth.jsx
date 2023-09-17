/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Login } from '../components/screens/Auth/Login'
import styles from '../components/screens/Home/Home.module.scss'
import { useAuth } from '../hooks/useAuth'
import { SignUp } from '../components/screens/Auth/SignUp'
import { getCookieLogin } from '../service/cookieLogin'
import { useActions } from '../hooks/useActions'
export const IsAuth = ({ children }) => {
	const [page, setPage] = useState(null)
  const {setUser} = useActions()

  getCookieLogin() && setUser(getCookieLogin())

	return (
		<>
			{useAuth() ? (
				children
			) : page === 'Login' ? (
				<Login setPage={setPage}/>
			) : page === 'Sign' ? (
				<SignUp setPage={setPage}/>
			) : (
				<Welcome setPage={setPage} />
			)}
		</>
	)
}

const Welcome = ({ setPage }) => {
	return (
		<div className={styles.home}>
			<button onClick={() => setPage('Login')}>Login</button>
			<button onClick={() => setPage('Sign')}>SignUp</button>
		</div>
	)
}
