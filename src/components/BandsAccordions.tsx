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
import { IBandWithGenre } from '../types'

function Detail({ title, detail }: { title: string; detail: string | number }) {
  return (
    <Box>
      <Text display={'inline-block'} fontWeight={'600'}>
        {title}:
      </Text>{' '}
      {detail}
    </Box>
  )
}

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
            <Detail title={'year'} detail={band.year} />
            <Detail title={'genre'} detail={band.genre} />
            <Detail title={'country'} detail={band.country} />
            <Link fontSize={'14px'} color="blue.300" as={RouterLink} to={`/band/${band.id}`}>
              View more details
            </Link>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
