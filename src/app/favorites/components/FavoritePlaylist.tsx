'use client'

import TrackCard from '@/components/ui/track/track-card'
import { collectionService } from '@/services/collection.service'
import { useQuery } from '@tanstack/react-query'

export default function FavoritePlaylist() {
  const { data: tracks, isLoading } = useQuery({
    queryKey: ['favoriteTracks'],
    queryFn: () => collectionService.getFavoriteTracks()
  })

  return (
		<div className='mt-10'>
			<h2 className='text-2xl font-semibold mb-5'>Любимые треки</h2>

			{isLoading ? (
				<p>Загрузка...</p>
			) : tracks && tracks.length > 0 ? (
				<ul className='flex flex-col gap-y-2'>
					{tracks.map(track => (
						<TrackCard track={track} key={track.id} initialFavorite={true} />
					))}
				</ul>
			) : (
				<p className='text-neutral-400'>Тут ничего нет</p>
			)}
		</div>
	)
}