import { ReactNode } from 'react'
import Sidebar from '../sidebar/sidebar'

export default function ContainerWrapper({
	children,
}: {
	children: ReactNode
}) {
	return (
		<div className='flex h-screen bg-[#0D0D0D] overflow-hidden'>
			<Sidebar />

			<div className='flex-1 p-6'>
				<main className='w-full h-[95vh] overflow-auto bg-[#121212] rounded-lg border border-[#1B1B1B] shadow-lg custom-scrollbar'>
					{children}
				</main>
			</div>
		</div>
	)
}
