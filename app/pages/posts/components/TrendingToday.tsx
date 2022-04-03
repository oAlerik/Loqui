import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react"

export default function TrendingToday() {
  const trending = [
    {
      title: "Lorem ipsum",
      description: "Dolor sit amet",
      community: {
        name: "Alpha",
        img: "https://upload.wikimedia.org/wikipedia/en/8/84/In_the_Court_of_the_Crimson_King_-_40th_Anniversary_Box_Set_-_Front_cover.jpeg",
      },
    },
    {
      title: "Lorem ipsum",
      description: "Dolor sit amet",
      community: {
        name: "Beta",
        img: "https://upload.wikimedia.org/wikipedia/en/8/84/In_the_Court_of_the_Crimson_King_-_40th_Anniversary_Box_Set_-_Front_cover.jpeg",
      },
    },
    {
      title: "Lorem ipsum",
      description: "Dolor sit amet",
      community: {
        name: "Gamma",
        img: "https://upload.wikimedia.org/wikipedia/en/8/84/In_the_Court_of_the_Crimson_King_-_40th_Anniversary_Box_Set_-_Front_cover.jpeg",
      },
    },
    {
      title: "Lorem ipsum",
      description: "Dolor sit amet",
      community: {
        name: "Delta",
        img: "https://upload.wikimedia.org/wikipedia/en/8/84/In_the_Court_of_the_Crimson_King_-_40th_Anniversary_Box_Set_-_Front_cover.jpeg",
      },
    },
  ]

  return (
    <HStack>
      {trending.map((post, i) => (
        <Box key={i} w={250} h={180} bg="gray.400" rounded={12}>
          <VStack justify="end" alignItems="start" h="full" p={4}>
            <Heading fontSize={20}>{post.title}</Heading>
            <Text>{post.description}</Text>
            <HStack>
              <Image alt={post.community.name} src={post.community.img} w={6} rounded="full" />
              <Text fontSize="xs">j/{post.community.name}</Text>
            </HStack>
          </VStack>
        </Box>
      ))}
    </HStack>
  )
}
