import { useContext } from 'react'
import { FrutaContext } from '../../context/FrutaContext'
import { BaldeContext } from '../../context/BaldeContext'
import './styles.scss'
export const ListaFrutas = () => {
	const { frutas } = useContext(FrutaContext)
	const { baldes } = useContext(BaldeContext)

	return (
		<ul>
			{frutas.map(fruta => (
				<li key={fruta.nome}>
					<span>{fruta.nome} - R$ {fruta.preco}</span>
					<select>
						<option value="Selecione um balde">Selecione um balde</option>
						{baldes.map(balde => (
							<option key={balde.id} value={balde.id}>Capacidade {balde.capacidade}</option>
						))}
					</select>
				</li>
			))}
		</ul>
	)
}