import { graphql } from '../_generated'

export const POST_QUERY = graphql(`
  query Post($id: Int!) {
    post(id: $id) {
      id
      createdAt
      updatedAt
      title
      text
      score
      myVote {
        value
      }
      author {
        id
        username
      }
    }
  }
`)
