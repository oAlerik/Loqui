import { IconButton, Image, Text, VStack } from "@chakra-ui/react"
import { Post } from "db"
import { useState } from "react"

export default function VoteBar({ post }: { post: Post }) {
  const [votes, setVotes] = useState(post.votes)
  const [voteStatus, setVoteStatus] = useState(0)

  const handleVote = (action: string) => {
    if (action === "up") {
      // no vote => upvote
      if (voteStatus === 0) {
        setVotes(votes + 1)
        setVoteStatus(1)
      }

      // downvote => upvote
      if (voteStatus === -1) {
        setVotes(votes + 2)
        setVoteStatus(1)
      }

      // upvote => no vote
      if (voteStatus === 1) {
        setVotes(votes - 1)
        setVoteStatus(0)
      }
    }

    if (action === "down") {
      // no vote => downvote
      if (voteStatus === 0) {
        setVotes(votes - 1)
        setVoteStatus(-1)
      }

      // upvote => downvote
      if (voteStatus === 1) {
        setVotes(votes - 2)
        setVoteStatus(-1)
      }

      // downvote => no vote
      if (voteStatus === -1) {
        setVotes(votes + 1)
        setVoteStatus(0)
      }
    }
  }

  return (
    <VStack pr={2}>
      <IconButton
        w={50}
        p={4}
        aria-label="upvote"
        variant="ghost"
        icon={<Image alt="upvote" src="icons/arrow.png" />}
        onClick={() => handleVote("up")}
      />
      <Text>{votes}</Text>
      <IconButton
        w={50}
        p={4}
        aria-label="downvote"
        variant="ghost"
        transform="rotate(180deg)"
        icon={<Image alt="downvote" src="icons/arrow.png" />}
        onClick={() => handleVote("down")}
      />
    </VStack>
  )
}
