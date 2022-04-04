import { Box, Button, HStack, IconButton, Image, Text, VStack } from "@chakra-ui/react"
import { PromiseReturnType } from "blitz"
import { Post } from "db"
import getAllPosts from "../queries/getAllPosts"
import VoteBar from "./VoteBar"

type PostListType = PromiseReturnType<typeof getAllPosts>[number]

export default function PostEntry({ post }: { post: PostListType }) {
  console.log(post)

  return (
    <Box bg="white" w="full" p={4} rounded={8}>
      <HStack>
        <VoteBar post={post} />

        <VStack align="start">
          <Text fontSize="xs">j/{post.community}</Text>
          <Text>{post.title}</Text>
          <Text>{post.content}</Text>

          <Button
            fontSize="xs"
            leftIcon={<Image alt="comments" src="icons/comments.png" w={25} />}
            variant="ghost"
          >
            {post.comments.length} comments
          </Button>
        </VStack>
      </HStack>
    </Box>
  )
}
