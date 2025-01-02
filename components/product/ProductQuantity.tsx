import React from "react"
import { View } from "react-native"

import { ProductToCart } from "@/app/product/[id]"

import { Button, ButtonText } from "../ui/button"
import { Heading } from "../ui/heading"
import { HStack } from "../ui/hstack"

const ProductQuantity = ({
  handleChange,
  qty,
}: {
  handleChange: (key: keyof ProductToCart, value: number) => void
  qty: number
}) => {
  return (
    <View>
      <Heading size="sm">Quantity</Heading>
      <HStack className="mt-2 gap-3">
        {["1 per Kg", "500 grams", "2 per Kg"].map((item, index) => (
          <Button
            className={`${
              index === qty ? " bg-mainGreen" : "bg-lightGreen"
            } rounded-full`}
            key={index}
            onPress={() => handleChange("qty", index)}
          >
            <ButtonText className={index === qty ? "" : "text-typography-700"}>
              {item}
            </ButtonText>
          </Button>
        ))}
      </HStack>
    </View>
  )
}

export default ProductQuantity
