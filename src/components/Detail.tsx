import { Box, Text } from '@chakra-ui/react'

export function Detail({
  title,
  detail,
  fontSize = '',
}: {
  title: string
  detail: string | number
  fontSize?: string
}) {
  return (
    <Box>
      <Text display={'inline-block'} fontWeight={'600'}>
        {title}:
      </Text>{' '}
      {detail}
    </Box>
  )
}
