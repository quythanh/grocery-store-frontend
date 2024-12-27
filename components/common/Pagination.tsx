import React, { useState } from "react"
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
  const [page, setPage] = useState(current)
  const handleItemPress = (p: number) => {
    if (p < first || p > last) return

    setPage(p)
    onChange()
  }
  return (
    <View>
      <HStack className="gap-2 mt-6 justify-center">
        {
          <Button
            variant="outline"
            disabled={page <= 1}
            className={`${page <= 1 ? "opacity-30" : ""} border-gray-400`}
            onPress={() => handleItemPress(page - 1)}
          >
            <ButtonIcon as={ChevronLeft} />
          </Button>
        }

        {page != 1 && (
          <Button
            variant="outline"
            className="border-gray-400"
            onPress={() => handleItemPress(first)}
          >
            <ButtonText>{first}</ButtonText>
          </Button>
        )}

        {page > 2 && <Text>...</Text>}

        {
          <Button
            className="bg-mainGreen"
            onPress={() => handleItemPress(page)}
          >
            <ButtonText>{page}</ButtonText>
          </Button>
        }

        {page + 1 < last && <Text>...</Text>}

        {page != last && last > 1 && (
          <Button
            variant="outline"
            className="border-gray-400"
            onPress={() => handleItemPress(last)}
          >
            <ButtonText>{last}</ButtonText>
          </Button>
        )}

        {
          <Button
            variant="outline"
            disabled={page >= last}
            className={`${page >= last ? "opacity-30" : ""} border-gray-400`}
            onPress={() => handleItemPress(page + 1)}
          >
            <ButtonIcon as={ChevronRight} />
          </Button>
        }
      </HStack>
    </View>
  )
}

export default Pagination
