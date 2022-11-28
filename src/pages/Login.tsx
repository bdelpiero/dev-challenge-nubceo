import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
  Spinner,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'
import { inputHandler } from '../helpers/ui'
import { useAuth } from '../hooks/useAuth'

export function Login() {
  const { login, loading, loginError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  const handleShowClick = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = () => {
    let error = false
    if (email === '') {
      setEmailErrorMessage('Email is required')
      error = true
    }
    if (password === '') {
      setPasswordErrorMessage('Password is required')
      error = true
    }
    if (!error) {
      setEmailErrorMessage('')
      setPasswordErrorMessage('')
      login({ email, password })
    }
  }

  const emailError = emailErrorMessage !== ''
  const passwordError = passwordErrorMessage !== ''

  return (
    <Box
      w={['full', 'md']}
      p={[8, 10]}
      mt={[20, '10vh']}
      mx="auto"
      border={['none', '1px']}
      borderColor={['', 'gray.300']}
      borderRadius={10}
    >
      <VStack spacing={4} align="flex-start" w="full">
        <VStack spacing={1} align={['flex-start', 'center']} w="full">
          <Heading>Login</Heading>
          <Text>Enter your email and password to login</Text>
        </VStack>
        {loginError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>{loginError.message}</AlertTitle>
          </Alert>
        )}
        <FormControl isRequired isInvalid={emailError}>
          <FormLabel>E-mail Address</FormLabel>
          <Input rounded="none" variant="filled" value={email} onChange={inputHandler(setEmail)} />
          <FormErrorMessage>{passwordErrorMessage}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={passwordError}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              rounded="none"
              variant="filled"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={inputHandler(setPassword)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          {passwordErrorMessage && <FormErrorMessage>{passwordErrorMessage}</FormErrorMessage>}
        </FormControl>
        <Button
          rounded="none"
          backgroundColor={'black'}
          color={'white'}
          w="full"
          onClick={handleLogin}
          mt={'35px !important'}
        >
          {loading ? <Spinner /> : 'Login'}
        </Button>
        <Box w="full" textAlign={'center'}>
          New to us?{' '}
          <Link as={RouterLink} color="teal.500" to="/signup">
            Sign Up
          </Link>
        </Box>
      </VStack>
    </Box>
  )
}
