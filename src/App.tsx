import { Balde } from './components/balde'
import './app.scss'
import { Frutas } from './components/frutas'
export const App = () => {

	return (
		<div className='container-app'>
			<Balde />
			<Frutas />
			<div>
				<h1>Lista de Balde</h1>
			</div>
		</div>
	)
}
