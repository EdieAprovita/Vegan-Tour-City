import axios from 'axios'

let baseURL

process.env.NODE_ENV === 'production'
	? (baseURL = process.env.production)
	: (baseURL = process.env.developer)

const businessService = axios.create({
	baseURL,
	withCredentials: true,
})
export const getAllBusinesses = () => businessService.get('/business')

export const getBusiness = id => businessService.get(`/business/${id}`)

export const createBusiness = business =>
	businessService.post('/business/create', business)

export const updateBusiness = (id, business) =>
	businessService.put(`/business/edit/${id}`, business)

export const deleteBusiness = id => businessService.delete(`/markets/delete/${id}`)
