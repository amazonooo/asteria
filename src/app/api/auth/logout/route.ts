import { NextResponse } from 'next/server'

export async function POST() {
	const response = NextResponse.json({ message: 'Logged out' })

	response.cookies.set('spotify_access_token', '', { maxAge: 0, path: '/' })
	response.cookies.set('spotify_refresh_token', '', { maxAge: 0, path: '/' })

	return response
}
