import { Heading, HStack, Spinner, Stack } from '@chakra-ui/react'
import { TABLE_MAX_WIDTH } from '../constants'
import { useIsMobile } from '../hooks/useIsMobile'
import { BandsTable } from '../components/BandsTable'
import { BandsAccordions } from '../components/BandsAccordions'
import { useFetchBandsWithGenre } from '../hooks/useFetchBandsWithGenres'
import { BandsSortAndFilter } from '../components/BandsSortAndFilter'

export function Bands() {
  const { bands, genres, error } = useFetchBandsWithGenre()

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
      <Stack
        flexDir={['column', 'row']}
        justifyContent={'space-between'}
        padding={'0 15px'}
        maxW={TABLE_MAX_WIDTH}
        margin={'50px auto'}
      >
        <Heading as="h2" size={'lg'} mb={['20px', '0px']}>
          Bands
        </Heading>
        <BandsSortAndFilter genres={genres} />
      </Stack>
      {!isMobile ? <BandsTable bands={bands} /> : <BandsAccordions bands={bands} />}
    </>
  )
}
