import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export default function SidebarLogo({ isCollapsed }: { isCollapsed: boolean }) {
  return (
		<Link href={'/'} className='mb-16 flex items-center pl-3.5 gap-3.5'>
			<Image src={'/logo.svg'} alt='logo' width={40} height={40} />
			<span
				className={twMerge(
					'text-3xl font-bold transition-all duration-300',
					isCollapsed
						? 'opacity-0 scale-x-0 w-0'
						: 'opacity-100 scale-x-100 w-auto'
				)}
			>
				Asteria
			</span>
		</Link>
	)
}