import { Arg, Mutation, Resolver } from 'type-graphql'
import { unvote } from './unvote'
import { vote } from './vote'
import { PostVote, UnvoteInput, VoteInput, VoteResponse } from './_model'

@Resolver(() => PostVote)
export class VoteResolver {
  @Mutation(() => VoteResponse)
  vote(@Arg('input', () => VoteInput) input: VoteInput): Promise<VoteResponse> {
    return vote(input)
  }

  @Mutation(() => VoteResponse)
  unvote(
    @Arg('input', () => UnvoteInput) input: UnvoteInput
  ): Promise<VoteResponse> {
    return unvote(input)
  }
}
