import { Flex } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { API_ENDPOINTS, API_URL } from '../constants'
import { IAlbum } from '../types'
import useFetch from '../hooks/useFetch'
import { useFetchBandById } from '../hooks/useFetchBandById'

export function Albums({ bandId }: { bandId: number }) {
  const { data: albums, error } = useFetch<IAlbum[]>(
    `${API_URL}/${API_ENDPOINTS.albums}?bandId=${bandId}`
  )

  // TODO: add loader
  return (
    <Flex>
      {albums?.map((album) => (
        // API error: should use album id as key but all ids are set to 1
        <p key={`${bandId}-${album.name}`}>{album.name}</p>
      ))}
    </Flex>
  )
}

export function Band() {
  const { id } = useParams()
  const { band, error } = useFetchBandById(id)

  // TODO: loader
  if (!band) return null

  console.log(band, 'band')

  return (
    <>
      <p>{band.name}</p>
      <Albums bandId={band.id} />
    </>
  )
}
