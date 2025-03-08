import { ITrack } from '@/types/search.types'
import { trackDuraionFormatter } from '@/utils/track-duration-formatter'
import { Heart, HeartOff } from 'lucide-react'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'
import { useState } from 'react'
import TrackCard from '@/components/ui/track/track-card'

export default function SearchTrack({ data }: { data: any }) {
	return (
		<ul className='flex flex-col gap-y-2'>
			{data?.tracks?.items.map((track: ITrack) => (
        <TrackCard track={track} key={track.id} />
			))}
		</ul>
	)
}
