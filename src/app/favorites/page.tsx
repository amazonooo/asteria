import type { Metadata } from 'next'
import FavoriteHero from './components/FavoriteHero'
import FavoritePlaylist from './components/FavoritePlaylist'

export const metadata: Metadata = {
  title: 'Моя коллекция',
}

export default function FavoritePage() {
  return (
    <>
      <FavoriteHero />
      <FavoritePlaylist />
    </>
  )
}
