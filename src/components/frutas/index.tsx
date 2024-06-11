import { useForm, SubmitHandler } from 'react-hook-form'
import './styles.scss'
import { ListaFrutas } from '../lista-frutas'
import { useContext } from 'react'
import { FrutaContext } from '../../context/FrutaContext'

type FormularioFrutas = {
	nome: string;
  preco: number;
}

export const Frutas = () => {

	const { adicionarFruta } = useContext(FrutaContext)

	const { register, handleSubmit, formState: { errors }, reset } = useForm<FormularioFrutas>()
	
	const salvarFruta: SubmitHandler<FormularioFrutas> = data => {
		const novaFruta = {
			...data,
			id: Date.now(),
		}
		adicionarFruta(novaFruta)

		reset()
	}

	return (
		<div className='container-fruta'>
			<h1>Criar Fruta</h1>
			<form onSubmit={handleSubmit(salvarFruta)}>
				<div>
					<span>Nome:</span>
					<input type='text'
						{...register('nome', { 
							required: 'Nome do produto é obrigatório',
						})}
					/>
					{errors.nome && <p>{errors.nome.message}</p>}
				</div>
				<div>
					<span>Preço:</span>
					<input type="number" min="0.01" step="0.01"
						{...register('preco', { 
							required: 'O preço é obrigatório', 
							valueAsNumber: true,
							validate: value => value > 0 || 'O preço deve ser maior que zero.'
						})}
					/>
					{errors.preco && <p>{errors.preco.message}</p>}
				</div>
				<button type='submit'>Salvar</button>
			</form>
			<ListaFrutas />
		</div>
	)
}