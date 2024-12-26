import React from "react"
import { Plus, ShoppingCart, Weight } from "lucide-react-native"

import { Button, ButtonIcon } from "../ui/button"
import { Card } from "../ui/card"
import { Heading } from "../ui/heading"
import { HStack } from "../ui/hstack"
import { Icon } from "../ui/icon"
import { Image } from "../ui/image"
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
        <Button size="sm" className="bg-mainGreen active:!bg-green-700">
          <ButtonIcon as={Plus} />
          <ButtonIcon as={ShoppingCart} />
        </Button>
      </HStack>
    </Card>
  )
}

export default ProductCard
