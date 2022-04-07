import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { PromiseReturnType } from "blitz"
import getCommunity from "../queries/getCommunity"

type CommunityType = PromiseReturnType<typeof getCommunity>

export default function CommunityInfo({ c }: { c: CommunityType }) {
  return (
    <Box bg="white" w="40ch" p={6} rounded={8}>
      <VStack align="start">
        <Text>{c.description}</Text>
        <HStack>
          <Image alt="members" src="/icons/members.png" boxSize={25} />
          <Text>
            {c.members.length} {c.members.length === 1 ? "member" : "members"}
          </Text>
        </HStack>
        <HStack>
          <Image alt="creation date" src="/icons/birthday.png" boxSize={25} />
          <Text>Created {c.createdAt.toDateString()}</Text>
        </HStack>
      </VStack>
    </Box>
  )
}
