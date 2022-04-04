import { Box, Button, Heading, HStack, IconButton, Image, Text, VStack } from "@chakra-ui/react"
import { PromiseReturnType } from "blitz"
import { Post } from "db"
import getAllPosts from "../queries/getAllPosts"
import VoteBar from "./VoteBar"

type PostListType = PromiseReturnType<typeof getAllPosts>[number]

export default function PostEntry({ post }: { post: PostListType }) {
  return (
    <Box bg="white" w="full" p={4} rounded={8}>
      <HStack>
        <VoteBar post={post} />

        <VStack align="start">
          <Text fontSize="xs">j/{post.community}</Text>
          <Heading fontSize="lg">{post.title}</Heading>
          <Text fontSize={14}>{post.content}</Text>

          <Button
            fontSize="xs"
            leftIcon={<Image alt="comments" src="icons/comments.png" w={25} />}
            variant="ghost"
          >
            {post.comments.length} {post.comments.length === 1 ? "Comment" : "Comments"}
          </Button>
        </VStack>
      </HStack>
    </Box>
  )
}
