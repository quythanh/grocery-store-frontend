import React, { useState } from "react"
import {
  MinusIcon,
  Plus,
  PlusIcon,
  ShoppingCart,
  Weight,
} from "lucide-react-native"

import { Button, ButtonIcon, ButtonText } from "../ui/button"
import { Card } from "../ui/card"
import { Heading } from "../ui/heading"
import { HStack } from "../ui/hstack"
import { Icon } from "../ui/icon"
import { Image } from "../ui/image"
import {
  Popover,
  PopoverBackdrop,
  PopoverBody,
  PopoverContent,
} from "../ui/popover"
import { Text } from "../ui/text"
import { VStack } from "../ui/vstack"

export type Product = {
  name: string
  price: number
  qty: number
  image: string
}

const ProductCard = ({
  className,
  product,
}: {
  className?: string
  product: Product
}) => {
  const [quantityToCart, setQuantityToCart] = useState(1)
  const handleAddToCart = () => {}

  const adjustQuantity = (quantity: number) => {
    if (quantityToCart + quantity < 1) return
    setQuantityToCart(quantityToCart + quantity)
  }

  return (
    <Card className={`p-3 rounded-xl w-full ${className || ""}`}>
      <Image
        source={{
          uri: product.image,
        }}
        className="mb-2 w-full h-36 rounded-md"
        alt="image"
      />
      <Heading size="md" className="h-14 mb-2 line-clamp-2 overflow-ellipsis">
        {product.name}
      </Heading>
      <HStack className="items-end justify-between">
        <VStack>
          <Text className="flex-1 font-bold text-lg ">
            {product.price}.000đ
          </Text>
          <HStack className="flex-1 items-center gap-1">
            <Icon as={Weight} size={"sm"} />
            <Text>{product.qty}gram</Text>
          </HStack>
        </VStack>

        <Popover
          placement="top right"
          size="md"
          trigger={(triggerProps) => {
            return (
              <Button
                size="sm"
                className="bg-mainGreen active:!bg-green-700"
                {...triggerProps}
              >
                <ButtonIcon as={Plus} />
                <ButtonIcon as={ShoppingCart} />
              </Button>
            )
          }}
        >
          <PopoverBackdrop />
          <PopoverContent className="p-2 mb-2">
            <PopoverBody>
              <HStack className="gap-2 items-center shadow-md justify-between mb-2 px-2">
                <Button
                  size="xs"
                  variant="outline"
                  className="size-6 rounded-full"
                  onPress={adjustQuantity.bind(this, -1)}
                >
                  <ButtonIcon as={MinusIcon} />
                </Button>
                <Text>{quantityToCart}</Text>
                <Button
                  size="xs"
                  variant="outline"
                  className="size-4 rounded-full"
                  onPress={adjustQuantity.bind(this, 1)}
                >
                  <ButtonIcon as={PlusIcon} />
                </Button>
              </HStack>
              <Button
                onPress={handleAddToCart}
                className="bg-mainGreen active:!bg-green-700"
              >
                <ButtonText>Add to cart</ButtonText>
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Card>
  )
}

export default ProductCard
