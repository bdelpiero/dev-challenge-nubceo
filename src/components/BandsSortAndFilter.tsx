import { HStack, Select, Spinner } from '@chakra-ui/react'
import { ChangeEvent, ReactEventHandler } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IGenre } from '../types'

enum SORT_BY {
  year = 'year',
  country = 'country',
  genre = 'genre',
}

enum SEARCH_PARAMS {
  sortBy = 'sortBY',
  filterBy = 'filterBy',
}

export function BandsSortAndFilter({ genres }: { genres?: IGenre[] }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const updateParam = (key: SEARCH_PARAMS, value: string) => {
    if (!value) {
      searchParams.delete(key)
      setSearchParams(searchParams)
      return
    }
    searchParams.set(key, value)
    setSearchParams(searchParams)
  }

  const handleSortBy = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    updateParam(SEARCH_PARAMS.sortBy, e.target.value)
  }

  const handleFilterBy = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    updateParam(SEARCH_PARAMS.filterBy, e.target.value)
  }

  return (
    <HStack spacing={4} align={'center'}>
      <Select placeholder="Sort By" onChange={handleSortBy}>
        {Object.values(SORT_BY).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <Select placeholder="Filter By" onChange={handleFilterBy}>
        {!genres ? (
          <Spinner />
        ) : (
          <>
            {genres.map((genre) => (
              <option key={genre.code} value={genre.code}>
                {genre.name}
              </option>
            ))}
          </>
        )}
      </Select>
    </HStack>
  )
}
