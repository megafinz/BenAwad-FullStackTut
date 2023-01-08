import { Box } from '@chakra-ui/react'
import Head from 'next/head'

interface Props {
  children?: React.ReactNode
  title?: string
  description?: string
  variant?: 'regular' | 'small'
}

export default function Layout({
  children,
  title = 'Full Stack Tut',
  description = 'Full Stack Tut',
  variant = 'regular'
}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        as="main"
        mx="auto"
        width="100%"
        p="50px"
        maxW={variant === 'small' ? '400px' : '800px'}
      >
        {children}
      </Box>
    </>
  )
}
