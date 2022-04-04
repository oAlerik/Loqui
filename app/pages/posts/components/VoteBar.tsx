import { IconButton, Image, Text, VStack } from "@chakra-ui/react"
import { Post } from "db"
import { useLayoutEffect, useState } from "react"

export default function VoteBar({ post }: { post: Post }) {
  const [votes, setVotes] = useState(post.votes)
  const [userVote, setUserVote] = useState(0)

  useLayoutEffect(() => {
    setVotes(post.votes)
  }, [post])

  enum VoteType {
    Upvote,
    Downvote,
    Reset,
  }

  const handleVote = (voteType: VoteType) => {
    switch (voteType) {
      case VoteType.Upvote:
        return setUserVote(1)
      case VoteType.Downvote:
        return setUserVote(-1)
      case VoteType.Reset:
        return setUserVote(0)
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
        onClick={() => handleVote(userVote === 1 ? VoteType.Reset : VoteType.Upvote)}
      />
      <Text>{votes + userVote}</Text>
      <IconButton
        w={50}
        p={4}
        aria-label="downvote"
        variant="ghost"
        transform="rotate(180deg)"
        icon={<Image alt="downvote" src="icons/arrow.png" />}
        onClick={() => handleVote(userVote === -1 ? VoteType.Reset : VoteType.Downvote)}
      />
    </VStack>
  )
}
