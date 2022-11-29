import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { API_URL, API_ENDPOINTS } from '../constants'
import { IAlbum } from '../types'
import { LoadingTable } from './LoadingTable'

export function AlbumsTable({ bandId }: { bandId?: number }) {
  const [albums, setAlbums] = useState<IAlbum[]>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>()

  // workaround. was having trouble with `useFetch` and was having a hard time debugging it
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    setLoading(true)

    fetch(`${API_URL}/${API_ENDPOINTS.albums}?bandId=${bandId}`, { signal })
      .then((res) => res.json())
      .then((data: IAlbum[]) => {
        setLoading(false)
        setAlbums(data)
      })
      .catch((e) => {
        if (e.name === 'AbortError') console.log('request cancelled')
        else setError(e)
      })

    return () => {
      controller.abort()
    }
  }, [bandId])

  if (error) {
    return <p>{`Error fetching albums: ${error}`}</p>
  }

  return (
    <Table
      alignSelf={'center'}
      size={'md'}
      maxW={['none', '600px']}
      margin={'auto'}
      mt={'50px !important'}
      border={'1px'}
      borderColor={'gray.300'}
      borderRadius={10}
      height={'fit-content'}
    >
      <Thead backgroundColor={'black'}>
        <Tr>
          <Th color={'white'}>Album</Th>
          <Th color={'white'}>Year</Th>
        </Tr>
      </Thead>
      <Tbody>
        {loading ? (
          <LoadingTable cols={2} />
        ) : !albums?.length ? (
          <Tr>
            <Td>No albums found</Td>
          </Tr>
        ) : (
          albums.map((album) => (
            // API error: should use album id as key but all ids are set to 1
            <Tr key={album.name + bandId}>
              <Td>{album.name}</Td>
              <Td>{album.year}</Td>
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
  )
}
