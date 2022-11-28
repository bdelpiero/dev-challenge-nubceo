import { API_URL, API_ENDPOINTS } from '../constants'
import { IBand } from '../types'
import { useAddGenresToBands } from './useAddGenresToBands'
import useFetch from './useFetch'

export function useFetchBandById(id?: string) {
  const { data: bands, error: bandsError } = useFetch<IBand[]>(
    `${API_URL}/${API_ENDPOINTS.bands}?id=${id}`
  )

  const { bandsWithGenre, genresError } = useAddGenresToBands(bands)
  const band = bandsWithGenre?.[0]

  return { error: genresError ?? bandsError, band }
}
