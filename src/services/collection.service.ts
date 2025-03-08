import { axiosWithAuth } from '@/api/interceptors'
import { API_URL } from '@/constants/api.constants'
import { IAlbum, IArtist, ITrack } from '@/types/search.types'

class CollectionService {
	private BASE_URL = `${API_URL}/me`

	async getFavoriteTracks(offset = 0): Promise<ITrack[]> {
		const { data } = await axiosWithAuth.get('/me/tracks', {
			params: {
				limit: 20,
				offset,
			},
		})
		return data.items.map((item: any) => item.track) // Достаем треки
	}

	async getFavoriteAlbums(): Promise<IAlbum[]> {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/albums`)
		return response.data.items.map((item: any) => item.album)
	}

	async getFavoriteArtists(): Promise<IArtist[]> {
		const response = await axiosWithAuth.get(
			`${this.BASE_URL}/following?type=artist`
		)
		return response.data.artists.items
	}

	async getUserPlaylists(): Promise<any> {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/playlists`)
		return response.data.items
	}

	async addTrackToFavorites(trackId: string) {
		return axiosWithAuth.put(`https://api.spotify.com/v1/me/tracks`, {
			ids: [trackId],
		})
	}

	async removeTrackFromFavorites(trackId: string) {
		return axiosWithAuth.delete(`https://api.spotify.com/v1/me/tracks`, {
			data: { ids: [trackId] },
		})
	}
}

export const collectionService = new CollectionService()