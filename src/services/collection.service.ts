import { axiosWithAuth } from '@/api/interceptors'
import { API_URL } from '@/constants/api.constants'
import { IAlbum, IArtist, ITrack } from '@/types/search.types'

class CollectionService {
	private BASE_URL = `${API_URL}/me`

	async getFavoritesTracks(): Promise<ITrack[]> {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/tracks`)
		return response.data.items.map((item: any) => item.track)
	}

	async getFavoritesAlbums(): Promise<IAlbum[]> {
    const response = await axiosWithAuth.get(`${this.BASE_URL}/albums`)
    return response.data.items.map((item: any) => item.album)
  }

	async getFavoritesArtists(): Promise<IArtist[]> {
    const response = await axiosWithAuth.get(`${this.BASE_URL}/following?type=artist`)
    return response.data.artists.items
  }

  async getUserPlaylists(): Promise<any> {
    const response = await axiosWithAuth.get(`${this.BASE_URL}/playlists`)
    return response.data.items
  }

  async addTrackToFavorites(trackId: string) {
    return axiosWithAuth.put(`${this.BASE_URL}/tracks?ids=${trackId}`)
  }

  async removeTrackFromFavorites(trackId: string) {
    return axiosWithAuth.delete(`${this.BASE_URL}/tracks?ids=${trackId}`)
  }
}

export const collectionService = new CollectionService()