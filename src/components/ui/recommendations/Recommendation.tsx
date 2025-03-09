'use client'

import { useQuery } from '@tanstack/react-query'
import { recommendationService } from '@/services/recommendation.service'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'

export default function Recommendation() {
	const { data, isLoading } = useQuery({
		queryKey: ['personalizedRecommendations'],
		queryFn: async () => {
			return await recommendationService.getPersonalizedRecommendations()
		},
	})

	if (isLoading) return <div className='h-[300px] bg-gray-800 animate-pulse' />

	if (!data) return null

	return (
		<div className='flex flex-col'>
			<h2 className='text-2xl font-semibold mb-5'>Персональные рекомендации</h2>
			<div className='grid grid-cols-5 gap-6'>
				{data.map(track => (
					<div key={track.id} className='group relative'>
						<Image
							src={track.album.images[0].url}
							alt={track.name}
							width={200}
							height={200}
							className='rounded-lg transition-transform duration-300 group-hover:scale-105'
						/>
						<div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity'>
							<button className='bg-teal-500 p-2 rounded-full text-white'>
								<FaPlay />
							</button>
						</div>
						<h3 className='text-lg mt-2'>{track.name}</h3>
						<p className='text-sm text-gray-400'>{track.artists[0].name}</p>
					</div>
				))}
			</div>
		</div>
	)
}
