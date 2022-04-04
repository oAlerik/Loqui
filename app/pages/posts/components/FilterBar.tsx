import { Box, Button, HStack, Image } from "@chakra-ui/react"
import { useState } from "react"

export default function FilterBar({ onSort }: { onSort: (sort: string) => void }) {
  const buttons = [
    { name: "Hot", icon: "fire", active: true },
    { name: "New", icon: "new", active: false },
    { name: "Top", icon: "top", active: false },
  ]

  const [btns, setBtns] = useState(buttons)

  const handleClick = (i: number) => {
    const newBtns = [...btns]
    newBtns.map((btn, index) => {
      if (index === i) {
        btn.active = true
      } else {
        btn.active = false
      }
    })

    onSort(newBtns[i]!.name)
    setBtns(newBtns)
  }

  return (
    <Box bg="white" px={6} py={2} rounded={8} w="full">
      <HStack>
        {btns.map((btn, i) => (
          <Button
            key={i}
            color={btn.active ? "blue.500" : "gray.500"}
            colorScheme="blue"
            variant="ghost"
            leftIcon={
              <Image
                src={`icons/${btn.icon}${btn.active ? "-active" : ""}.png`}
                alt="fire"
                h={25}
              />
            }
            onClick={() => handleClick(i)}
          >
            {btn.name}
          </Button>
        ))}
      </HStack>
    </Box>
  )
}
