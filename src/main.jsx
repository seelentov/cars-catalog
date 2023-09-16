import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import './firebase'
import reportWebVitals from './reportWebVitals'

import { Provider } from 'react-redux'
import { store } from './store/store'
import { Router } from './components/Router'


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<Router />
		</Provider>
	</React.StrictMode>
)

reportWebVitals()
