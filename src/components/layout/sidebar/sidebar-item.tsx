'use client'

import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

interface ISidebarItem {
	isCollapsed: boolean
	setIsActive: (value: boolean) => void
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
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<li>
						<Link
							className={twMerge(
								'flex items-center transition-all duration-300 group relative',
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
				</TooltipTrigger>
				{isCollapsed && (
					<TooltipContent
						side='right'
						align='center'
						className='text-white bg-[#292929] px-2 py-1 rounded-lg text-sm'
					>
						{name}
					</TooltipContent>
				)}
			</Tooltip>
		</TooltipProvider>
	)
}
