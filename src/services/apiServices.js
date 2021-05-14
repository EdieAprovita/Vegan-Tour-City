import axios from 'axios'
let baseURL


process.env.NODE_ENV === 'production'
? (baseURL = 'https://vegan-city-api.herokuapp.com/')
: (baseURL = 'http://localhost:5000/')

export const api = axios.create({withCredentials : true, baseURL})
