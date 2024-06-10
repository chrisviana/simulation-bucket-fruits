import { useForm, SubmitHandler } from 'react-hook-form'
import './style.scss'

type FormularioData = {
	capacidade: number
}


export const Balde = () => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm<FormularioData>()
	
	const salvarBalde: SubmitHandler<FormularioData> = data => {
		console.log(data)

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