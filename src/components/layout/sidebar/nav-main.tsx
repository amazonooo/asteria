'use client'

import { ChevronRight, Home, type LucideIcon } from 'lucide-react'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar'

export function NavMain() {
	return (
		<SidebarGroup>
			<SidebarMenuItem>
				<Home />
			</SidebarMenuItem>
		</SidebarGroup>
	)
}
