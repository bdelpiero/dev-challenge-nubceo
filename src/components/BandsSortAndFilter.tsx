import { HStack, Select, Spinner } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IGenre } from '../types'

enum SORT_BY {
  Year = 'year',
  Country = 'country',
  Genre = 'genreCode',
}

export enum SEARCH_PARAMS {
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

  const sortByParam = searchParams.get(SEARCH_PARAMS.sortBy)
  const filterByParam = searchParams.get(SEARCH_PARAMS.filterBy)
  const defaultSortByOption = Object.values(SORT_BY).find((option) => option === sortByParam)
  const defaultFilterByOption = genres?.find((genre) => genre.code === filterByParam)

  return (
    <HStack
      spacing={4}
      align={'center'}
      alignSelf={['flex-end', 'center']}
      maxW={['250px', 'none']}
      mt={'0 !important'}
    >
      <Select
        placeholder="Sort By"
        onChange={handleSortBy}
        minW={['120px', '170px']}
        height={['30px', '40px']}
        defaultValue={defaultSortByOption}
      >
        {Object.keys(SORT_BY).map((option) => (
          <option key={option} value={SORT_BY[option as keyof typeof SORT_BY]}>
            {option}
          </option>
        ))}
      </Select>
      <Select
        placeholder="Filter By Genre"
        onChange={handleFilterBy}
        minW={['120px', '170px']}
        height={['30px', '40px']}
        defaultValue={defaultFilterByOption?.code}
      >
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
