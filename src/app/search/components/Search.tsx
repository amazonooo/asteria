'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchService } from '@/services/search.service'
import { Input } from '@/components/ui/input'
import { IAlbum, IArtist, ISearchResults, ITrack } from '@/types/search.types'
import SearchTrack from './SearchTrack'
import SearchAlbum from './SearchAlbum'
import SearchArtists from './SearchArtists'
import ArtistCard from '@/components/ui/artist/artist-card'
import AlbumCard from '@/components/ui/album/album-card'
import TrackCard from '@/components/ui/track/track-card'

export default function Search() {
	const [query, setQuery] = useState('')
	const [activeTab, setActiveTab] = useState('top')

	const { data, isLoading, error } = useQuery<ISearchResults | null>({
		queryKey: ['search', query],
		queryFn: () => searchService.search(query),
		enabled: query.length > 1,
	})

	return (
		<div>
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
								: 'bg-[#333333] text-white hover:bg-neutral-700 transition-colors duration-300'
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
							<h2 className='text-2xl font-semibold mb-5'>Лучшие результаты</h2>
							<div className='flex flex-col'>
								<div className='flex'>
									<ul className='flex gap-x-8'>
										{data?.artists?.items.slice(0, 2).map((artist: IArtist) => (
											<ArtistCard artist={artist} key={artist.id} />
										))}
									</ul>
									<ul className='flex ml-10 gap-x-10'>
										{data.albums?.items.slice(0, 4).map((album: IAlbum) => (
											<AlbumCard album={album} key={album.id} />
										))}
									</ul>
								</div>
								<div className='mt-12'>
									<h2 className='text-2xl font-semibold mb-5'>Треки</h2>
									<ul className='flex flex-col gap-y-2'>
										{data?.tracks?.items.slice(0, 7).map((track: ITrack) => (
											<TrackCard track={track} key={track.id} />
										))}
									</ul>
								</div>
								<div className='mt-12'>
									<h2 className='text-2xl font-semibold mb-5'>Альбомы</h2>
									<ul className='flex items-center gap-y-10 gap-x-10'>
										{data.albums?.items.slice(0, 7).map((album: IAlbum) => (
											<AlbumCard album={album} key={album.id} />
										))}
									</ul>
								</div>
							</div>
						</>
					)}

					{activeTab === 'tracks' && <SearchTrack data={data} />}

					{activeTab === 'albums' && <SearchAlbum data={data} />}

					{activeTab === 'artists' && <SearchArtists data={data} />}
				</div>
			)}
		</div>
	)
}
