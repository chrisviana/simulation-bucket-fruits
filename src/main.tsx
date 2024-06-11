import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.scss'
import { BaldeProvider } from './context/BaldeContext.tsx'
import { FrutaProvider } from './context/FrutaContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BaldeProvider>
			<FrutaProvider>
				<App />
			</FrutaProvider>
		</BaldeProvider>
	</React.StrictMode>,
)
