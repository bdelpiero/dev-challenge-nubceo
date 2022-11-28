import { useSearchParams } from 'react-router-dom'
import { SEARCH_PARAMS } from '../components/BandsSortAndFilter'
import { API_URL, API_ENDPOINTS } from '../constants'
import { IBand, IGenre, IBandWithGenre } from '../types'
import useFetch from './useFetch'

function buildAPIQueryString(sortParam: string | null, filterParam: string | null) {
  if (!sortParam && !filterParam) return ''
  const query = new URLSearchParams()
  if (sortParam) query.set('_sort', sortParam)
  if (filterParam) query.set('genreCode', filterParam)
  return `?${query.toString()}`
}

export function useFetchBandsWithGenre() {
  const [urlSearchParams] = useSearchParams()

  const sortParam = urlSearchParams.get(SEARCH_PARAMS.sortBy)
  const filterParam = urlSearchParams.get(SEARCH_PARAMS.filterBy)
  const apiQueryString = buildAPIQueryString(sortParam, filterParam)

  const { data: bands, error: bandsError } = useFetch<IBand[]>(
    `${API_URL}/${API_ENDPOINTS.bands}${apiQueryString}`
  )
  const { data: genres, error: genresError } = useFetch<IGenre[]>(
    `${API_URL}/${API_ENDPOINTS.genre}`
  )

  const bandsWithGenre: IBandWithGenre[] | undefined = bands?.map((band) => ({
    ...band,
    genre: genres?.find((genre) => genre.code === band.genreCode)?.name ?? '',
  }))

  return { error: genresError ?? bandsError, bands: bandsWithGenre, genres }
}
