import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import styles from './Home.module.scss'
export const Home = () => {
	return (
		<div className={styles.home}>
			<Link to='/cars/'>
				<button>Cars</button>
			</Link>
			{useAuth() && (
				<Link to='/my'>
					<button>Account</button>
				</Link>
			)}
		</div>
	)
}
