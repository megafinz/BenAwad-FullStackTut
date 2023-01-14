import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import type { Post as PostModel } from './model'
import { Vote } from './Vote'

export interface PostProps {
  data: PostModel
}

export function Post({ data }: PostProps) {
  return (
    <Box as="li" p={5} shadow="md" borderWidth="1px" borderRadius="10px">
      <Grid templateRows="auto auto" templateColumns="auto 1fr auto" gap={5}>
        <GridItem rowSpan={2}>
          <Vote data={data} />
        </GridItem>
        <GridItem>
          <Heading fontSize="xl">{data.title}</Heading>
        </GridItem>
        <GridItem>
          <Text color="gray">by {data.author.username}</Text>
        </GridItem>
        <GridItem>
          <Text>{data.textSnippet}</Text>
        </GridItem>
      </Grid>
    </Box>
  )
}
