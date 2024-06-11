import { Balde } from './components/balde'
import './app.scss'
import { Frutas } from './components/frutas'
import { ListaBaldes } from './components/lista-baldes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export const App = () => {

	return (
		<div className='container-app'>
			<Balde />
			<Frutas />
			<ListaBaldes />
			<ToastContainer
				autoClose={3000}
			/>
		</div>
	)
}
