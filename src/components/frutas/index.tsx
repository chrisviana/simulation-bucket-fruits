import { useForm, SubmitHandler } from 'react-hook-form'
import './styles.scss'

type FormularioFrutas = {
	nome: string;
  preco: number;
}

export const Frutas = () => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm<FormularioFrutas>()
	
	const salvarFruta: SubmitHandler<FormularioFrutas> = data => {
		console.log(data)

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
		</div>
	)
}