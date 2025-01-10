import { useState } from "react"
import { Stack, useLocalSearchParams } from "expo-router"
import { Platform, View } from "react-native"

import { HStack } from "@/components/ui/hstack"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import groceryProducts from "@/components/category/data"
import AddToCartButton from "@/components/common/AddToCartButton"
import Stars from "@/components/common/Stars"
import ProductCount from "@/components/product/ProductCount"
import ProductDetail from "@/components/product/ProductDetail"
import ProductImage from "@/components/product/ProductImage"
import ProductQuantity from "@/components/product/ProductQuantity"
import ProductStrength from "@/components/product/ProductStrength"
import ProductTotal from "@/components/product/ProductTotal"
import { ThemedView } from "@/components/ThemedView"

export type ProductToCart = {
  qty: number
  count: number
  strength: number
}

const ProductScreen = () => {
  const { id } = useLocalSearchParams()
  const product = groceryProducts[0]

  const productToCart: ProductToCart = {
    qty: 0,
    count: 1,
    strength: 1,
  }

  const [infor, setInfor] = useState(productToCart)


  const handleChange = (key: keyof ProductToCart, value: number) => {
    if (key == "count" && value <= 0) return
    setInfor({
      ...infor,
      [key]: value,
    })
  }

  return (
    <ThemedView className="flex-1 ">
      <VStack className="bg-mainGreen flex-1 ">
        <ProductDetail product={product} />
        <VStack
          className={`bg-background-0 flex-1 px-6 rounded-t-3xl ${Platform.OS === "ios" ? "pb-6" : ""}`}
        >
          <VStack className="flex-1 ">
            <HStack className="justify-between items-end">
              <ProductImage product={product} />
              <View>
                <HStack className="gap-1">
                  <Stars />
                </HStack>
                <Text className="font-semibold mt-2 text-right">250 Likes</Text>
              </View>
            </HStack>

            <VStack className="gap-6 mt-16">
              <ProductQuantity qty={infor.qty} handleChange={handleChange} />

              <ProductCount count={infor.count} handleChange={handleChange} />

              <ProductStrength
                strength={infor.strength}
                handleChange={handleChange}
              />

              <ProductTotal total={15} />
            </VStack>
          </VStack>

          <AddToCartButton />
        </VStack>
      </VStack>
    </ThemedView>
  )
}

export default ProductScreen
