'use client'

import { ITrack } from '@/types/search.types'
import { trackDuraionFormatter } from '@/utils/track-duration-formatter'
import { Heart, HeartOff } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { FaPlay } from 'react-icons/fa'

export default function TrackCard({ track }: { track: ITrack }) {
	const [hoveredTrack, setHoveredTrack] = useState<string | null>(null)

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
						style={{
							opacity: hoveredTrack === track.id ? 0.5 : 1,
						}}
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
				<span className='text-neutral-400 mt-1'>
					<Heart
						className='hover:text-neutral-200 transition-colors duration-300'
						size={18}
					/>
				</span>
				<span
					className={`text-neutral-400 mt-1 transition-opacity duration-300 ${
						hoveredTrack === track.id ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<HeartOff
						className='hover:text-neutral-200 transition-colors duration-300'
						size={18}
					/>
				</span>
				<span className='text-neutral-400'>
					{trackDuraionFormatter(track.duration_ms)}
				</span>
			</span>
		</li>
	)
}
