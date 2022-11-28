import { Flex, Heading, Spinner, VStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { API_ENDPOINTS, API_URL, BAND_DETAILS } from '../constants'
import { IAlbum } from '../types'
import useFetch from '../hooks/useFetch'
import { useFetchBandById } from '../hooks/useFetchBandById'
import { Detail } from '../components/Detail'
import { CONTAINER_MAX_WIDTH } from '../constants'
import { AlbumsTable } from '../components/AlbumsTable'

export function Band() {
  const { id } = useParams()
  const { band, error } = useFetchBandById(id)

  // TODO: create Error component
  if (error) {
    return <p>{`Error fetching band details: ${error}`}</p>
  }

  return (
    <VStack
      border={['none', '1px']}
      borderColor={['', 'gray.300']}
      borderRadius={10}
      maxW={CONTAINER_MAX_WIDTH}
      margin={'auto'}
      mt={['50px', '100px']}
      spacing={4}
      alignItems={'flex-start'}
      padding={'50px'}
    >
      {!band ? (
        <Spinner alignSelf={'center'} padding={'20px auto'} />
      ) : (
        <>
          <Heading as="h2" size="xl">
            {band.name}
          </Heading>
          <Detail title={BAND_DETAILS.country} detail={band.country} />
          <Detail title={BAND_DETAILS.genre} detail={band.genre} />
          <Detail title={BAND_DETAILS.year} detail={band.year} />
          <Detail
            title={BAND_DETAILS.members}
            detail={band.members.map((member) => member.name).join(', ')}
          />
        </>
      )}
      <AlbumsTable bandId={band?.id} />
    </VStack>
  )
}
