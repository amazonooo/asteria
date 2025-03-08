import type { Metadata } from 'next'
import Search from './components/Search'

export const metadata: Metadata = {
  title: 'Поиск',
}

export default function SearchPage() {
  return <Search />
}
