export interface IUserImage {
	url: string
	height: number
	width: number
}

export interface IUserFollowers {
	total: number
}

export interface IUserExternalUrls {
	spotify: string
}


export interface IUser {
	id: string
	display_name: string
	email: string
	images: IUserImage[]
	followers: IUserFollowers
	external_urls: IUserExternalUrls
	country: string
	product: 'premium' | 'free'
	uri: string
	type: string
}
