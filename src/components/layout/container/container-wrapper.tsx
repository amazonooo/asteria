import { ReactNode } from 'react'
import Sidebar from '../sidebar/sidebar'

export default function ContainerWrapper({
	children,
}: {
	children: ReactNode
}) {
	return (
		<div className='flex h-screen gap-4 bg-[#0D0D0D]'>
			<Sidebar />
			{children}
		</div>
	)
}
