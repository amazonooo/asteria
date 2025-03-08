'use client'

import { collectionService } from '@/services/collection.service'
import { ITrack } from '@/types/search.types'
import { trackDuraionFormatter } from '@/utils/track-duration-formatter'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FaHeart } from 'react-icons/fa'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { FaPlay } from 'react-icons/fa'
import { Heart } from 'lucide-react'

export default function TrackCard({
	track,
	initialFavorite = false,
}: {
	track: ITrack
	initialFavorite?: boolean
}) {
	const [hoveredTrack, setHoveredTrack] = useState<string | null>(null)
	const [liked, setLiked] = useState(initialFavorite)
	const queryClient = useQueryClient()

	useEffect(() => {
		setLiked(initialFavorite)
	}, [initialFavorite])

	const { mutate: addToFavorites } = useMutation({
		mutationKey: ['addToFavorites'],
		mutationFn: () => collectionService.addTrackToFavorites(track.id),
		onSuccess: () => {
			setLiked(true)
			queryClient.invalidateQueries({ queryKey: ['favoriteTracks'] })
			toast.success(`Трек ${track.name} добавлен в избранное`)
		},
	})

	const { mutate: removeFromFavorites } = useMutation({
		mutationKey: ['removeFromFavorites'],
		mutationFn: () => collectionService.removeTrackFromFavorites(track.id),
		onSuccess: () => {
			setLiked(false)
			queryClient.invalidateQueries({ queryKey: ['favoriteTracks'] })
			toast.success(`Трек ${track.name} удален из избранного`)
		},
	})

	return (
		<li
			key={track.id}
			className='w-full hover:bg-[#252525] transition-all duration-300 rounded-md py-1.5 px-2 cursor-pointer flex justify-between items-center'
			onMouseEnter={() => setHoveredTrack(track.id)}
			onMouseLeave={() => setHoveredTrack(null)}
		>
			<span className='flex'>
				<span className='relative w-[45px] h-[45px] flex items-center justify-center'>
					<Image
						src={track.album.images[0].url}
						alt={track.name}
						width={45}
						height={45}
						className='h-full w-full rounded-md object-cover transition-opacity duration-300'
						style={{ opacity: hoveredTrack === track.id ? 0.5 : 1 }}
					/>
					{hoveredTrack === track.id && (
						<span className='absolute flex justify-center items-center rounded-full h-6 w-6 bg-white transition-all duration-300 opacity-100 hover:scale-105'>
							<FaPlay size={8} className='text-black' />
						</span>
					)}
				</span>
				<span className='flex items-center'>
					<span className='flex flex-col ml-3 gap-y-0.5'>
						<h2 className='text-sm'>{track.name}</h2>
						<h3 className='text-sm text-neutral-400'>
							{track.artists[0].name}
						</h3>
					</span>
				</span>
			</span>
			<span className='flex gap-x-10 items-center'>
				<span className='mt-1'>
					{liked ? (
						<FaHeart
							className='text-rose-400 cursor-pointer hover:scale-105 transition-transform duration-300'
							size={18}
							onClick={() => removeFromFavorites()}
						/>
					) : (
						<Heart
							className='text-neutral-400 cursor-pointer hover:scale-105 transition-transform duration-300'
							size={18}
							onClick={() => addToFavorites()}
						/>
					)}
				</span>
				<span className='text-neutral-400'>
					{trackDuraionFormatter(track.duration_ms)}
				</span>
			</span>
		</li>
	)
}
