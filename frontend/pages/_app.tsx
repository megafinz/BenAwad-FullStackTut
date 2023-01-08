import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider, createClient } from 'urql'

const urqlClient = createClient({
  // TODO: read from config/env vars
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include'
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={urqlClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}
