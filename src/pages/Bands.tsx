import { Spinner } from '@chakra-ui/react'
import { API_URL, API_ENDPOINTS } from '../constants'
import { useIsMobile } from '../hooks/useIsMobile'
import { BandsTable } from '../components/BandsTable'
import { BandsAccordions } from '../components/BandsAccordions'
import { useBandsWithGenre } from '../hooks/useBandsWithGenres'

export function Bands() {
  const { bands, error } = useBandsWithGenre()

  const isMobile = useIsMobile()

  if (error) {
    return <p>{`error fetching data: ${error}`}</p>
  }

  // TODO: improve loader (table skeleton?)
  if (!bands) {
    return <Spinner />
  }

  // workaround: not very used to Chakra UI and was having trouble making the table responsive
  return !isMobile ? <BandsTable bands={bands} /> : <BandsAccordions bands={bands} />
}
