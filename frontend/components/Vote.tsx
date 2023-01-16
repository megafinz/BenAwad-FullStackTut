import { useMutation, useQuery } from '@apollo/client'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Button, Flex, StyleProps, Text, Tooltip } from '@chakra-ui/react'
import { UNVOTE_MUT, VOTE_MUT } from '~/graphql/mutations'
import { ME_QUERY, POSTS_QUERY } from '~/graphql/queries'
import { VoteValue } from '~/graphql/_generated/graphql'

const UPVOTE_COLOR: StyleProps['color'] = 'red'
const DOWNVOTE_COLOR: StyleProps['color'] = 'blue'

interface Props {
  data: {
    id: number
    score: number
    myVote?: {
      value: VoteValue
    } | null
  }
}

export function Vote({ data: { id, score, myVote } }: Props) {
  // TODO: loading state?
  const { data: meData } = useQuery(ME_QUERY)
  const [vote] = useMutation(VOTE_MUT, { refetchQueries: [POSTS_QUERY] })
  const [unvote] = useMutation(UNVOTE_MUT, { refetchQueries: [POSTS_QUERY] })
  const canVote = !!meData?.me
  const handleVote = async (voteValue: VoteValue) => {
    if (meData?.me?.id) {
      if (myVote?.value === voteValue) {
        await unvote({
          variables: { input: { userId: meData.me.id, postId: id } }
        })
      } else {
        await vote({
          variables: {
            input: { userId: meData.me.id, postId: id, value: voteValue }
          }
        })
      }
    } else {
      console.error(`Can't apply vote because User id is missing`)
    }
  }
  return (
    <Flex flexDir="column" alignItems="center">
      <Tooltip
        label="You must be logged in to vote"
        isDisabled={canVote}
        hasArrow
      >
        <Button
          variant="ghost"
          size="sm"
          color={myVote?.value === VoteValue.Up ? UPVOTE_COLOR : 'current'}
          disabled={!canVote}
          onClick={() => handleVote(VoteValue.Up)}
        >
          <ChevronUpIcon fontSize="3xl" />
        </Button>
      </Tooltip>
      <Text
        fontSize="lg"
        color={
          myVote?.value === VoteValue.Up
            ? UPVOTE_COLOR
            : myVote?.value === VoteValue.Down
            ? DOWNVOTE_COLOR
            : 'current'
        }
      >
        {score}
      </Text>
      <Tooltip
        label="You must be logged in to vote"
        isDisabled={canVote}
        hasArrow
      >
        <Button
          variant="ghost"
          size="sm"
          color={myVote?.value === VoteValue.Down ? DOWNVOTE_COLOR : 'current'}
          disabled={!canVote}
          onClick={() => handleVote(VoteValue.Down)}
        >
          <ChevronDownIcon fontSize="3xl" />
        </Button>
      </Tooltip>
    </Flex>
  )
}
