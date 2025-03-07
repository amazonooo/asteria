import { axiosWithAuth } from '@/api/interceptors'
import { ISearchResults } from '@/types/search.types'

class SearchService {
	async search(query: string): Promise<ISearchResults | null> {
		if (!query) return null

		const { data } = await axiosWithAuth.get<ISearchResults>('/search', {
			params: { q: query, type: 'track,artist,album' },
		})

		return data
	}
}

export const searchService = new SearchService()
