import { Stack } from '@chakra-ui/react'
import { useState } from 'react'
import type { Pagination } from './model'
import { PostPage } from './PostPage'

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
