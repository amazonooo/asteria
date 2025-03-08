'use client'

import { IArtist } from '@/types/search.types'
import Image from 'next/image'
import { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { Heart, MoreHorizontal, RedoDot, Send } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ArtistCard({ artist }: { artist: IArtist }) {
	const [hoveredArtist, setHoveredArtist] = useState<string | null>(null)

	return (
		<li
			key={artist.id}
			className='flex flex-col items-center gap-y-2 cursor-pointer'
			onMouseEnter={() => setHoveredArtist(artist.id)}
			onMouseLeave={() => setHoveredArtist(null)}
		>
			<div className='relative w-[220px] h-[220px]'>
				<Image
					src={artist.images[0].url}
					alt={artist.id}
					width={220}
					height={220}
					className='rounded-full h-full w-full object-cover transition-all duration-300'
					style={{
						filter:
							hoveredArtist === artist.id
								? 'brightness(40%)'
								: 'brightness(100%)',
					}}
				/>

				{hoveredArtist === artist.id && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
						className='absolute inset-0 flex flex-col justify-between p-3'
					>
						<motion.div
							initial={{ opacity: 0, y: -45 }}
							animate={{ opacity: 1, y: 10 }}
							exit={{ opacity: 0, y: -45 }}
							transition={{ duration: 0.3, ease: 'easeOut' }}
							className='flex justify-end'
						>
							<button className='bg-[#1E1F1F] p-2.5 rounded-full opacity-60 hover:opacity-85 hover:bg-neutral-800 cursor-pointer transition-all duration-300'>
								<RedoDot className='rotate-180 text-white' size={20} />
							</button>
						</motion.div>

						<div className='flex justify-between items-center px-2 pb-1'>
							<button className='bg-white p-4 rounded-full flex items-center justify-center shadow-lg hover:scale-105 duration-300 transition-transform cursor-pointer'>
								<FaPlay className='text-black' size={14} />
							</button>

							<div className='flex items-center gap-x-2'>
								<button className='bg-[#1E1F1F] p-2.5 rounded-full opacity-60 hover:opacity-85 hover:bg-neutral-800 cursor-pointer transition-all duration-300'>
									<MoreHorizontal className='text-white' size={20} />
								</button>

								<button className='bg-[#1E1F1F] p-2.5 rounded-full opacity-60 hover:opacity-85 hover:bg-neutral-800 cursor-pointer transition-all duration-300'>
									<Heart className='text-white' size={20} />
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</div>
			<h2 className='text-white text-lg font-medium'>{artist.name}</h2>
		</li>
	)
}
