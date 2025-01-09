import { useState } from "react"
import { Platform, ScrollView, View } from "react-native"

import { Box } from "@/components/ui/box"
import { Grid, GridItem } from "@/components/ui/grid"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import groceryProducts from "@/components/category/data"
import BackButton from "@/components/common/BackButton"
import Pagination from "@/components/common/Pagination"
import { Product } from "@/components/product/ProductCard"
import ProductFavouriteCard from "@/components/product/ProductFavouriteCard"

const FavoriteScreen = () => {
  const [data, setData] = useState(groceryProducts)
  const handleFavourite = (product: Product) => {
    if (data.includes(product)) setData(data.filter((p) => p.id != product.id))
  }
  return (
    <View className={`flex-1 ${Platform.OS === "ios" ? "pb-8" : "pb-4"}`}>
      <HStack
        className={`bg-mainGreen px-6 py-3 gap-3 items-center mb-6 ${Platform.OS === "ios" ? "pt-16" : "pt-12"}`}
      >
        <BackButton />
        <Heading className="text-typography-0">Favourite</Heading>
      </HStack>

      <ScrollView>
        <Grid
          className="gap-2 px-4"
          _extra={{
            className: "col-span-12",
          }}
        >
          {data.map((product, i) => (
            <GridItem
              key={i}
              _extra={{
                className: "col-span-6 ",
              }}
            >
              <ProductFavouriteCard product={product} onPress={handleFavourite.bind(this, product)} />
            </GridItem>
          ))}
        </Grid>
        <Pagination first={1} last={4} current={3} onChange={() => {}} />
        <Box className={Platform.OS === "ios" ? "h-28" : "h-4"}></Box>
      </ScrollView>
    </View>
  )
}

export default FavoriteScreen
