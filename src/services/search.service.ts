import { axiosClassic } from '@/api/interceptors'

class SearchService {
  async searchSporify(query: string, type: 'track' | 'artist' | 'album') {
    const { data } = await axiosClassic.get('/search', {
      params: { q: query, type }
    })
    return data
  }
}

export const searchService = new SearchService()