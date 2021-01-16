import axios from 'axios'
const baseURL = 'http://localhost:5000/api/markets'

const marketService = axios.create({ baseURL })

export const newMarket = async ({ name, address, typeMarket, imgUrl }) => {
	try {
		const { data: market } = await marketService.post('/', {
			name,
			address,
			typeMarket,
			imgUrl,
		})
		return market
	} catch (error) {
		return { message: `${error}` }
	}
}

export const getMarkets = async () => {
	try {
		const { data: markets } = await marketService.get('/')
		return markets
	} catch (error) {
		return { message: `${error}` }
	}
}

export const getMarket = async marketID => {
	try {
		const { data: market } = await marketService.get(`/${marketID}`)
		return market
	} catch (error) {
		return { message: `${error}` }
	}
}

export const editMarket = async (marketID, name, address, typeMarket, imgUrl) => {
	try {
		const { data: market } = await marketService.put(`/${marketID}`, {
			name,
			address,
			typeMarket,
			imgUrl,
		})
		return market
	} catch (error) {
		return { message: `${error}` }
	}
}

export const deleteMarket = async marketID => {
	try {
		const { data } = await marketService.delete(`/${marketID}`)
		return data
	} catch (error) {
		return { message: `${error}` }
	}
}
