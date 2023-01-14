import { Button } from '@chakra-ui/react'
import { useQuery } from 'urql'
import { PostsDoc } from '~/graphql/queries'
import type { Pagination } from './model'
import { Post } from './Post'

export interface PostPageProps {
  pagination: Pagination
  isLastPage: boolean
  onLoadMore: (cursor: number) => void
}

export function PostPage({
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
