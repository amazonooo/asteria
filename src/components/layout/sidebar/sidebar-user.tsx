'use client'

import { twMerge } from 'tailwind-merge'

import {
	Grid2x2,
	LogOut,
	MessageCircleQuestion,
	Settings,
} from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/user.service'

export default function SidebarUser({ isCollapsed }: { isCollapsed: boolean }) {
	const { data: user } = useQuery({
		queryKey: ['get user'],
		queryFn: () => userService.getUserProfile()
	})

	return (
		<DropdownMenu>
			<div className='pl-3.5 flex items-center w-full'>
				<DropdownMenuTrigger>
					<button className='cursor-pointer bg-black border-2 border-teal-100 w-10 h-10 rounded-full flex items-center justify-center shrink-0' />
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align='start'
					className='w-72 mb-3 py-4 px-2 rounded-xl'
				>
					<DropdownMenuGroup className='flex flex-col items-center justify-center'>
						<DropdownMenuItem className='mb-2'>
							<button className='cursor-pointer bg-black border-2 border-teal-100 w-12 h-12 rounded-full flex items-center justify-center shrink-0' />
						</DropdownMenuItem>
						<DropdownMenuItem>
							<h1 className='text-lg'>Username</h1>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuGroup className='mt-6 w-full flex flex-col gap-y-2'>
						<DropdownMenuItem className='hover:bg-[#35353A] transition-colors duration-300 flex items-center gap-x-3 rounded-lg p-2.5 cursor-pointer'>
							<Grid2x2 className='text-white w-20 h-20' />
							<span className='text-lg'>Управление аккаунтом</span>
						</DropdownMenuItem>
						<DropdownMenuItem className='hover:bg-[#35353A] transition-colors duration-300 flex items-center gap-x-3 rounded-lg p-2.5 cursor-pointer'>
							<MessageCircleQuestion className='text-white' />
							<span className='text-lg'>Чат с поддержкой</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup className='mt-1.5 flex w-full flex-col gap-y-1.5'>
						<DropdownMenuItem className='hover:bg-[#35353A] transition-colors duration-300 flex items-center gap-x-3 rounded-lg p-2.5 cursor-pointer'>
							<Settings className='text-white w-20 h-20' />
							<span className='text-lg'>Настройки</span>
						</DropdownMenuItem>
						<DropdownMenuItem className='hover:bg-[#35353A] transition-colors duration-300 flex items-center gap-x-3 rounded-lg p-2.5 cursor-pointer'>
							<LogOut className='text-white w-20 h-20' />
							<span className='text-lg'>Выход</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
				<span
					className={twMerge(
						'text-lg ml-4 transition-all duration-300 origin-left',
						isCollapsed
							? 'opacity-0 scale-95 w-0'
							: 'opacity-100 scale-100 w-auto'
					)}
				>
					{user?.display_name}
				</span>
			</div>
		</DropdownMenu>
	)
}
