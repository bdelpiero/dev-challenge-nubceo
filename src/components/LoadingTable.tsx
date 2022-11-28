import { Tr, Td, Spinner } from '@chakra-ui/react'

export function LoadingTable({ cols }: { cols: number }) {
  return (
    <Tr>
      <Td colSpan={cols} textAlign={'center'} padding={'30px'}>
        <Spinner />
      </Td>
    </Tr>
  )
}
