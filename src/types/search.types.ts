export interface IArtist {
	id: string
	name: string
	images: { url: string }[]
	genres: string[]
}

export interface IAlbum {
	id: string
	name: string
	images: { url: string }[]
	release_date: string
	total_tracks: number
  artists: IArtist[]
  tracks: ITrack[]
}

export interface ITrack {
	id: string
	name: string
	album: IAlbum
	artists: IArtist[]
	duration_ms: number
	preview_url: string | null
	uri: string
}

export interface ISearchResults {
	artists?: { items: IArtist[] }
	albums?: { items: IAlbum[] }
	tracks?: { items: ITrack[] }
}
