import { Flex, Button, Spinner } from "@chakra-ui/react"
import { useAuth } from "../hooks/useAuth"

export function Header() {
  const { logout, loading } = useAuth()

  return (
    <Flex justifyContent={"flex-end"} padding={"20px"}>
      <Button onClick={logout}> {loading ? <Spinner /> : "Logout"} </Button>
    </Flex>
  )
}
