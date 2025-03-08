import { ITrack } from '@/types/search.types'
import TrackCard from '@/components/ui/track/track-card'
import { useQuery } from '@tanstack/react-query'
import { collectionService } from '@/services/collection.service'

export default function SearchTrack({ data }: { data: any }) {
	const { data: favoriteTracks } = useQuery({
		queryKey: ['favoriteTracks'],
		queryFn: () => collectionService.getFavoriteTracks(),
	})

	const favoriteTrackIds = new Set(favoriteTracks?.map((track: ITrack) => track.id))

	return (
		<ul className='flex flex-col gap-y-2'>
			{data?.tracks?.items.map((track: ITrack) => (
				<TrackCard
					track={track}
					key={track.id}
					initialFavorite={favoriteTrackIds.has(track.id)}
				/>
			))}
		</ul>
	)
}
