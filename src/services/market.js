import axios from 'axios'

let baseURL

process.env.NODE_ENV === 'production'
	? (baseURL = process.env.production)
	: (baseURL = process.env.developer)

const marketService = axios.create({
	baseURL,
	withCredentials: true,
})

export const getAllMarkets = () => marketService.get('/markets')

export const getMarket = id => marketService.get(`/markets/${id}`)

export const createMarket = market => marketService.post('/markets/create', market)

export const updateMarket = (id, market) =>
	marketService.put(`/markets/edit/${id}`, market)

export const deleteMarket = id => marketService.delete(`/markets/delete/${id}`)
