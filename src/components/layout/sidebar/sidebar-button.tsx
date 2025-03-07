'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SidebarContext } from '@/providers/sidebar-provider'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useContext } from 'react'

export default function SidebarButton({
	toggleBtn,
	isCollapsed,
	hover,
}: {
	toggleBtn: () => void
	hover: boolean
	isCollapsed: boolean
}) {
	return (
		<button
			className={cn(
				'absolute top-[45px] w-5 h-8 bg-neutral-800 border border-white/10 rounded-md z-50 transition-all duration-300 text-neutral-300 cursor-pointer flex items-center justify-center hover:bg-neutral-900',
				hover ? 'opacity-100' : 'opacity-0', isCollapsed ? '-right-3' : 'right-0'
			)}
			onClick={toggleBtn}
		>
			{isCollapsed ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
		</button>
	)
}