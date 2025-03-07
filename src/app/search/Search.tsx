'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchService } from '@/services/search.service'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { IAlbum, IArtist, ISearchResults, ITrack } from '@/types/search.types'
import { FaPlay } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'
import { trackDuraionFormatter } from '@/utils/track-duration-formatter'
import { Heart, HeartOff } from 'lucide-react'

export default function Search() {
	const [query, setQuery] = useState('')
	const [activeTab, setActiveTab] = useState('top')
  const [isHovered, setIsHovered] = useState<string | null>(null)

	const { data, isLoading, error } = useQuery<ISearchResults | null>({
		queryKey: ['search', query],
		queryFn: () => searchService.search(query),
		enabled: query.length > 1,
	})

	return (
		<div className='px-6 py-7 bg-[#121212] rounded-xl border border-[#1B1B1B]'>
			<Input
				type='text'
				placeholder='Введите название...'
				value={query}
				onChange={e => setQuery(e.target.value)}
				className='hover:border-white/40 transition-all duration-300 focus:border-white/70 pl-5'
			/>

			<div className='flex space-x-3 mb-8 mt-6'>
				{['top', 'tracks', 'albums', 'artists'].map(tab => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`cursor-pointer px-4 py-2 rounded-full ${
							activeTab === tab
								? 'bg-teal-100 text-black'
								: 'bg-[#333333] text-white'
						}`}
					>
						{tab === 'top' && 'Топ'}
						{tab === 'tracks' && 'Треки'}
						{tab === 'albums' && 'Альбомы'}
						{tab === 'artists' && 'Исполнители'}
					</button>
				))}
			</div>

			{data && (
				<div className='mt-4'>
					{activeTab === 'top' && (
						<>
							<h3 className='text-white text-lg font-semibold mb-2'>
								Лучшие результаты
							</h3>
							<div className='flex space-x-4 overflow-x-auto pb-2'>
								{data?.artists?.items.slice(0, 5).map((artist: IArtist) => (
									<div key={artist.id} className='text-center'>
										<Image
											src={artist.images[0]?.url || '/default-avatar.png'}
											width={100}
											height={100}
											alt={artist.name}
											className='rounded-full w-[100px] h-[100px] object-cover border border-gray-700'
										/>
										<p className='text-white text-sm mt-2'>{artist.name}</p>
									</div>
								))}
							</div>
						</>
					)}

					{activeTab === 'tracks' && (
						<>
							<ul className='flex flex-col gap-y-2'>
								{data?.tracks?.items.map((track: ITrack) => (
									<li
										key={track.id}
										className='w-full hover:bg-[#252525] transition-all duration-300 rounded-md py-1.5 px-2 cursor-pointer flex justify-between items-center'
										onMouseEnter={() => setIsHovered(track.id)}
										onMouseDown={() => setIsHovered(null)}
									>
										<span className='flex'>
											<span className='relative'>
												<Image
													src={track.album.images[0].url}
													alt={track.name}
													width={45}
													height={45}
													className='h-[45px] w-[45px] rounded-md object-cover'
												/>
												{isHovered === track.id && (
													<span
														className={twMerge(
															'transition-all duration-1000 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center rounded-full h-6 w-6 bg-white',
															isHovered === track.id
																? 'opacity-100'
																: 'opacity-0'
														)}
													>
														<FaPlay size={9} className='text-black' />
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
												<Heart size={18} />
											</span>
											{isHovered === track.id ? (
												<span className='text-neutral-400 mt-1'>
													<HeartOff size={18} />
												</span>
											) : (
												<span className='text-neutral-400 mt-1 opacity-0'>
													<HeartOff size={18} />
												</span>
											)}
											<span className='text-neutral-400 '>
												{trackDuraionFormatter(track.duration_ms)}
											</span>
										</span>
									</li>
								))}
							</ul>
						</>
					)}

					{activeTab === 'albums' && (
						<>
							<ul className='grid grid-cols-5 items-center gap-y-10 gap-x-10'>
								{data?.albums?.items.map((album: IAlbum) => (
									<li
										key={album.id}
										className='h-[285px] flex flex-col gap-y-1'
									>
										<Image
											className='h-[240px] w-[240px] rounded-xl'
											src={album.images[0].url}
											alt={album.id}
											width={240}
											height={240}
										/>
										<span className='flex flex-col ml-1'>
											<span className='text-sm mt-0.5'>{album.name}</span>
											<span className='text-sm text-neutral-400'>
												{album.artists[0]?.name}
											</span>
										</span>
									</li>
								))}
							</ul>
						</>
					)}

					{activeTab === 'artists' && (
						<>
							<ul className='grid grid-cols-5 items-center gap-y-16 gap-x-10'>
								{data?.artists?.items.map((artist: IArtist) => (
									<li
										key={artist.id}
										className='flex flex-col items-center gap-y-2'
									>
										<Image
											src={artist.images[0].url}
											alt={artist.id}
											width={230}
											height={230}
											className='rounded-full h-[230px] w-[230px]'
										/>
										<h2>{artist.name}</h2>
									</li>
								))}
							</ul>
						</>
					)}
				</div>
			)}
		</div>
	)
}
