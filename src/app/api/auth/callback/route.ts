import { NextRequest, NextResponse } from 'next/server'
import { getAccessToken } from '@/services/auth.service'

export async function GET(req: NextRequest) {
	const url = new URL(req.url)
	const code = url.searchParams.get('code')

	if (!code) {
		return NextResponse.json(
			{ error: 'No authorization code provided' },
			{ status: 400 }
		)
	}

	try {
		const { access_token, refresh_token, expires_in } = await getAccessToken(
			code
		)

		// Создаем ответ и добавляем access_token в cookie
		const response = NextResponse.redirect(new URL('/', req.url))
		response.cookies.set('spotify_access_token', access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: expires_in,
			path: '/',
		})

		response.cookies.set('spotify_refresh_token', refresh_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 30, // 30 дней
			path: '/',
		})

		return response
	} catch (error: any) {
		console.error('Ошибка в API-роуте:', error.message)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
