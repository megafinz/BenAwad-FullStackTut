import { useMutation, useQuery } from '@apollo/client'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Text,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react'
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage
} from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Layout from '~/components/Layout'
import Loader from '~/components/Loader'
import { Vote } from '~/components/Vote'
import { DELETE_POST_MUT } from '~/graphql/mutations'
import { ME_QUERY, POSTS_QUERY, POST_QUERY } from '~/graphql/queries'

interface Props {
  id: number
}

// TODO: SSR
// TODO: display gql errors properly
const PostPage: NextPage<Props> = ({ id }) => {
  const router = useRouter()
  const { data: meData } = useQuery(ME_QUERY)
  const { data: postData, loading: postLoading } = useQuery(POST_QUERY, {
    variables: { id }
  })
  useEffect(() => {
    if (!postLoading && !postData?.post) {
      router.replace('/404', router.asPath)
    }
  }, [postLoading, postData, router])
  return (
    <Layout title="Post">
      <>
        {postLoading && <Loader />}
        {!postLoading && postData?.post && (
          <Grid templateColumns="auto 1fr" gap={5}>
            <GridItem>
              <Vote data={postData.post} />
            </GridItem>
            <GridItem>
              <Flex flexDir="column" gap={5}>
                <Flex alignItems="center" gap={3}>
                  <Heading flexGrow={1}>{postData.post.title}</Heading>
                  {/* Post is by current user */}
                  {meData?.me?.id === postData.post.author.id && (
                    <>
                      <EditPostButton postId={postData.post.id} />
                      <DeletePostButton postId={postData.post.id} />
                    </>
                  )}
                  {/* Post is by someone else */}
                  {meData?.me?.id !== postData.post.author.id && (
                    <Text color="gray">by {postData.post.author.username}</Text>
                  )}
                </Flex>
                <Divider />
                <Text>{postData.post.text}</Text>
              </Flex>
            </GridItem>
          </Grid>
        )}
      </>
    </Layout>
  )
}

function EditPostButton({ postId }: { postId: number }) {
  return (
    <Tooltip label="Edit Post">
      <IconButton variant="outline" aria-label="Edit Post">
        <NextLink href={`/post/${postId}/edit`}>
          <EditIcon />
        </NextLink>
      </IconButton>
    </Tooltip>
  )
}

// TODO: display gql errors properly
function DeletePostButton({ postId }: { postId: number }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const cancelRef = useRef(null)
  const router = useRouter()
  const [deletePost] = useMutation(DELETE_POST_MUT, {
    refetchQueries: [POSTS_QUERY]
  })
  const handleDelete = async () => {
    setIsLoading(true)
    const { data, errors } = await deletePost({ variables: { id: postId } })
    if (errors) {
      console.error(
        '❗ Something went wrong while attempting to delete the Post',
        errors
      )
      alert('❗ Something went wrong while attempting to delete the Post')
      setIsLoading(false)
    } else if (data?.deletePost.errors) {
      alert(`❗ ${data.deletePost.errors.map(x => x.message).join(', ')}`)
      setIsLoading(false)
    } else if (data?.deletePost.success) {
      router.push('/')
    } else {
      alert('❗ Something went wrong while attempting to delete the Post')
      setIsLoading(false)
    }
  }
  return (
    <>
      <Tooltip label="Delete Post">
        <IconButton
          colorScheme="red"
          variant="outline"
          aria-label="Delete Post"
          onClick={onOpen}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Post</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this Post?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Flex gap={3}>
                <Button ref={cancelRef} onClick={onClose} isLoading={isLoading}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={handleDelete}
                  isLoading={isLoading}
                >
                  Delete
                </Button>
              </Flex>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

// TODO: SSR
export async function getServerSideProps({
  params
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  const id = parseInt(typeof params?.id === 'string' ? params.id : '')
  if (!id) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      id
    }
  }
}

export default PostPage
