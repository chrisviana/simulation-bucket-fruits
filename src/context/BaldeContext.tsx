import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

interface Fruta {
  nome: string;
  preco: number;
}

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
}

interface BaldeProviderProps {
  children: ReactNode;
}

export const BaldeContext = createContext<BaldeContextType>({
	baldes: [],
	adicionarBalde: () => {},
	removeBalde: () => {},
	setBaldes: () => {},
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

	const value = {baldes, adicionarBalde, removeBalde, setBaldes }

	return <BaldeContext.Provider value={value}>{children}</BaldeContext.Provider>
}

export const useSetBaldes = () => {
	const { setBaldes } = useContext(BaldeContext)
	return setBaldes
}