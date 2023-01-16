/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ChangePasswordResponse = {
  __typename?: 'ChangePasswordResponse';
  errors?: Maybe<Array<ValidationError>>;
  success: Scalars['Boolean'];
};

export type CreatePostInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type CreatePostResponse = {
  __typename?: 'CreatePostResponse';
  errors?: Maybe<Array<ValidationError>>;
  post?: Maybe<Post>;
};

export type DeletePostResponse = {
  __typename?: 'DeletePostResponse';
  errors?: Maybe<Array<ValidationError>>;
  success: Scalars['Boolean'];
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  message: Scalars['String'];
};

export type LoginUserResponse = {
  __typename?: 'LoginUserResponse';
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: ChangePasswordResponse;
  createPost: CreatePostResponse;
  deletePost: DeletePostResponse;
  forgotPassword: ForgotPasswordResponse;
  loginUser: LoginUserResponse;
  logoutUser: Scalars['Boolean'];
  registerUser: RegisterUserResponse;
  unvote: VoteResponse;
  vote: VoteResponse;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginUserArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  input: UserCredentialsInput;
};


export type MutationUnvoteArgs = {
  input: UnvoteInput;
};


export type MutationVoteArgs = {
  input: VoteInput;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  endCursor: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export type PaginationInput = {
  cursor?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  myVote?: Maybe<PostVote>;
  score: Scalars['Int'];
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PostVote = {
  __typename?: 'PostVote';
  user: User;
  userId: Scalars['Int'];
  value: VoteValue;
};

export type PostsResponse = {
  __typename?: 'PostsResponse';
  data: Array<Post>;
  pagination: PaginationInfo;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PostsResponse;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  input: PaginationInput;
};

export type RegisterUserResponse = {
  __typename?: 'RegisterUserResponse';
  errors?: Maybe<Array<ValidationError>>;
  user?: Maybe<User>;
};

export type UnvoteInput = {
  postId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type UserCredentialsInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type ValidationError = {
  __typename?: 'ValidationError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type VoteInput = {
  postId: Scalars['Int'];
  userId: Scalars['Int'];
  value: VoteValue;
};

export type VoteResponse = {
  __typename?: 'VoteResponse';
  errors?: Maybe<Array<ValidationError>>;
  success: Scalars['Boolean'];
};

export enum VoteValue {
  Down = 'DOWN',
  Up = 'UP'
}

export type UserFieldsFragment = { __typename?: 'User', id: number, username: string, email: string };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePasswordResponse', success: boolean, errors?: Array<{ __typename?: 'ValidationError', field: string, message: string }> | null } };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'CreatePostResponse', post?: { __typename?: 'Post', id: number } | null, errors?: Array<{ __typename?: 'ValidationError', field: string, message: string }> | null } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'DeletePostResponse', success: boolean, errors?: Array<{ __typename?: 'ValidationError', message: string }> | null } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordResponse', message: string } };

export type LoginUserMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginUserResponse', user?: { __typename?: 'User', id: number, username: string, email: string } | null } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: boolean };

export type RegisterUserMutationVariables = Exact<{
  input: UserCredentialsInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'RegisterUserResponse', errors?: Array<{ __typename?: 'ValidationError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string } | null } };

export type UnvoteMutationVariables = Exact<{
  input: UnvoteInput;
}>;


export type UnvoteMutation = { __typename?: 'Mutation', unvote: { __typename?: 'VoteResponse', success: boolean, errors?: Array<{ __typename?: 'ValidationError', message: string }> | null } };

export type VoteMutationVariables = Exact<{
  input: VoteInput;
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: { __typename?: 'VoteResponse', success: boolean, errors?: Array<{ __typename?: 'ValidationError', message: string }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, email: string } | null };

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: number, createdAt: any, updatedAt: any, title: string, text: string, score: number, myVote?: { __typename?: 'PostVote', value: VoteValue } | null, author: { __typename?: 'User', id: number, username: string } } | null };

export type PostsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostsResponse', data: Array<{ __typename?: 'Post', id: number, createdAt: any, title: string, textSnippet: string, score: number, author: { __typename?: 'User', id: number, username: string }, myVote?: { __typename?: 'PostVote', value: VoteValue } | null }>, pagination: { __typename?: 'PaginationInfo', hasMore: boolean, endCursor: number } } };

export const UserFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<UserFieldsFragment, unknown>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeletePostMutation, DeletePostMutationVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usernameOrEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"usernameOrEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usernameOrEmail"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}}]}},...UserFieldsFragmentDoc.definitions]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logoutUser"}}]}}]} as unknown as DocumentNode<LogoutUserMutation, LogoutUserMutationVariables>;
export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserCredentialsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}}]}},...UserFieldsFragmentDoc.definitions]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const UnvoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Unvote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnvoteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unvote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UnvoteMutation, UnvoteMutationVariables>;
export const VoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Vote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VoteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<VoteMutation, VoteMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},...UserFieldsFragmentDoc.definitions]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const PostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Post"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"myVote"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<PostQuery, PostQueryVariables>;
export const PostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Posts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"textSnippet"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"myVote"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]} as unknown as DocumentNode<PostsQuery, PostsQueryVariables>;