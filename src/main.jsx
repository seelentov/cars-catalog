import React from 'react'
import ReactDOM from 'react-dom/client'
import './firebase'
import './index.scss'
import reportWebVitals from './reportWebVitals'

import { Provider } from 'react-redux'
import { Router } from './components/Router'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
				<Router />
		</Provider>
	</React.StrictMode>
)

reportWebVitals()
