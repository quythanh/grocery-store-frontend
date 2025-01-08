import React from "react"
import { View } from "react-native"

import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { products } from "@/components/ProductData"

const Confirm = () => {
  return (
    <View className="flex-1">
      <VStack className="border p-4 rounded-lg border-mainGreen bg-background-0">
        <Heading size="md">Products</Heading>
        <VStack className="gap-3 mt-2">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </VStack>

        <Heading size="md" className="mt-6">
          Subtotal
        </Heading>
        <VStack className="gap-3 mt-2 ">
          <HStack className="justify-between">
            <Text>Products</Text>
            <Text>$20</Text>
          </HStack>
          <HStack className="justify-between">
            <Text>Shipping</Text>
            <Text>$12.5</Text>
          </HStack>
          <HStack className="justify-between">
            <Text>Tax(10%)</Text>
            <Text>$7</Text>
          </HStack>
        </VStack>

        <HStack className="justify-between mt-10 items-end">
          <Text>Total</Text>
          <Text className="text-2xl font-semibold">$50.5</Text>
        </HStack>
      </VStack>
    </View>
  )
}

const ProductItem = () => {
  let index = Math.floor(Math.random() * 10)
  const product = products[index]
  return (
    <HStack className="justify-between ">
      <Text className="flex-1">{product.name}</Text>
      <Text className="flex-1 text-right">{product.price}</Text>
      <Text className="flex-1 text-right">x1</Text>
      <Text className="flex-1 text-right">${product.price}</Text>
    </HStack>
  )
}

export default Confirm
