import { API_URL } from '@/constants/api.constants'
import axios from 'axios'

export const axiosClassic = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
  }
})

export const axiosWithAuth = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
  }
})

axiosWithAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('spotify_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)