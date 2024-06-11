import { useForm, SubmitHandler } from 'react-hook-form'
import './style.scss'
import { useContext } from 'react'
import { BaldeContext } from '../../context/BaldeContext'

type FormularioData = {
	capacidade: number
}


export const Balde = () => {

	const { adicionarBalde } = useContext(BaldeContext)

	const { register, handleSubmit, formState: { errors }, reset } = useForm<FormularioData>()
	
	const salvarBalde: SubmitHandler<FormularioData> = data => {
		const novoBalde = {
			...data,
			id: Date.now(),
			frutas: []
		}
		
		adicionarBalde(novoBalde)
		
		reset()
	}


	return (
		<div className="container-balde">
			<h1>Criar Balde</h1>
			<form onSubmit={handleSubmit(salvarBalde)}>
				<span>Capacidade Máxima</span>
				<input type='number'
					{...register('capacidade', { 
						required: 'A capacidade é obrigatória', 
						valueAsNumber: true,
						validate: value => value > 0 || 'A capacidade deve ser maior que zero.'
					})}
				/>
				{errors.capacidade && <p>{errors.capacidade.message}</p>}
				<button type='submit'>Salvar</button>
			</form>
      
		</div>
	)
}