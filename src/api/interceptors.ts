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
	async config => {
		try {
			const res = await fetch('/api/auth/token')
			const data = await res.json()

			if (data.access_token) {
				config.headers.Authorization = `Bearer ${data.access_token}`
			}
		} catch (error) {
			console.error('Ошибка при получении токена:', error)
		}

		return config
	},
	error => Promise.reject(error)
)
