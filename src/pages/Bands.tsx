import { Heading, HStack, Select, Spinner } from '@chakra-ui/react'
import { API_URL, API_ENDPOINTS, TABLE_MAX_WIDTH } from '../constants'
import { useIsMobile } from '../hooks/useIsMobile'
import { BandsTable } from '../components/BandsTable'
import { BandsAccordions } from '../components/BandsAccordions'
import { useBandsWithGenre } from '../hooks/useBandsWithGenres'
import { BandsSortAndFilter } from '../components/BandsSortAndFilter'

export function Bands() {
  const { bands, genres, error } = useBandsWithGenre()

  const isMobile = useIsMobile()

  if (error) {
    return <p>{`error fetching data: ${error}`}</p>
  }

  // TODO: improve loader (table skeleton?)
  if (!bands) {
    return <Spinner />
  }

  // workaround: not very used to Chakra UI and was having trouble making the table responsive
  return (
    <>
      <HStack justifyContent={'space-between'} maxW={TABLE_MAX_WIDTH} margin={'50px auto'}>
        <Heading as="h2" size={['md', 'lg']}>
          Bands
        </Heading>
        <BandsSortAndFilter genres={genres} />
      </HStack>
      {!isMobile ? <BandsTable bands={bands} /> : <BandsAccordions bands={bands} />}
    </>
  )
}
