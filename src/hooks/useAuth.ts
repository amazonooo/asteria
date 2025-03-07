'use client'

import { useEffect, useState } from 'react'

export function useAuth() {
	const [token, setToken] = useState<string | null>(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		async function fetchToken() {
			const res = await fetch('/api/auth/token')
			const data = await res.json()

			if (data.access_token) {
				setToken(data.access_token)
				setIsAuthenticated(true)
			} else {
				setIsAuthenticated(false)
			}
		}

		fetchToken()
	}, [])

	return { token, isAuthenticated }
}
