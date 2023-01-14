import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Button, Flex, StyleProps, Text, Tooltip } from '@chakra-ui/react'
import { useMutation, useQuery } from 'urql'
import { UnvoteDoc } from '~/graphql/mutations/unvote'
import { VoteDoc } from '~/graphql/mutations/vote'
import { MeDoc } from '~/graphql/queries'
import { VoteValue } from '~/graphql/_generated/graphql'
import { PostProps } from './Post'

const UPVOTE_COLOR: StyleProps['color'] = 'red'
const DOWNVOTE_COLOR: StyleProps['color'] = 'blue'

export function Vote({ data }: PostProps) {
  // TODO: loading state?
  const [{ data: meData }] = useQuery({ query: MeDoc })
  const [_, vote] = useMutation(VoteDoc)
  const [__, unvote] = useMutation(UnvoteDoc)
  const canVote = !!meData?.me
  const handleVote = async (voteValue: VoteValue) => {
    if (meData?.me?.id) {
      if (data.myVote?.value === voteValue) {
        await unvote({ input: { userId: meData.me.id, postId: data.id } })
      } else {
        await vote({
          input: { userId: meData.me.id, postId: data.id, value: voteValue }
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
          color={data.myVote?.value === VoteValue.Up ? UPVOTE_COLOR : 'current'}
          disabled={!canVote}
          onClick={() => handleVote(VoteValue.Up)}
        >
          <ChevronUpIcon fontSize="3xl" />
        </Button>
      </Tooltip>
      <Text
        fontSize="lg"
        color={
          data.myVote?.value === VoteValue.Up
            ? UPVOTE_COLOR
            : data.myVote?.value === VoteValue.Down
            ? DOWNVOTE_COLOR
            : 'current'
        }
      >
        {data.score}
      </Text>
      <Tooltip
        label="You must be logged in to vote"
        isDisabled={canVote}
        hasArrow
      >
        <Button
          variant="ghost"
          size="sm"
          color={
            data.myVote?.value === VoteValue.Down ? DOWNVOTE_COLOR : 'current'
          }
          disabled={!canVote}
          onClick={() => handleVote(VoteValue.Down)}
        >
          <ChevronDownIcon fontSize="3xl" />
        </Button>
      </Tooltip>
    </Flex>
  )
}