import { axiosClassic } from '@/api/interceptors'
import axios from 'axios'

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!
const AUTH_URL = 'https://accounts.spotify.com/api/token'

export const getSpotifyAuthUrl = () => {
	const scope = encodeURIComponent(
		'user-read-private user-read-email user-follow-read playlist-modify-private playlist-modify-public user-library-read user-library-modify user-read-playback-state user-modify-playback-state user-top-read playlist-read-private playlist-read-collaborative'
	)
	return `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&scope=${scope}`
}

export const getAccessToken = async (code: string) => {
	const params = new URLSearchParams()
	params.append('grant_type', 'authorization_code')
	params.append('code', code)
	params.append('redirect_uri', REDIRECT_URI)
	params.append('client_id', CLIENT_ID)
	params.append('client_secret', CLIENT_SECRET)

	try {
		const response = await axios.post(AUTH_URL, params, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})

		return response.data
	} catch (error: any) {
		console.error(
			'Ошибка при получении токена:',
			error.response?.data || error.message
		)
		throw new Error('Не удалось получить токен')
	}
}

export const refreshAccessToken = async () => {
	const refreshToken = localStorage.getItem('spotify_refresh_token')
	if (!refreshToken) return null

	const params = new URLSearchParams()
	params.append('grant_type', 'refresh_token')
	params.append('refresh_token', refreshToken)
	params.append('client_id', CLIENT_ID!)
	params.append('client_secret', CLIENT_SECRET!)

	const response = await axiosClassic.post(AUTH_URL, params, {
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	})

	const { access_token, expires_in } = response.data

	localStorage.setItem('spotify_access_token', access_token)
	localStorage.setItem(
		'spotify_expires_in',
		String(Date.now() + expires_in * 1000)
	)

	return access_token
}
