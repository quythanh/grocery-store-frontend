import React from "react"
import { View } from "react-native"

import { ProductToCart } from "@/app/product/[id]"

import { Button, ButtonText } from "../ui/button"
import { Heading } from "../ui/heading"
import { HStack } from "../ui/hstack"
import { Text } from "../ui/text"

const ProductQuantity = ({
  options,
  handleChange,
  qty,
}: {
  options: any[]
  handleChange: (key: keyof ProductToCart, value: number) => void
  qty: string
}) => {
  return (
    <View>
      <Heading size="sm">Quantity</Heading>
      <HStack className="mt-2 gap-3">
        {options?.map((item) => (
          <Button
            className={`${
              item.uid === qty ? " bg-mainGreen" : "bg-lightGreen"
            } rounded-full active:!bg-green-700`}
            key={item.uid}
            onPress={() => handleChange("qty", item.uid)}
          >
            <ButtonText
              className={item.uid === qty ? "" : "text-typography-700"}
            >
              {item.label}
            </ButtonText>
          </Button>
        ))}
        {options.length == 0 && <Text>No options</Text>}
      </HStack>
    </View>
  )
}

export default ProductQuantity
