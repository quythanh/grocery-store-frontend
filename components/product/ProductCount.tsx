import React from "react"
import { MinusIcon, PlusIcon } from "lucide-react-native"

import { ProductToCart } from "@/app/product/[id]"

import { Button, ButtonIcon } from "../ui/button"
import { Heading } from "../ui/heading"
import { HStack } from "../ui/hstack"
import { Text } from "../ui/text"

const ProductCount = ({
  adjust,
  count,
}: {
  adjust: (value: number) => void
  count: number
}) => {
  return (
    <HStack className="items-center gap-2">
      <Heading size="sm">Item count</Heading>

      <HStack className="gap-2 items-center shadow-md justify-between mb-2 px-2 w-40 mt-4">
        <Button
          size="xs"
          variant="outline"
          className="size-6 rounded-full"
          onPress={() => adjust(-1)}
        >
          <ButtonIcon as={MinusIcon} />
        </Button>
        <Text>{count}</Text>
        <Button
          size="xs"
          variant="outline"
          className="size-4 rounded-full"
          onPress={() => adjust(+1)}
        >
          <ButtonIcon as={PlusIcon} />
        </Button>
      </HStack>
    </HStack>
  )
}

export default ProductCount
