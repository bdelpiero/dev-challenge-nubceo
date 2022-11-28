import { API_URL, API_ENDPOINTS } from '../constants'
import { IBand, IBandWithGenre, IGenre } from '../types'
import useFetch from './useFetch'

export function useAddGenresToBands(bands?: IBand[]) {
  const { data: genres, error: genresError } = useFetch<IGenre[]>(
    `${API_URL}/${API_ENDPOINTS.genre}`
  )
  const bandsWithGenre: IBandWithGenre[] | undefined = bands?.map((band) => ({
    ...band,
    genre: genres?.find((genre) => genre.code === band.genreCode)?.name ?? '',
  }))

  return { genres, bandsWithGenre, genresError }
}
