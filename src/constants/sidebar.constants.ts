import { BookHeart, Flame, LucideIcon, Music, Search } from 'lucide-react'

interface ISidebarItem {
  name: string
  href: string
  icon: LucideIcon
}

export const SIDEBAR_ITEMS: ISidebarItem[] = [
	{
		name: 'Поиск',
		href: '/search',
		icon: Search,
	},
	{
		name: 'Главная',
		href: '/',
		icon: Music,
	},
	{
		name: 'Чарты',
		href: '/hits',
		icon: Flame,
	},
	{
		name: 'Коллекция',
		href: '/favorites',
		icon: BookHeart,
	},
]