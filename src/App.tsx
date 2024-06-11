import { Balde } from './components/balde'
import './app.scss'
import { Frutas } from './components/frutas'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export const App = () => {

	return (
		<div className='container-app'>
			<Balde />
			<Frutas />
			<ToastContainer
				autoClose={3000}
			/>
		</div>
	)
}
