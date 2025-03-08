import { Skeleton } from '@/components/ui/skeleton'

export default function TrackSkeleton() {
	return (
		<li className='flex justify-between items-center py-1.5 px-2 w-full'>
			<div className='flex items-center gap-x-3'>
				<Skeleton className='w-12 h-12 rounded-md' />
				<div className='flex flex-col gap-y-1'>
					<Skeleton className='w-40 h-4' />
					<Skeleton className='w-28 h-3' />
				</div>
			</div>
			<Skeleton className='w-12 h-4' />
		</li>
	)
}
