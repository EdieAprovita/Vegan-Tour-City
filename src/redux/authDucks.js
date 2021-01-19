import axios from 'axios'

import { baseURLAuth } from '../services/apiServices'

//Constants

const initialData = {
	authArr: [],
}

//Types
const SIGUP = 'SIGUP'
const LOGIN = 'LOGIN'
const CURRENTUSER = 'CURRENTUSER'
const LOGOUT = 'LOGOUT'

//Reducer

export default function authReducer(state = initialData, action) {
	switch (action.type) {
	}
}

//Actions
