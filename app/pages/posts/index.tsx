import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react"
import TrendingToday from "./components/TrendingToday"
import FilterBar from "./components/FilterBar"
import { useMutation, useQuery } from "blitz"
import createPost from "./mutations/createPost"
import { useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAllPosts from "./queries/getAllPosts"

export default function Posts() {
  const session = useSession()
  const [createPostMutation] = useMutation(createPost)
  const [allPosts] = useQuery(getAllPosts, undefined)

  const newPost = async () => {
    console.log(session)
    createPostMutation({
      title: "New Post",
      content: "This is a new post",
      authorId: session.userId || 0,
    })
  }

  return (
    <VStack p={4} bg="gray.100">
      <Box pb={4}>
        <TrendingToday />
      </Box>

      <Flex>
        <VStack w="full">
          <FilterBar />
          <Button onClick={() => newPost()}>CREATE</Button>

          {allPosts.map((post, i) => (
            <Box key={i}>
              <Text>{post.title}</Text>
              <Text>{post.content}</Text>
            </Box>
          ))}
        </VStack>

        <VStack>
          <Text px="4">COMMUNITIES</Text>
          <Text>HELP ETC.</Text>
        </VStack>
      </Flex>
    </VStack>
  )
}

Posts.suppressFirstRenderFlicker = true
Posts.getLayout = (page) => <Layout title="Posts">{page}</Layout>
