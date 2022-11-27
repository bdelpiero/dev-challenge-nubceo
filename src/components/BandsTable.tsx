import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { TABLE_MAX_WIDTH } from '../constants'
import { IBandWithGenre } from '../types'

export function BandsTable({ bands }: { bands: IBandWithGenre[] }) {
  return (
    <TableContainer
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      whiteSpace={'normal'}
    >
      <Table
        size={'md'}
        maxW={TABLE_MAX_WIDTH}
        border={'1px'}
        borderColor={'gray.300'}
        borderRadius={10}
        height={'fit-content'}
      >
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Genre</Th>
            <Th isNumeric>Year</Th>
            <Th>Country</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bands.map((band) => (
            <Tr key={band.id}>
              <Td>
                <Link as={RouterLink} to={`/band/${band.id}`} color="blue.300">
                  {band.name}
                </Link>
              </Td>
              <Td>{band.genre}</Td>
              <Td isNumeric>{band.year}</Td>
              <Td>{band.country}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
