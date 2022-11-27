import { Box, Flex, Link, Spinner } from "@chakra-ui/react"
import { API_URL, API_ENDPOINTS } from "../constants"
import { IBand } from "../types"
import useFetch from "../hooks/useFetch"

export function Bands() {
  const { data: bands, error } = useFetch<IBand[]>(`${API_URL}/${API_ENDPOINTS.bands}`)
  const loading = !bands

  // show loader (table skeleton?)
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <p>{`error fetching data: ${error}`}</p>
  }

  // show bands
  return (
    <Flex flexDir={"column"}>
      {bands?.map((band) => (
        <Link key={band.id} href={`/band/${band.id}`}>
          {band.name}
        </Link>
      ))}
    </Flex>
  )
}
