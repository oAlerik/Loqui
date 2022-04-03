import { Box, Center, Flex, Text, VStack } from "@chakra-ui/react"
import TrendingToday from "./components/TrendingToday"
import FilterBar from "./components/FilterBar"

export default function Posts() {
  return (
    <VStack p={4} bg="gray.100">
      <Box pb={4}>
        <TrendingToday />
      </Box>

      <Flex>
        <VStack w="full">
          <FilterBar />
        </VStack>

        <VStack>
          <Text px="4">COMMUNITIES</Text>
          <Text>HELP ETC.</Text>
        </VStack>
      </Flex>
    </VStack>
  )
}
