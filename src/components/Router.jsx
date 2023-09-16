import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Account from './screens/Account/Account'
import { Login } from './screens/Auth/Login'
import { SignUp } from './screens/Auth/SignUp'
import Cars from './screens/Cars/Cars'
import { CarsDetail } from './screens/CarsDetail/CarsDetail'
import { Home } from './screens/Home/Home'
import { PageNotFound } from './screens/PageNotFound/PageNotFound'
import { Header } from './ui/Header/Header'
export const Router = () => {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/cars' element={<Cars />} />
					<Route path='/cars/:id' element={<CarsDetail />} />
					<Route path='*' element={<PageNotFound />} />
					<Route path='/my' element={<Account />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}
