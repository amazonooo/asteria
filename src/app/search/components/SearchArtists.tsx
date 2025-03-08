import ArtistCard from '@/components/ui/artist/artist-card'
import { IArtist } from '@/types/search.types'

export default function SearchArtists({ data }: { data: any }) {
  return (
		<>
			<ul className='grid grid-cols-7 items-center gap-y-16 gap-x-10'>
				{data?.artists?.items.map((artist: IArtist) => (
					<ArtistCard artist={artist} key={artist.id} />
				))}
			</ul>
		</>
	)
}