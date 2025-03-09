import { axiosWithAuth } from '@/api/interceptors'
import { ITrack } from '@/types/search.types'
import { userService } from './user.service'

class RecommendationService {
	async getPersonalizedRecommendations(): Promise<ITrack[]> {
		const [topArtists, topTracks] = await Promise.all([
			userService.getTopArtists(),
			userService.getTopTracks(),
		])

		const { data } = await axiosWithAuth.get('/recommendations', {
			params: {
				seed_artists: topArtists.slice(0, 4).join(','),
				seed_tracks: topTracks.slice(0, 3).join(','),
				seed_genres: 'pop,rock',
				limit: 10,
			},
		})
		return data.tracks
	}
}

export const recommendationService = new RecommendationService()
