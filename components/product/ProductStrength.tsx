import React from "react"
import { View } from "react-native"

import { ProductToCart } from "@/app/product/[id]"

import { Heading } from "../ui/heading"
import { HStack } from "../ui/hstack"
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "../ui/slider"
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
          className="mt-6 mb-4 w-3/4"
          minValue={1}
          maxValue={5}
          value={strength}
          onChange={(value) => handleChange("strength", value)}
        >
          <SliderTrack className="bg-lightGreen">
            <SliderFilledTrack className="bg-mainGreen active:bg-mainGreen" />
          </SliderTrack>
          <SliderThumb className="bg-mainGreen active:bg-mainGreen" />
        </Slider>

        <Text>{strength}/5</Text>
      </HStack>
    </View>
  )
}

export default ProductStrength
