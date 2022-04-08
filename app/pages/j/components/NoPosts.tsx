import { Image, Text, VStack } from "@chakra-ui/react"

export default function NoPosts() {
  return (
    <VStack bg="white" p={4} rounded={8} w="full">
      <Image alt="no posts" src="/icons/gary.png" />
      <Text>Looks like there are no posts here</Text>
    </VStack>
  )
}
