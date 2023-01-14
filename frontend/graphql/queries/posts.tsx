import { graphql } from '../_generated'

export const PostsDoc = graphql(`
  query Posts($query: PaginationInput!) {
    posts(query: $query) {
      data {
        id
        createdAt
        title
        textSnippet
        author {
          id
          username
        }
        score
        myVote {
          value
        }
      }
      pagination {
        hasMore
        endCursor
      }
    }
  }
`)
