import { Box, Flex, VStack } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import getCurrentUser from "app/users/queries/getCurrentUser"
import { useParams, useQuery } from "blitz"
import PostEntry from "../posts/components/PostEntry"
import getCommunityposts from "../posts/queries/getCommunityposts"
import CommunityBanner from "./components/CommunityBanner"
import CommunityInfo from "./components/CommunityInfo"
import NoPosts from "./components/NoPosts"
import getCommunity from "./queries/getCommunity"

export default function Community() {
  const params = useParams("string")
  const [user] = useQuery(getCurrentUser, undefined)
  const [community] = useQuery(getCommunity, { name: params.communityName ?? "" })
  const [posts] = useQuery(getCommunityposts, { communityId: community.id })

  return (
    <VStack bg="gray.100">
      <CommunityBanner c={community} u={user} />

      <Flex maxW="100ch" gap={6}>
        <VStack w="60ch" gap={2}>
          {posts.map((post) => PostEntry({ post: post, showCommunity: false }))}
          {posts.length === 0 && <NoPosts />}
        </VStack>
        <Box>
          <CommunityInfo c={community} />
        </Box>
      </Flex>
    </VStack>
  )
}

Community.suppressFirstRenderFlicker = true
Community.getLayout = (page) => <Layout title="Community">{page}</Layout>
