import { Box, Button, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { PromiseReturnType } from "blitz"
import getAllPosts from "../queries/getAllPosts"
import VoteBar from "./VoteBar"

type PostListType = PromiseReturnType<typeof getAllPosts>[number]

export default function PostEntry({
  post,
  showCommunity = true,
}: {
  post: PostListType
  showCommunity?: boolean
}) {
  return (
    <Box bg="white" w="full" p={4} rounded={8} key={post.id}>
      <HStack>
        <VoteBar post={post} />

        <VStack align="start">
          {showCommunity && <Text fontSize="xs">j/{post.community}</Text>}
          <Heading fontSize="lg">{post.title}</Heading>
          <Text fontSize={14}>{post.content}</Text>

          <Button
            fontSize="xs"
            leftIcon={<Image alt="comments" src="/icons/comments.png" w={25} />}
            variant="ghost"
          >
            {post.comments.length} {post.comments.length === 1 ? "Comment" : "Comments"}
          </Button>
        </VStack>
      </HStack>
    </Box>
  )
}
