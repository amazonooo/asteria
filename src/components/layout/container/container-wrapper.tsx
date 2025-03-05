import React, { ReactNode } from 'react'

export default function ContainerWrapper({ children }: { children: ReactNode }) {
	return (
		<main className='w-full py-6 px-5 sm:px-10 overflow-auto bg-[#121212]'>
			{children}
		</main>
	)
}