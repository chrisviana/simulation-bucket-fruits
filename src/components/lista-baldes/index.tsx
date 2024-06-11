import { useContext } from 'react'
import { BaldeContext } from '../../context/BaldeContext'
import  TrashIcon from '../../assets/trash.svg' 
import  TrashBlack from '../../assets/trash-black.svg' 
import './styles.scss'
import { toast } from 'react-toastify'

export const ListaBaldes = () => {

	const { baldes, removeBalde, removerFrutaDoBalde, somarValoresDasFrutas, calcularPercentualOcupacao } = useContext(BaldeContext)

	const handleDelete = (index: number) => {

		const balde = baldes[index]
		if (balde.frutas.length === 0) {
			removeBalde(index)
		} else {
			toast.warning('O balde não pode ser excluído porque possui frutas adicionadas.')
		}
	}

	const hanldeRemoverFruta = (idFruta: number, idBalde: number) => {
		removerFrutaDoBalde(idFruta, idBalde)
	}

	return (
		<div className='container-baldes'>
			<h1>Lista de Baldes</h1>
			{baldes.length === 0 ? (
				<p>Não existe nenhum balde :(</p>
			) : (
				baldes.map((balde, index) => (
					<div key={balde.id}>
						<h3>
              Capacidade {balde.capacidade}  
							<button onClick={() => handleDelete(index)}>
								<img src={TrashIcon} alt="Trash Icon" />
							</button>
						</h3>
						<ul className='lista-de-balde'>
							{
								balde.frutas.map(fruta => (
									<li key={fruta.nome}>
										{fruta.nome} - R$ {fruta.preco}
										<button onClick={() => hanldeRemoverFruta(fruta.id, balde.id)}>
											<img src={TrashBlack} alt="Trash Icon"  />
										</button>
									</li>
								))
							}
						</ul>
						<p>Valor total: {somarValoresDasFrutas(balde.id)}</p>
						<p>Ocupação de: {calcularPercentualOcupacao(balde.id)?.toFixed(2)}%</p>
					</div>
				))
			)}
		</div>
	)
}