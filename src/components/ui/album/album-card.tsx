'use client'

import { IAlbum, IArtist } from '@/types/search.types'
import Image from 'next/image'
import { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { Heart, MoreHorizontal, RedoDot, Send } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ArtistCard({ album }: { album: IAlbum }) {
	const [hoveredArtist, setHoveredArtist] = useState<string | null>(null)

	return (
		<li
			key={album.id}
			className='flex flex-col gap-y-2 cursor-pointer'
			onMouseEnter={() => setHoveredArtist(album.id)}
			onMouseLeave={() => setHoveredArtist(null)}
		>
			<div className='relative w-[220px] h-[220px]'>
				<Image
					src={album.images[0].url}
					alt={album.id}
					width={220}
					height={220}
					className='rounded-lg h-full w-full object-cover transition-all duration-300'
					style={{
						filter:
							hoveredArtist === album.id
								? 'brightness(40%)'
								: 'brightness(100%)',
					}}
				/>

				{hoveredArtist === album.id && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 5 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
						className='absolute inset-0 flex flex-col justify-between p-3'
					>
						<motion.div
							initial={{ opacity: 0, y: -55 }}
							animate={{ opacity: 1, y: 6 }}
							exit={{ opacity: 0, y: -55 }}
							transition={{ duration: 0.3, ease: 'easeOut' }}
							className='flex justify-end'
						>
							<button className='bg-[#1E1F1F] p-2.5 rounded-full opacity-70 hover:opacity-90 hover:bg-neutral-800 cursor-pointer transition-all duration-300'>
								<RedoDot className='rotate-180 text-white' size={20} />
							</button>
						</motion.div>

						<div className='flex justify-between items-center px-2 pb-1'>
							<button className='bg-white p-4 rounded-full flex items-center justify-center shadow-lg hover:scale-105 duration-300 transition-transform cursor-pointer'>
								<FaPlay className='text-black' size={14} />
							</button>

							<div className='flex items-center gap-x-2'>
								<button className='bg-[#1E1F1F] p-2.5 rounded-full opacity-70 hover:opacity-90 hover:bg-neutral-800 cursor-pointer transition-all duration-300'>
									<MoreHorizontal className='text-white' size={20} />
								</button>

								<button className='bg-[#1E1F1F] p-2.5 rounded-full opacity-70 hover:opacity-90 hover:bg-neutral-800 cursor-pointer transition-all duration-300'>
									<Heart className='text-white' size={20} />
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</div>
			<span>
				<h2 className='text-white text-sm font-medium'>{album.name}</h2>
				<span className='flex items-center gap-x-2'>
					<h2 className='text-neutral-400 text-sm font-medium'>
						{album.artists[0].name}
					</h2>
					<span className='bg-neutral-400 w-1 h-1 mt-0.5 rounded-full' />
					<p className='text-neutral-400 text-sm font-medium'>
						{album.release_date.slice(0, 4)}
					</p>
				</span>
			</span>
		</li>
	)
}
