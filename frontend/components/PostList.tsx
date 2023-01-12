import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useQuery } from 'urql'
import { PostsDoc } from '~/graphql/queries'

interface Post {
  id: number
  title: string
  textSnippet: string
}

interface Pagination {
  limit: number
  cursor: number | null
}

interface PostPageProps {
  pagination: Pagination
  isLastPage: boolean
  onLoadMore: (cursor: number) => void
}

interface PostProps {
  data: Post
}

export default function PostList() {
  const [pages, setPages] = useState<Pagination[]>([
    {
      limit: 10,
      cursor: null
    }
  ])
  const loadMore = (cursor: number) => {
    setPages([...pages, { limit: 10, cursor }])
  }
  return (
    <Stack as="ol" gap={3} listStyleType="none">
      {pages.map((x, i) => (
        <PostPage
          key={x.cursor || 'x'}
          pagination={x}
          isLastPage={i === pages.length - 1}
          onLoadMore={loadMore}
        />
      ))}
    </Stack>
  )
}

function PostPage({
  pagination: pagination,
  isLastPage,
  onLoadMore
}: PostPageProps) {
  const [{ data, fetching }] = useQuery({
    query: PostsDoc,
    variables: { query: pagination }
  })
  return (
    <>
      {!fetching && data?.posts.data.map(x => <Post key={x.id} data={x} />)}
      {isLastPage && fetching && (
        <Button color="teal" isLoading={true}>
          Load More
        </Button>
      )}
      {isLastPage && data?.posts.pagination.hasMore && (
        <Button
          color="teal"
          onClick={() => onLoadMore(data.posts.pagination.endCursor)}
        >
          Load More
        </Button>
      )}
    </>
  )
}

function Post({ data: post }: PostProps) {
  return (
    <Box as="li" p={5} shadow="md" borderWidth="1px" borderRadius="10px">
      <Heading fontSize="xl">{post.title}</Heading>
      <Text>{post.textSnippet}</Text>
    </Box>
  )
}
