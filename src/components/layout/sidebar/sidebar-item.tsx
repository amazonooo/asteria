'use client'

import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

interface ISidebarItem {
	isCollapsed: boolean
	setIsActive: any
	href: string
	icon: LucideIcon
	name: string
}

export default function SidebarItem({
	isCollapsed,
	setIsActive,
	href,
	icon: Icon,
	name,
}: ISidebarItem) {
  const pathname = usePathname()

	return (
		<li>
			<Link
				className={twMerge(
					'flex items-center transition-all duration-300 group',
					pathname === href
						? 'text-teal-100 font-semibold'
						: 'text-neutral-400 font-medium'
				)}
				href={href}
				onClick={() => setIsActive(true)}
			>
				<span className='w-6 h-6'>
					<Icon
						size={27}
						className='group-hover:text-teal-100 duration-300 transition-colors'
					/>
				</span>

				<span
					className={twMerge(
						'ml-4 font-medium transition-all duration-300 group-hover:text-teal-100',
						isCollapsed
							? 'opacity-0 scale-x-0 w-0'
							: 'opacity-100 scale-x-100 w-auto'
					)}
				>
					{name}
				</span>
			</Link>
		</li>
	)
}