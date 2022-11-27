export interface IAlbum {
  id: number
  bandId: number
  name: string
  year: number
}

export interface IBand {
  id: number
  name: string
  genreCode: string
  year: number
  country: string
  members: { name: string }[]
}
