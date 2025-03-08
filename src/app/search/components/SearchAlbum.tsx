import AlbumCard from '@/components/ui/album/album-card'
import { IAlbum } from '@/types/search.types'
import Image from 'next/image'

export default function SearchAlbum({ data }: { data: any }) {
  return (
		<>
			<ul className='grid lg:grid-cols-5 xl:grid-cols-6 items-center gap-y-10 gap-x-10'>
				{data?.albums?.items.map((album: IAlbum) => (
					<AlbumCard album={album} />
				))}
			</ul>
		</>
	)
}