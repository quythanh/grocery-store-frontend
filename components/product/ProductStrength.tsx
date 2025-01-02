import React from "react"
import { Colors } from "@/constants/Colors"
import Slider from "@react-native-community/slider"
import { View } from "react-native"

import { ProductToCart } from "@/app/product/[id]"

import { Heading } from "../ui/heading"
import { HStack } from "../ui/hstack"
import { Text } from "../ui/text"

const ProductStrength = ({
  handleChange,
  strength,
}: {
  handleChange: (key: keyof ProductToCart, value: number) => void
  strength: number
}) => {
  return (
    <View>
      <Heading size="sm">Strength level</Heading>

      <HStack className="items-center gap-3">
        <Slider
          style={{ width: 300, height: 40 }}
          minimumValue={0}
          maximumValue={5}
          step={1}
          onValueChange={(value) => handleChange("strength", value)}
          minimumTrackTintColor={Colors.light.tint}
          maximumTrackTintColor="#ccc"
        />
        <Text>{strength}/5</Text>
      </HStack>
    </View>
  )
}

export default ProductStrength
