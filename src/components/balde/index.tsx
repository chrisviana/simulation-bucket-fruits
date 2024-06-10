import './style.scss'

export const Balde = () => {
	return (
		<div className="container-balde">
			<h1>Criar Balde</h1>
			<div>
				<span>Capacidade Máxima</span>
				<input type='number' />
				<button type='submit'>Salvar</button>
			</div>
      
		</div>
	)
}