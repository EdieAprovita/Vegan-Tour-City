import axios from 'axios'
const baseURL = 'http:/localhost:5000/api/business'

const businessService = axios.create({ baseURL })

export const newBusiness = async ({
	name,
	author,
	address,
	contact,
	budget,
	typeBusiness,
	numReviews,
}) => {
	try {
		const { data: business } = await businessService.post('/', {
			name,
			author,
			address,
			contact,
			budget,
			typeBusiness,
			numReviews,
		})
		return business
	} catch (error) {
		return { message: `${error}` }
	}
}

export const getBusinesses = async () => {
	try {
		const { data: businesses } = await businessService.get('/')
		return businesses
	} catch (error) {
		return { message: `${error}` }
	}
}

export const getBusiness = async businessID => {
	try {
		const { data: business } = await businessService.get(`/${businessID}`)
		return business
	} catch (error) {
		return { message: `${error}` }
	}
}

export const editBusiness = async (
	businessID,
	name,
	author,
	address,
	contact,
	budget,
	typeBusiness
) => {
	try {
		const { data: business } = await businessService.put(`/${businessID}`, {
			name,
			author,
			address,
			contact,
			budget,
			typeBusiness,
		})
		return business
	} catch (error) {
		return { message: `${error}` }
	}
}

export const deleteBusiness = async businessID => {
	try {
		const { data } = await businessID.delete(`/${businessID}`)
		return data
	} catch (error) {
		return { message: `${error}` }
	}
}
