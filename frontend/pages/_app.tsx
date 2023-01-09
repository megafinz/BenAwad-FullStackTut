import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'urql'
import { urqlClient } from '../lib/urql'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={urqlClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}
