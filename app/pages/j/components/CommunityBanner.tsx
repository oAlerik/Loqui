import { AddIcon, MinusIcon } from "@chakra-ui/icons"
import { Button, Heading, HStack, Image, Text, toast, useToast, VStack } from "@chakra-ui/react"
import getCurrentUser from "app/users/queries/getCurrentUser"
import { PromiseReturnType, useMutation } from "blitz"
import { useEffect, useState } from "react"
import joinCommunity from "../mutations/joinCommunity"
import leaveCommunity from "../mutations/leaveCommunity"
import getCommunity from "../queries/getCommunity"

type CommunityType = PromiseReturnType<typeof getCommunity>
type UserType = PromiseReturnType<typeof getCurrentUser>

export default function CommunityBanner({ c, u }: { c: CommunityType; u: UserType }) {
  const toast = useToast()
  const [joined, setJoined] = useState<boolean>(false)
  const [joinCommunityMutation] = useMutation(joinCommunity)
  const [leaveCommunityMutation] = useMutation(leaveCommunity)

  useEffect(() => {
    const found = c.members.find((o) => o.id === u!.id)
    if (found) {
      setJoined(true)
    }
  }, [c.members, u])

  const handleClick = async (isJoin: boolean) => {
    if (u?.id) {
      if (isJoin) {
        const res = await joinCommunityMutation({ userId: u.id, communityId: c.id })
        if (!res) return

        setJoined(true)
        toast({
          title: `Joined j/${res.name}`,
          status: "success",
          variant: "left-accent",
          duration: 3000,
        })
      }

      if (!isJoin) {
        const res = await leaveCommunityMutation({ userId: u.id, communityId: c.id })
        if (!res) return

        setJoined(false)
        toast({
          title: `Left j/${res.name}`,
          status: "warning",
          variant: "left-accent",
          duration: 3000,
        })
      }
    }
  }

  return (
    <VStack w="full">
      <Image
        h="228px"
        w="full"
        objectFit="cover"
        alt="Community banner"
        src="https://styles.redditmedia.com/t5_2zmfe/styles/bannerBackgroundImage_m2d5nhmlqu471.jpg?width=4000&format=pjpg&s=7dfb5250cef4a15812108007c928a83d31f87908"
      />

      <VStack w="80ch" align="start" py={4}>
        <HStack gap={4}>
          <Image alt="pfp" src={c.picture} rounded="full" boxSize={100} border="1px solid #000" />
          <VStack align="start">
            <Heading>{c.title}</Heading>
            <Text>j/{c.name}</Text>
          </VStack>

          {joined ? (
            <Button
              leftIcon={<MinusIcon />}
              onClick={() => handleClick(false)}
              colorScheme="blue"
              variant="outline"
            >
              Leave
            </Button>
          ) : (
            <Button
              leftIcon={<AddIcon />}
              onClick={() => handleClick(true)}
              colorScheme="blue"
              variant="outline"
            >
              Join
            </Button>
          )}
        </HStack>
      </VStack>
    </VStack>
  )
}
