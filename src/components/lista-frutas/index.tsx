import { useContext } from 'react'
import { Fruta, FrutaContext } from '../../context/FrutaContext'
import { Balde, BaldeContext } from '../../context/BaldeContext'
import './styles.scss'
import { toast } from 'react-toastify'


export const ListaFrutas = () => {
	const { frutas, adicionarFrutaAoBalde } = useContext(FrutaContext)
	const { baldes } = useContext(BaldeContext)

	const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>, fruta: Fruta) => {
		

		const selectedBaldeId = parseInt(event.target.value)
		const frutaJaNoBalde = verificarFrutaJaNoBalde(fruta, selectedBaldeId)
		if (selectedBaldeId && !frutaJaNoBalde) {
			adicionarFrutaAoBalde(fruta, selectedBaldeId)
		} else if (frutaJaNoBalde) {
			toast.warn('Esta fruta já está presente em outro balde.')
		}
	}

	const capacidadeAtingida = (balde: Balde): boolean => {
		return balde.frutas.length >= balde.capacidade
	}

	const verificarFrutaJaNoBalde = (fruta: Fruta, baldeId: number): boolean => {
		for (const balde of baldes) {
			if (balde.id !== baldeId && balde.frutas.some(f => f.nome === fruta.nome)) {
				return true
			}
		}
		return false
	}

	return (
		<>		
			<h1>Lista de Frutas</h1>
			<ul>
				{frutas.map(fruta => (
					<li key={fruta.nome}>
						<span>{fruta.nome} - R$ {fruta.preco}</span>
						<select onChange={(e) => handleChangeSelect(e, fruta)}>
							<option value="">Selecione um balde</option>
							{baldes.map(balde => (
								<option disabled={capacidadeAtingida(balde)} key={balde.id} value={balde.id}>Capacidade {balde.capacidade}</option>
							))}
						</select>
					</li>
				))}
			</ul>
		</>
	)
}