'use client'

import * as React from 'react'
import { ChevronsUpDown, Monitor, Plus } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar'

export function TeamSwitcher() {

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<Monitor />
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
