'use client'

import { Skeleton } from '@/components/ui/skeleton'
import TrackCard from '@/components/ui/track/track-card'
import TrackSkeleton from '@/components/ui/track/track-skeleton'
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
				<ul className='flex flex-col gap-y-2 mt-1'>
					{Array.from({ length: 20 }).map((_, i) => (
						<Skeleton key={i} className='w-full h-10 rounded-lg' />
					))}
				</ul>
			) : (
				<ul className='flex flex-col gap-y-2'>
					{tracks?.map(track => (
						<TrackCard track={track} key={track.id} initialFavorite={true} />
					))}
				</ul>
			)}
		</div>
	)
}