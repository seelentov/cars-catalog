import { Link } from 'react-router-dom'

import { useAuth } from '../../../hooks/useAuth'
import styles from './Header.module.scss'

export const Header = () => {

	return (
		<header className={styles.header}>
			<Link to='/'>
				<button disabled={!useAuth()}>Home</button>
			</Link>
			<Link to='/cars'>
				<button disabled={!useAuth()}>Cars</button>
			</Link>
			{useAuth() && (
				<Link to='/my'>
					<button>Account</button>
				</Link>
			)}
		</header>
	)
}
