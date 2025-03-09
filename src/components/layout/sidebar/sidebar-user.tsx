'use client'

import { twMerge } from 'tailwind-merge'
import { Grid2x2, LogIn, LogOut, MessageCircleQuestion, Settings } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useMutation, useQuery } from '@tanstack/react-query'
import { userService } from '@/services/user.service'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function SidebarUser({ isCollapsed }: { isCollapsed: boolean }) {
	const { isAuthenticated } = useAuth()

	const { data: user } = useQuery({
		queryKey: ['get user'],
		queryFn: () => userService.getUserProfile(),
		enabled: isAuthenticated
	})

	const loginMutation = useMutation({
		mutationKey: ['login'],
		mutationFn: () => userService.login(),
	})

	const logoutMutation = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => userService.logout(),
	})

	return (
		<DropdownMenu>
			<div className='pl-[13px] flex items-center w-full'>
				{!isAuthenticated && (
					<Button
						variant={'secondary'}
						className='cursor-pointer flex items-center justify-center w-full'
						onClick={() => loginMutation.mutate()}
					>
						<LogIn />
					</Button>
				)}
				{isAuthenticated && (
					<>
						<DropdownMenuTrigger>
							<Avatar className='select-none cursor-pointer w-[2.5rem] h-[2.5rem] hover:scale-110 transition-transform duration-300'>
								<AvatarImage src={user?.images[1].url} alt='avatar' />
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align='start'
							className='w-72 mb-3 py-4 px-2 rounded-xl'
						>
							<DropdownMenuGroup className='flex flex-col items-center justify-center'>
								<DropdownMenuItem className='mb-2'>
									<Avatar className='select-none cursor-pointer w-16 h-16'>
										<AvatarImage src={user?.images[1].url} alt='avatar' />
									</Avatar>{' '}
								</DropdownMenuItem>
								<DropdownMenuItem className='flex flex-col'>
									<h1 className='text-lg'>{user?.display_name}</h1>
									<span className='text-neutral-400'>{user?.email}</span>
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
								<DropdownMenuItem
									onClick={() => logoutMutation.mutate()}
									className='hover:bg-[#35353A] transition-colors duration-300 flex items-center gap-x-3 rounded-lg p-2.5 cursor-pointer'
								>
									<LogOut className='text-white w-20 h-20' />
									<span className='text-lg'>Выход</span>
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</>
				)}
				<div className='flex flex-col'>
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
			</div>
		</DropdownMenu>
	)
}
