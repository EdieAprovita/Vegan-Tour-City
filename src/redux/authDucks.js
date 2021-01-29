import axios from 'axios'

import { baseURLAuth } from '../services/apiServices'

//Constants

const initialData = {
	loading: false,
	status: false,
}

//Types
const LOADING = 'LOADING'
const SIGNUP = 'SIGUP'
const LOGIN = 'LOGIN'
const CURRENTUSER = 'CURRENTUSER'
const LOGOUT = 'LOGOUT'

//Reducer

export default function authReducer(state = initialData, action) {
	switch (action.type) {
		case LOADING:
			return { ...state, loading: true }
		case SIGNUP:
			return { ...state }
		default:
			return state
	}
}

//Actions
