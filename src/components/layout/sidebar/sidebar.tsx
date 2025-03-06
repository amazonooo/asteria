'use client'

import { SidebarContext } from '@/providers/sidebar-provider'
import { useContext, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import SidebarButton from './sidebar-button'
import SidebarList from './sidebar-list'
import SidebarLogo from './sidebar-logo'

export default function Sidebar() {
	const { isCollapsed, toggleSidebarButton } = useContext(SidebarContext)
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div
			className='relative'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<SidebarButton
				toggleBtn={toggleSidebarButton}
				hover={isHovered}
				isCollapsed={isCollapsed}
			/>
			<aside
				className={twMerge(
					'h-full bg-[#0D0D0D] px-3 transition-all duration-300 pt-10',
					isCollapsed ? 'w-20' : 'w-64'
				)}
			>
				<SidebarLogo isCollapsed={isCollapsed} />
				<div className='flex flex-col justify-between h-full'>
					<SidebarList isCollapsed={isCollapsed} />
					<div className='w-10 h-10 rounded-full bg-white items-center justify-center'>

					</div>
				</div>
			</aside>
		</div>
	)
}