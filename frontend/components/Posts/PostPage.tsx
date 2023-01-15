import { useQuery } from '@apollo/client'
import { Button } from '@chakra-ui/react'
import { POSTS_QUERY } from '~/graphql/queries'
import type { Pagination } from './model'
import { Post } from './Post'

export interface PostPageProps {
  pagination: Pagination
  isLastPage: boolean
  onLoadMore: (cursor: number) => void
}

export function PostPage({
  pagination,
  isLastPage,
  onLoadMore
}: PostPageProps) {
  const { data, loading } = useQuery(POSTS_QUERY, {
    variables: { input: { ...pagination } }
  })
  return (
    <>
      {!loading && data?.posts.data.map(x => <Post key={x.id} data={x} />)}
      {isLastPage && loading && (
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
