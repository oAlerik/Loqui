import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import createCommunity from "app/pages/j/mutations/createCommunity"
import getCommunity from "app/pages/j/queries/getCommunity"
import { useMutation, useQuery } from "blitz"
import { useState } from "react"

export default function CreateBox() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [communityName, setCommunityName] = useState<string>("")
  const [createCommunityMutation] = useMutation(createCommunity)
  const handleChange = (event) => setCommunityName(event.target.value)

  const makeNewCommunity = async () => {
    // TODO: Check if community already exists
    // if (!community) {
    //   ...
    // }

    const res = await createCommunityMutation({ communityName })
    if (res) {
      window.location.href = `j/${res.name}`
    }
  }

  return (
    <Box bg="white" w="full" p={4} rounded={8}>
      <VStack>
        <Button w="full" colorScheme="blue">
          Create Post
        </Button>
        <Button w="full" colorScheme="blue" variant="outline" onClick={onOpen}>
          Create Community
        </Button>
      </VStack>

      {/* Create community modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Community</ModalHeader>
          <ModalCloseButton />

          {/* <CreateCommunityModaBody /> */}
          <ModalBody>
            <Text>Name:</Text>
            <InputGroup my={2}>
              <InputLeftAddon>j/</InputLeftAddon>
              <Input onChange={handleChange} />
            </InputGroup>
            <Text fontSize="xs">
              {21 - communityName.length}{" "}
              {21 - communityName.length === 1 ? "character" : "characters"} remaining
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" disabled={!communityName} onClick={() => makeNewCommunity()}>
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
