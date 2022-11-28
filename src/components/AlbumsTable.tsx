import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Spinner } from '@chakra-ui/react'
import { API_URL, API_ENDPOINTS, CONTAINER_MAX_WIDTH, BAND_DETAILS } from '../constants'
import useFetch from '../hooks/useFetch'
import { IAlbum } from '../types'
import { LoadingTable } from './LoadingTable'

export function AlbumsTable({ bandId }: { bandId?: number }) {
  const { data: albums, error } = useFetch<IAlbum[]>(
    `${API_URL}/${API_ENDPOINTS.albums}?bandId=${bandId}`
  )

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
        {!bandId || !albums ? (
          <LoadingTable cols={2} />
        ) : !albums.length ? (
          <Td>No albums found</Td>
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
