import { Box, Heading, Stack, Text } from '@chakra-ui/react'

interface Post {
  id: number
  title: string
  textSnippet: string
}

export default function PostList({ data }: { data: Post[] }) {
  return (
    <Stack gap={3}>
      {data.map(x => (
        <Post key={x.id} data={x} />
      ))}
    </Stack>
  )
}

function Post({ data }: { data: Post }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="10px">
      <Heading fontSize="xl">{data.title}</Heading>
      <Text>{data.textSnippet}</Text>
    </Box>
  )
}
