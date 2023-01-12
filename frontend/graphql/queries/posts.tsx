import { graphql } from '../_generated'

export const PostsDoc = graphql(`
  query Posts($query: PaginationInput!) {
    posts(query: $query) {
      data {
        id
        createdAt
        title
        textSnippet
      }
      pagination {
        hasMore
        endCursor
      }
    }
  }
`)
