import { Flex } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { API_ENDPOINTS, API_URL } from '../constants'
import { IAlbum, IBand } from '../types'
import useFetch from '../hooks/useFetch'

export function Albums({ bandId }: { bandId: number }) {
  const { data: albums, error } = useFetch<IAlbum[]>(
    `${API_URL}/${API_ENDPOINTS.albums}?bandId=${bandId}`
  )

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

  const { data: bands, error } = useFetch<IBand[]>(`${API_URL}/${API_ENDPOINTS.bands}/?id=${id}`)

  const band = bands?.[0]
  if (!band) return null
  return (
    <>
      <p>{band.name}</p>
      <Albums bandId={band.id} />
    </>
  )
}
