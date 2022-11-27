import { Box, Button, Flex } from '@chakra-ui/react'
import { Navigate, useOutlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute() {
  const { user } = useAuth()
  const outlet = useOutlet()

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <Header />
      {outlet}
    </div>
  )
}
