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

			<div className='flex-1 flex flex-col py-6 pr-4 pl-3 overflow-hidden'>
				<main className='flex-1 overflow-x-hidden bg-[#121212] rounded-lg border border-[#1B1B1B] shadow-lg custom-scrollbar px-6 py-7'>
					{children}
				</main>
			</div>
		</div>
	)
}
