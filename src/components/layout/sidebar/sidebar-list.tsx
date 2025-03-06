'use client'

import { SIDEBAR_ITEMS } from '@/constants/sidebar.constants'
import { useState } from 'react'
import SidebarItem from './sidebar-item'

export default function SidebarList({ isCollapsed }: { isCollapsed: boolean }) {
	const [isActive, setIsActive] = useState<boolean>(false)

	return (
		<ul className='flex flex-col pl-5 gap-y-8'>
			{SIDEBAR_ITEMS.map((item, i) => (
				<SidebarItem key={i} href={item.href} icon={item.icon} setIsActive={setIsActive} isCollapsed={isCollapsed} name={item.name} />
			))}
		</ul>
	)
}