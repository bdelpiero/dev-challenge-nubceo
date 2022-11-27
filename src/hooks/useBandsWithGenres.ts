import { API_URL, API_ENDPOINTS } from '../constants'
import { IBand, IGenre, IBandWithGenre } from '../types'
import useFetch from './useFetch'

export function useBandsWithGenre() {
  const { data: bands, error: bandsError } = useFetch<IBand[]>(`${API_URL}/${API_ENDPOINTS.bands}`)
  const { data: genres, error: genresError } = useFetch<IGenre[]>(
    `${API_URL}/${API_ENDPOINTS.genre}`
  )

  const bandsWithGenre: IBandWithGenre[] | undefined = bands?.map((band) => ({
    ...band,
    genre: genres?.find((genre) => genre.code === band.genreCode)?.name ?? '',
  }))

  return { error: genresError ?? bandsError, bands: bandsWithGenre, genres }
}
