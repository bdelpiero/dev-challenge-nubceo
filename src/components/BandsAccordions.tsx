import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Link,
  Text,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { BAND_DETAILS } from '../constants'
import { IBandWithGenre } from '../types'
import { Detail } from './Detail'

export function BandsAccordions({ bands }: { bands: IBandWithGenre[] }) {
  return (
    <Accordion allowMultiple>
      {bands.map((band) => (
        <AccordionItem key={band.id}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {band.name}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Detail title={BAND_DETAILS.year} detail={band.year} />
            <Detail title={BAND_DETAILS.genre} detail={band.genre} />
            <Detail title={BAND_DETAILS.country} detail={band.country} />
            <Link fontSize={'14px'} color="blue.300" as={RouterLink} to={`/band/${band.id}`}>
              View more details
            </Link>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
