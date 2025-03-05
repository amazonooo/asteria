import { ReactNode } from 'react'

export default function ContainerWrapper({
	children,
}: {
	children: ReactNode
}) {
	return (
		<main className='w-full h-[2000px] mr-3 my-10 rounded-lg bg-[#181818] border border-white/10 overflow-y-auto'>
			{children}
		</main>
	)
}
