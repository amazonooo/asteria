import { useInfiniteQuery } from '@tanstack/react-query'
import { collectionService } from '@/services/collection.service'

export function useFavoriteTracks() {
	return useInfiniteQuery({
		queryKey: ['favoriteTracks'],
		queryFn: ({ pageParam = 0 }) =>
			collectionService.getFavoriteTracks(pageParam),
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.length < 20) return undefined
			return allPages.length
		},
		initialPageParam: 0,
	})
}
