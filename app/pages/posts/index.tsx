import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react"
import TrendingToday from "./components/TrendingToday"
import FilterBar from "./components/FilterBar"
import { useMutation, useQuery } from "blitz"
import createPost from "./mutations/createPost"
import { useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAllPosts from "./queries/getAllPosts"
import PostEntry from "./components/PostEntry"
import { useState } from "react"
import Communities from "./components/Communities"
import CreateBox from "./components/CreateBox"

export default function Posts() {
  const session = useSession()
  const [createPostMutation] = useMutation(createPost)
  const [postsQuery] = useQuery(getAllPosts, undefined)
  const [posts, setPosts] = useState(postsQuery)

  const newPost = async () => {
    console.log(session)
    // createPostMutation({
    //   title: "New Post",
    //   content: "This is a new post",
    //   authorId: session.userId,
    // })
  }

  const onSort = (sort: string) => {
    console.log(sort)
    const newList = [...posts]

    if (sort === "Top") {
      newList.sort((a, b) => (a.votes > b.votes ? 1 : -1))
      console.log(newList)
      setPosts(newList)
    }
  }

  return (
    <VStack p={4} bg="gray.100">
      <Box pb={4}>
        <TrendingToday />
      </Box>

      <Flex maxW="100ch" gap={6}>
        <VStack w="60ch">
          <FilterBar onSort={onSort} />
          <Button onClick={() => newPost()}>CREATE</Button>

          {posts.map((post, i) => (
            <PostEntry key={i} post={post} />
          ))}
        </VStack>

        {/* Sidebar stuff */}
        <VStack w="30ch">
          <Communities />
          <CreateBox />
          <Text>HELP ETC.</Text>
        </VStack>
      </Flex>
    </VStack>
  )
}

Posts.suppressFirstRenderFlicker = true
Posts.getLayout = (page) => <Layout title="Posts">{page}</Layout>
