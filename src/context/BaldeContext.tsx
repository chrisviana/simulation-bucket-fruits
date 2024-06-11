import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { Fruta } from './FrutaContext'

export interface Balde {
  capacidade: number;
  id: number,
	frutas: Fruta[]
}

interface BaldeContextType {
  baldes: Balde[];
  adicionarBalde: (balde: Balde) => void;
  removeBalde: (index: number) => void;
	setBaldes: React.Dispatch<React.SetStateAction<Balde[]>>;
	removerFrutaDoBalde: (frutaId: number, baldeId: number) => void;
}

interface BaldeProviderProps {
  children: ReactNode;
}

export const BaldeContext = createContext<BaldeContextType>({
	baldes: [],
	adicionarBalde: () => {},
	removeBalde: () => {},
	setBaldes: () => {},
	removerFrutaDoBalde: () => {},
})


export const BaldeProvider = ({ children } : BaldeProviderProps) => {

	const [baldes, setBaldes] = useState<Balde[]>(() => {
		const baldesStorage = localStorage.getItem('baldes')
		return baldesStorage ? JSON.parse(baldesStorage) : []
	})

	useEffect(() => {
		localStorage.setItem('baldes', JSON.stringify(baldes))
	}, [baldes])

	const adicionarBalde = (balde: Balde) => {
		setBaldes([...baldes, balde])
	}

	const removeBalde = (index: number) => {
		const baldesAtulizados = [...baldes]
		baldesAtulizados.splice(index, 1)
		setBaldes(baldesAtulizados)
	}


	const removerFrutaDoBalde = (frutaId: number, baldeId: number) => {
		setBaldes(prevBaldes => 
			prevBaldes.map(balde => 
				balde.id === baldeId ? { ...balde, frutas: balde.frutas.filter(fruta => fruta.id !== frutaId) } : balde
			)
		)
	}

	const value = {baldes, adicionarBalde, removeBalde, setBaldes, removerFrutaDoBalde }

	return <BaldeContext.Provider value={value}>{children}</BaldeContext.Provider>
}

export const useSetBaldes = () => {
	const { setBaldes } = useContext(BaldeContext)
	return setBaldes
}