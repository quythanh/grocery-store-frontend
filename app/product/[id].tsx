import { useState } from "react"
import { Feather } from "@expo/vector-icons"
import { Stack, useLocalSearchParams, useNavigation } from "expo-router"
import { Dot, MinusIcon, PlusIcon, Star } from "lucide-react-native"
import { View } from "react-native"

import { Box } from "@/components/ui/box"
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Image } from "@/components/ui/image"
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@/components/ui/slider"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import groceryProducts from "@/components/category/data"
import { ThemedView } from "@/components/ThemedView"

const ProductScreen = () => {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()
  const product = groceryProducts[+id - 1]

  type ProductToCart = {
    qty: number
    count: number
    strength: number
  }

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
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      <VStack className="bg-mainGreen flex-1 ">
        <View className="px-10 pt-12">
          <Button
            variant="link"
            className="w-8 -ml-2"
            onPress={navigation.goBack}
          >
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
        <VStack className="bg-background-0 flex-1 px-6 rounded-t-3xl">
          <VStack className="flex-1 ">
            <HStack className="justify-between items-end">
              <Box className="shadow-lg rounded-full -mt-16 p-2 bg-background-0">
                <Image
                  source={{
                    uri: product.image,
                  }}
                  size="xl"
                  className="rounded-full size-full"
                  alt="product image"
                />
              </Box>
              <View>
                <HStack className="gap-1">
                  <Icon as={Star} className="fill-yellow-400 text-yellow-400" />
                  <Icon as={Star} className="fill-yellow-400 text-yellow-400" />
                  <Icon as={Star} className="fill-yellow-400 text-yellow-400" />
                  <Icon as={Star} className="fill-yellow-400 text-yellow-400" />
                  <Icon as={Star} className="fill-yellow-400 text-yellow-400" />
                </HStack>
                <Text className="font-semibold mt-2 text-right">250 Likes</Text>
              </View>
            </HStack>

            <VStack className="gap-4 mt-12">
              <View>
                <Heading size="sm">Quantity</Heading>
                <HStack className="mt-2 gap-3">
                  {["1 per Kg", "500 grams", "2 per Kg"].map((item, index) => (
                    <Button
                      className={`${
                        index === infor.qty ? " bg-mainGreen" : "bg-lightGreen"
                      } rounded-full`}
                      key={index}
                      onPress={() => handleChange("qty", index)}
                    >
                      <ButtonText
                        className={
                          index === infor.qty ? "" : "text-typography-700"
                        }
                      >
                        {item}
                      </ButtonText>
                    </Button>
                  ))}

                  {/* <Button className="rounded-full bg-mainGreen ">
                    <ButtonText className="text-typography-0">
                      500 grams
                    </ButtonText>
                  </Button>

                  <Button className="rounded-full bg-lightGreen">
                    <ButtonText className="text-typography-700">
                      2 per Kg
                    </ButtonText>
                  </Button> */}
                </HStack>
              </View>

              <View>
                <Heading size="sm">Item count</Heading>

                <HStack className="gap-2 items-center shadow-md justify-between mb-2 px-2 w-40 mt-4">
                  <Button
                    size="xs"
                    variant="outline"
                    className="size-6 rounded-full"
                    onPress={() => handleChange("count", infor.count - 1)}
                  >
                    <ButtonIcon as={MinusIcon} />
                  </Button>
                  <Text>{infor.count}</Text>
                  <Button
                    size="xs"
                    variant="outline"
                    className="size-4 rounded-full"
                    onPress={() => handleChange("count", infor.count + 1)}
                  >
                    <ButtonIcon as={PlusIcon} />
                  </Button>
                </HStack>
              </View>

              <View>
                <Heading size="sm">Strength level</Heading>

                <HStack className="items-center gap-3">
                  <Slider
                    className="mt-6 mb-4 w-3/4"
                    minValue={1}
                    maxValue={5}
                    value={infor.strength}
                    onChange={(value) => handleChange("strength", value)}
                  >
                    <SliderTrack className="bg-lightGreen">
                      <SliderFilledTrack className="bg-mainGreen active:bg-mainGreen" />
                    </SliderTrack>
                    <SliderThumb className="bg-mainGreen active:bg-mainGreen" />
                  </Slider>


                  <Text>{infor.strength}/5</Text>
                </HStack>
              </View>

              <Button className="rounded-full bg-lightGreen mt-8">
                <ButtonText className="text-typo-700">Total: </ButtonText>
                <Text className="text-green-700 font-bold">$15.00</Text>
              </Button>
            </VStack>
          </VStack>

          <Button size="xl" className="mb-2 rounded-full bg-mainGreen">
            <ButtonText>Add to Cart</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </ThemedView>
  )
}

export default ProductScreen
