import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { BAND_DETAILS, CONTAINER_MAX_WIDTH } from '../constants'
import { IBandWithGenre } from '../types'

export function BandsTable({ bands }: { bands?: IBandWithGenre[] }) {
  return (
    <TableContainer
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      whiteSpace={'normal'}
      mb={'50px'}
    >
      <Table
        size={'md'}
        maxW={CONTAINER_MAX_WIDTH}
        border={'1px'}
        borderColor={'gray.300'}
        borderRadius={10}
        height={'fit-content'}
      >
        <Thead backgroundColor={'black'}>
          <Tr>
            <Th color={'white'}>{BAND_DETAILS.name}</Th>
            <Th color={'white'}>{BAND_DETAILS.genre}</Th>
            <Th color={'white'}>{BAND_DETAILS.year}</Th>
            <Th color={'white'}>{BAND_DETAILS.country}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!bands?.length ? (
            <Td>No bands found</Td>
          ) : (
            bands.map((band) => (
              <Tr key={band.id}>
                <Td>
                  <Link as={RouterLink} to={`/band/${band.id}`} color="blue.300">
                    {band.name}
                  </Link>
                </Td>
                <Td>{band.genre}</Td>
                <Td>{band.year}</Td>
                <Td>{band.country}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
