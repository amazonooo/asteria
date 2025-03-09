import { axiosWithAuth } from "@/api/interceptors";
import { IArtist, ITrack } from '@/types/search.types'
import { IUser } from "@/types/user.types";

class UserService {
	async getUserProfile(): Promise<IUser> {
		const { data } = await axiosWithAuth.get<IUser>('/me')
		return data
	}

	async login() {
		const authUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&scope=user-read-private user-read-email user-follow-read playlist-modify-private playlist-modify-public user-library-read user-library-modify user-read-playback-state user-modify-playback-state user-top-read playlist-read-private playlist-read-collaborative`

		window.location.href = authUrl
	}

	async logout() {
		await fetch('/api/auth/logout', { method: 'POST' })
		window.location.reload()
	}

	async getTopArtists(): Promise<string[]> {
		const { data } = await axiosWithAuth.get('/me/top/artists', {
			params: { limit: 5 },
		})
		return data.items.map((artist: IArtist) => artist.id)
	}

	async getTopTracks(): Promise<string[]> {
		const { data } = await axiosWithAuth.get('/me/top/tracks', {
			params: { limit: 5 },
		})
		return data.items.map((track: ITrack) => track.id)
	}
}

export const userService = new UserService();
