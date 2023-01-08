/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type LoginUserResponse = {
  __typename?: 'LoginUserResponse'
  user?: Maybe<User>
}

export type Mutation = {
  __typename?: 'Mutation'
  createPost: Post
  deletePost: Scalars['Boolean']
  loginUser: LoginUserResponse
  registerUser: RegisterUserResponse
  updatePost?: Maybe<Post>
}

export type MutationCreatePostArgs = {
  title: Scalars['String']
}

export type MutationDeletePostArgs = {
  id: Scalars['Float']
}

export type MutationLoginUserArgs = {
  input: UserCredentialsInput
}

export type MutationRegisterUserArgs = {
  input: UserCredentialsInput
}

export type MutationUpdatePostArgs = {
  id: Scalars['Float']
  title?: InputMaybe<Scalars['String']>
}

export type Post = {
  __typename?: 'Post'
  createdAt: Scalars['DateTime']
  id: Scalars['Float']
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type Query = {
  __typename?: 'Query'
  allPosts: Array<Post>
  me?: Maybe<User>
  post?: Maybe<Post>
}

export type QueryPostArgs = {
  id: Scalars['Float']
}

export type RegisterUserResponse = {
  __typename?: 'RegisterUserResponse'
  errors?: Maybe<Array<ValidationError>>
  user?: Maybe<User>
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['DateTime']
  id: Scalars['Float']
  updatedAt: Scalars['DateTime']
  username: Scalars['String']
}

export type UserCredentialsInput = {
  password: Scalars['String']
  username: Scalars['String']
}

export type ValidationError = {
  __typename?: 'ValidationError'
  field: Scalars['String']
  message: Scalars['String']
}

export type LoginUserMutationVariables = Exact<{
  input: UserCredentialsInput
}>

export type LoginUserMutation = {
  __typename?: 'Mutation'
  loginUser: {
    __typename?: 'LoginUserResponse'
    user?: { __typename?: 'User'; username: string } | null
  }
}

export type RegisterUserMutationVariables = Exact<{
  input: UserCredentialsInput
}>

export type RegisterUserMutation = {
  __typename?: 'Mutation'
  registerUser: {
    __typename?: 'RegisterUserResponse'
    errors?: Array<{
      __typename?: 'ValidationError'
      field: string
      message: string
    }> | null
    user?: { __typename?: 'User'; username: string } | null
  }
}

export const LoginUserDocument = gql`
  mutation LoginUser($input: UserCredentialsInput!) {
    loginUser(input: $input) {
      user {
        username
      }
    }
  }
`

export function useLoginUserMutation() {
  return Urql.useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LoginUserDocument
  )
}
export const RegisterUserDocument = gql`
  mutation RegisterUser($input: UserCredentialsInput!) {
    registerUser(input: $input) {
      errors {
        field
        message
      }
      user {
        username
      }
    }
  }
`

export function useRegisterUserMutation() {
  return Urql.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(
    RegisterUserDocument
  )
}
