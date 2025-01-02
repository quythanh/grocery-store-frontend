import React from "react"
import { Feather } from "@expo/vector-icons"
import { useLocalSearchParams, useNavigation } from "expo-router"
import { Dot } from "lucide-react-native"
import { View } from "react-native"

import groceryProducts from "../category/data"
import { Product } from "../category/ProductCard"
import { Button, ButtonIcon, ButtonText } from "../ui/button"
import { Heading } from "../ui/heading"
import { HStack } from "../ui/hstack"

const ProductDetail = ({ product }: { product: Product }) => {
  const navigation = useNavigation()

  return (
    <View className="px-10 pt-12">
      <Button variant="link" className="w-8 -ml-2" onPress={navigation.goBack}>
        <Feather size={26} name="chevron-left" color={"white"} />
      </Button>
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
