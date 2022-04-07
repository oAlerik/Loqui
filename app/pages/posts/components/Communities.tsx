import { Box, Circle, Heading, HStack, IconButton, Image, Text, useToast } from "@chakra-ui/react"
import { AddIcon, MinusIcon } from "@chakra-ui/icons"
import getAllCommunities from "app/pages/j/queries/getAllCommunities"
import getCurrentUser from "app/users/queries/getCurrentUser"
import { useMutation, useQuery } from "blitz"
import { useEffect, useState } from "react"
import joinCommunity from "app/pages/j/mutations/joinCommunity"
import leaveCommunity from "app/pages/j/mutations/leaveCommunity"

type CommunityListType = {
  id: string
  name: string
  picture: string
}

export default function Communities() {
  const toast = useToast()
  const [notJoined, setNotJoined] = useState<string[]>([])
  const [user] = useQuery(getCurrentUser, undefined)
  const [communities] = useQuery(getAllCommunities, { communities: [] })
  const [joinCommunityMutation] = useMutation(joinCommunity)
  const [leaveCommunityMutation] = useMutation(leaveCommunity)

  useEffect(() => {
    const resindexes = user?.communities.reduce((c, o, i) => ((c[o.id] = i), c), []) || []
    const ids = communities.filter((o) => resindexes[o?.id] === undefined).map((o) => o.id)
    setNotJoined(ids ?? [])
  }, [user?.communities, communities])

  const handleClick = async (isJoin: boolean, cid: string) => {
    if (user?.id) {
      if (isJoin) {
        const res = await joinCommunityMutation({ userId: user.id, communityId: cid })
        if (!res) return

        setNotJoined(notJoined.filter((o) => o !== cid))
        toast({
          title: `Joined j/${res.name}`,
          status: "success",
          variant: "left-accent",
          duration: 3000,
        })
      }

      if (!isJoin) {
        const res = await leaveCommunityMutation({ userId: user.id, communityId: cid })
        if (!res) return

        setNotJoined([...notJoined, cid])
        toast({
          title: `Left j/${res.name}`,
          status: "warning",
          variant: "left-accent",
          duration: 3000,
        })
      }
    }
  }

  const CommunityListing = (c: CommunityListType) => (
    <HStack key={c.id} px={2} py={1} w="full" justifyContent="space-between">
      <HStack w="80%" cursor="pointer" onClick={() => (window.location.href = `j/${c.name}`)}>
        {c.picture ? (
          <Image alt="pfp" src={c.picture} w="32px" h="32px" objectFit="cover" rounded="full" />
        ) : (
          <Circle size="32px" bg="purple.400" color="white" />
        )}
        <Text isTruncated>{c.name}</Text>
      </HStack>

      {notJoined.includes(c.id) ? (
        <IconButton
          aria-label="Join community"
          icon={<AddIcon />}
          variant="ghost"
          onClick={() => handleClick(true, c.id)}
        />
      ) : (
        <IconButton
          aria-label="Leave community"
          icon={<MinusIcon />}
          variant="ghost"
          onClick={() => handleClick(false, c.id)}
        />
      )}
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
