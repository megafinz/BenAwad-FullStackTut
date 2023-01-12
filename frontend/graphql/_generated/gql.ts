/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  fragment UserFields on User {\n    id\n    username\n    email\n  }\n": types.UserFieldsFragmentDoc,
    "\n  mutation ChangePassword($newPassword: String!, $token: String!) {\n    changePassword(newPassword: $newPassword, token: $token) {\n      success\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.ChangePasswordDocument,
    "\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      post {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email) {\n      message\n    }\n  }\n": types.ForgotPasswordDocument,
    "\n  mutation LoginUser($usernameOrEmail: String!, $password: String!) {\n    loginUser(usernameOrEmail: $usernameOrEmail, password: $password) {\n      user {\n        ...UserFields\n      }\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation LogoutUser {\n    logoutUser\n  }\n": types.LogoutUserDocument,
    "\n  mutation RegisterUser($input: UserCredentialsInput!) {\n    registerUser(input: $input) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFields\n      }\n    }\n  }\n": types.RegisterUserDocument,
    "\n  query Posts($limit: Int!, $cursor: String) {\n    allPosts(limit: $limit, cursor: $cursor) {\n      id\n      createdAt\n      title\n      textSnippet\n    }\n  }\n": types.PostsDocument,
    "\n  query Me {\n    me {\n      ...UserFields\n    }\n  }\n": types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserFields on User {\n    id\n    username\n    email\n  }\n"): (typeof documents)["\n  fragment UserFields on User {\n    id\n    username\n    email\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangePassword($newPassword: String!, $token: String!) {\n    changePassword(newPassword: $newPassword, token: $token) {\n      success\n      errors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ChangePassword($newPassword: String!, $token: String!) {\n    changePassword(newPassword: $newPassword, token: $token) {\n      success\n      errors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      post {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      post {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email) {\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginUser($usernameOrEmail: String!, $password: String!) {\n    loginUser(usernameOrEmail: $usernameOrEmail, password: $password) {\n      user {\n        ...UserFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LoginUser($usernameOrEmail: String!, $password: String!) {\n    loginUser(usernameOrEmail: $usernameOrEmail, password: $password) {\n      user {\n        ...UserFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LogoutUser {\n    logoutUser\n  }\n"): (typeof documents)["\n  mutation LogoutUser {\n    logoutUser\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterUser($input: UserCredentialsInput!) {\n    registerUser(input: $input) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterUser($input: UserCredentialsInput!) {\n    registerUser(input: $input) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Posts($limit: Int!, $cursor: String) {\n    allPosts(limit: $limit, cursor: $cursor) {\n      id\n      createdAt\n      title\n      textSnippet\n    }\n  }\n"): (typeof documents)["\n  query Posts($limit: Int!, $cursor: String) {\n    allPosts(limit: $limit, cursor: $cursor) {\n      id\n      createdAt\n      title\n      textSnippet\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      ...UserFields\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      ...UserFields\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;