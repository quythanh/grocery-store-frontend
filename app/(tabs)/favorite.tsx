import { useEffect, useState } from "react"
import { GET_FAVOURITE_PRODUCTS } from "@/api/graphqlString/favourite"
import { useTokenStore } from "@/store/tokenStore"
import { useQuery } from "@apollo/client"
import { useRouter } from "expo-router"
import { Platform, ScrollView, View } from "react-native"

import { Box } from "@/components/ui/box"
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button"
import { Grid, GridItem } from "@/components/ui/grid"
import { Heading } from "@/components/ui/heading"
import { Image } from "@/components/ui/image"
import { VStack } from "@/components/ui/vstack"
import Pagination from "@/components/common/Pagination"
import TopHeader from "@/components/common/TopHeader"
import { Product } from "@/components/product/ProductCard"
import ProductFavouriteCard from "@/components/product/ProductFavouriteCard"

import emptyBackground from "../../assets/images/empty-favourite.png"

const FavoriteScreen = () => {
  const { token } = useTokenStore()
  const router = useRouter()

  const { data, loading, error } = useQuery(GET_FAVOURITE_PRODUCTS, {
    skip: !token,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    fetchPolicy: "no-cache",
  })
  const [products, setProducts] = useState<Product[]>([])
  const handleFavourite = (product: Product) => {
    if (products.includes(product))
      setProducts(products.filter((p) => p.id != product.id))
  }

  useEffect(() => {
    if (!data) return
    const mappedProducts: Product[] = Array.from(
      data?.wishlist.items || []
    ).map(({ product }: any) => ({
      name: product.name,
      id: product.uid,
      image: product.image.url,
      price: product.price_range.minimum_price.final_price.value,
      qty: 1,
    }))
    setProducts(mappedProducts)
  }, [data])

  if (!token)
    return (
      <View className="flex-1">
        <TopHeader>Favourite</TopHeader>
        <View className="flex-1 justify-center items-center">
          <Heading>Please login to see favourite items!</Heading>
          <Button
            className="bg-mainGreen rounded-full mt-10 active:!bg-lightGreen"
            size="lg"
            onPress={() => router.push("/auth/login")}
          >
            <ButtonText>Login</ButtonText>
          </Button>
        </View>
      </View>
    )

  if (loading)
    return (
      <View className="flex-1">
        <TopHeader>Favourite</TopHeader>
        <View className="flex-1 justify-center items-center">
          <ButtonSpinner size={"large"} />
        </View>
      </View>
    )

  return (
    <View className={`flex-1 `}>
      <TopHeader>Favourite</TopHeader>

      {error || products.length === 0 ? (
        <View className="bg-background-0 justify-center items-center flex-1">
          <Image alt="empty" source={emptyBackground} size="2xl" />
          <Button
            className="bg-mainGreen rounded-full mt-20 active:!bg-lightGreen"
            size="lg"
            onPress={() => router.push("/")}
          >
            <ButtonText>Start Shopping</ButtonText>
          </Button>
        </View>
      ) : (
        <ScrollView>
          <Grid
            className={`gap-2 px-4 mt-6 ${Platform.OS === "ios" ? "pb-8" : "pb-4"}`}
            _extra={{
              className: "col-span-12",
            }}
          >
            {products.map((product) => (
              <GridItem
                key={product.id}
                _extra={{
                  className: "col-span-6 ",
                }}
              >
                <ProductFavouriteCard
                  product={product}
                  onPress={handleFavourite.bind(this, product)}
                />
              </GridItem>
            ))}
          </Grid>
          <Pagination first={1} last={1} current={1} onChange={() => {}} />
          <Box className={Platform.OS === "ios" ? "h-28" : "h-4"}></Box>
        </ScrollView>
      )}
    </View>
  )
}

export default FavoriteScreen
