import {
  Box,
  Button,
  Circle,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import getAllCommunities from "app/communities/queries/getAllCommunities"
import { useQuery } from "blitz"

type CommunityListType = {
  id: string
  name: string
  picture: string
}

export default function Communities() {
  const [communities] = useQuery(getAllCommunities, { communities: [] })

  console.log(communities)

  const CommunityListing = (c: CommunityListType) => (
    <HStack key={c.id} cursor="pointer" w="full" px={2} py={1} justifyContent="space-between">
      <HStack>
        {c.picture ? (
          <Image alt="pfp" src={c.picture} w="32px" h="32px" objectFit="cover" rounded="full" />
        ) : (
          <Circle size="32px" bg="purple.400" color="white" />
        )}
        <Text>{c.name}</Text>
      </HStack>
      <IconButton aria-label="Join community" icon={<AddIcon />} variant="ghost" />
    </HStack>
  )

  return (
    <Box bg="white" w="full" p={4} rounded={8}>
      <Heading fontSize="xl" mb={4}>
        Communities
      </Heading>

      {communities.map((c) => CommunityListing(c))}
    </Box>
  )
}
