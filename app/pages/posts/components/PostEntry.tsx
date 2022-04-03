import { Box, HStack, IconButton, Image, Text, VStack } from "@chakra-ui/react"
import { Post } from "db"
import VoteBar from "./VoteBar"

export default function PostEntry({ post }: { post: Post }) {
  return (
    <Box bg="white" w="full" p={4} rounded={8}>
      <HStack>
        <VoteBar post={post} />

        <VStack align="start">
          <Text fontSize="xs">j/{post.communityName}</Text>
          <Text>{post.title}</Text>
          <Text>{post.content}</Text>
        </VStack>
      </HStack>
    </Box>
  )
}
