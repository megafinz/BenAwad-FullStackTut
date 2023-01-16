import { PostsQuery } from '~/graphql/_generated/graphql'
export type {
  VoteValue,
  PaginationInput as Pagination
} from '~/graphql/_generated/graphql'
export type Post = PostsQuery['posts']['data'][0]
