import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { BaldeContext } from './BaldeContext'

export interface Fruta {
  nome: string;
  preco: number;
}

interface FrutaContextType {
  frutas: Fruta[];
	adicionarFruta: (balde: Fruta) => void;
	adicionarFrutaAoBalde: (fruta: Fruta, baldeId: number) => void;
}

interface FrutaProviderProps {
  children: ReactNode;
}

export const FrutaContext = createContext<FrutaContextType>({
	frutas: [],
	adicionarFruta: () => {},
	adicionarFrutaAoBalde: () => {},
})


export const FrutaProvider = ({ children } : FrutaProviderProps) => {

	const { setBaldes } = useContext(BaldeContext)

	const [frutas, setFrutas] = useState<Fruta[]>(() => {
		const frutasStorage = localStorage.getItem('frutas')
		return frutasStorage ? JSON.parse(frutasStorage) : []
	})

	useEffect(() => {
		localStorage.setItem('frutas', JSON.stringify(frutas))
	}, [frutas])

	const adicionarFruta = (fruta: Fruta) => {
		setFrutas([...frutas, fruta])
	}

	const adicionarFrutaAoBalde = (fruta: Fruta, baldeId: number) => {
		console.log(fruta, baldeId)
		setBaldes(prevBaldes => 
			prevBaldes.map(balde => 
				balde.id === baldeId ? { ...balde, frutas: [...balde.frutas, fruta] } : balde
			)
		)
	}


	const value = {frutas, adicionarFruta, adicionarFrutaAoBalde}

	return <FrutaContext.Provider value={value}>{children}</FrutaContext.Provider>
}