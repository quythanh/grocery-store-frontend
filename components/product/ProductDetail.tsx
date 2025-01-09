import React from "react"
import { Dot } from "lucide-react-native"
import { View } from "react-native"

import BackButton from "../common/BackButton"
import { Button, ButtonIcon, ButtonText } from "../ui/button"
import { Heading } from "../ui/heading"
import { HStack } from "../ui/hstack"
import { Product } from "./ProductCard"

const ProductDetail = ({ product }: { product: Product }) => {
  return (
    <View className="px-10 pt-12">
      <BackButton />
      <Heading className="h-24 text-typography-0">{product.name}</Heading>
      <HStack className="justify-end">
        <Button className="bg-transparent mb-8" size="xl" variant="link">
          <ButtonIcon className="text-typography-0" as={Dot} />
          <ButtonText className="font-semibold text-typography-0">
            In Stock
          </ButtonText>
        </Button>
      </HStack>
    </View>
  )
}

export default ProductDetail
