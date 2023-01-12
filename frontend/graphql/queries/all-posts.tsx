import { graphql } from '../_generated'

export const AllPostsDoc = graphql(`
  query Posts($limit: Int!, $cursor: String) {
    allPosts(limit: $limit, cursor: $cursor) {
      id
      createdAt
      title
      textSnippet
    }
  }
`)
