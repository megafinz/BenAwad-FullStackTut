import { graphql } from '../_generated'

export const POSTS_QUERY = graphql(`
  query Posts($input: PaginationInput!) {
    posts(input: $input) {
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
