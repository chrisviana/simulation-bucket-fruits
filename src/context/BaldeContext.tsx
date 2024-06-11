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
	somarValoresDasFrutas: (baldeId: number) => number | undefined;
	calcularPercentualOcupacao: (baldeId: number) => number | undefined;
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
	somarValoresDasFrutas: () => 0,
	calcularPercentualOcupacao: () => 0,
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

	const somarValoresDasFrutas = (baldeId: number) => {
		return baldes.find(balde => balde.id === baldeId)?.frutas.reduce((acc, fruta) => acc + fruta.preco, 0)
	}

	const calcularPercentualOcupacao = (baldeId: number) => {
		const balde = baldes.find(b => b.id === baldeId)
		if (balde) {
			return (balde.frutas.length / balde.capacidade) * 100
		}
		return undefined
	}

	const value = {baldes, adicionarBalde, removeBalde, setBaldes, removerFrutaDoBalde, somarValoresDasFrutas, calcularPercentualOcupacao }

	return <BaldeContext.Provider value={value}>{children}</BaldeContext.Provider>
}

export const useSetBaldes = () => {
	const { setBaldes } = useContext(BaldeContext)
	return setBaldes
}