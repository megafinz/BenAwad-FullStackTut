import { graphql } from '../_generated'

export const PostsDoc = graphql(`
  query Posts {
    allPosts {
      id
      title
    }
  }
`)
