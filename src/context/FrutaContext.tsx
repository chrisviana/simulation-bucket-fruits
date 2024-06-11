import { ReactNode, createContext, useEffect, useState } from 'react'

interface Fruta {
  nome: string;
  preco: number;
}

interface FrutaContextType {
  frutas: Fruta[];
	adicionarFruta: (balde: Fruta) => void;
}

interface FrutaProviderProps {
  children: ReactNode;
}

export const FrutaContext = createContext<FrutaContextType>({
	frutas: [],
	adicionarFruta: () => {}
})


export const FrutaProvider = ({ children } : FrutaProviderProps) => {

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


	const value = {frutas, adicionarFruta}

	return <FrutaContext.Provider value={value}>{children}</FrutaContext.Provider>
}