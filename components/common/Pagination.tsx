import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react-native"
import { View } from "react-native"

import { Button, ButtonIcon, ButtonText } from "../ui/button"
import { HStack } from "../ui/hstack"
import { Text } from "../ui/text"

type PaginationProps = {
  current: number
  first: number
  last: number
  onChange: () => void
}

const Pagination = ({ first, last, current, onChange }: PaginationProps) => {
  return (
    <View>
      <HStack className="gap-2 mt-6 justify-center">
        {
          <Button
            variant="outline"
            disabled={current <= 1}
            className={`${current <= 1 ? "opacity-30" : ""} border-gray-400`}
          >
            <ButtonIcon as={ChevronLeft} />
          </Button>
        }

        {current != 1 && (
          <Button variant="outline" className="border-gray-400">
            <ButtonText>{first}</ButtonText>
          </Button>
        )}

        {current > 2 && <Text>...</Text>}

        {
          <Button className="bg-mainGreen">
            <ButtonText>{current}</ButtonText>
          </Button>
        }

        {current + 1 < last && <Text>...</Text>}

        {current != last && last > 1 && (
          <Button variant="outline" className="border-gray-400">
            <ButtonText>{last}</ButtonText>
          </Button>
        )}

        {
          <Button
            variant="outline"
            disabled={current >= last}
            className={`${current >= last ? "opacity-30" : ""} border-gray-400`}
          >
            <ButtonIcon as={ChevronRight} />
          </Button>
        }
      </HStack>
    </View>
  )
}

export default Pagination
