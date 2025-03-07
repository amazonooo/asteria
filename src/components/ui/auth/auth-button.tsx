'use client'

import { useAuth } from '@/hooks/useAuth'

export default function AuthButton() {
	const { isAuthenticated } = useAuth()

	const handleLogin = () => {
		window.location.href = `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&scope=user-read-private user-read-email`
	}

	const handleLogout = async () => {
		await fetch('/api/auth/logout', { method: 'POST' })
		window.location.reload()
	}

	return isAuthenticated ? (
		<button
			onClick={handleLogout}
			className='px-4 py-2 bg-red-500 text-white rounded'
		>
			Выйти
		</button>
	) : (
		<button
			onClick={handleLogin}
			className='px-4 py-2 bg-green-500 text-white rounded'
		>
			Войти через Spotify
		</button>
	)
}
