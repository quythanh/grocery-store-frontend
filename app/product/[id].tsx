import { useState } from "react"
import { ADD_PRODUCT_TO_WISHLIST } from "@/api/graphqlString/favourite"
import { GET_DETAIL_PRODUCT } from "@/api/graphqlString/product"
import { useIdsStore } from "@/store/idsStore"
import { useTokenStore } from "@/store/tokenStore"
import { useMutation, useQuery } from "@apollo/client"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Bookmark } from "lucide-react-native"
import { Platform, View } from "react-native"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"

import { useAddToCart } from "@/hooks/useAddToCart"
import { Button, ButtonSpinner } from "@/components/ui/button"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Image } from "@/components/ui/image"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import AddToCartButton from "@/components/common/AddToCartButton"
import Stars from "@/components/common/Stars"
import { Product } from "@/components/product/ProductCard"
import ProductCount from "@/components/product/ProductCount"
import ProductDetail from "@/components/product/ProductDetail"
import ProductImage from "@/components/product/ProductImage"
import ProductQuantity from "@/components/product/ProductQuantity"
import ProductStrength from "@/components/product/ProductStrength"
import ProductTotal from "@/components/product/ProductTotal"
import { ThemedView } from "@/components/ThemedView"

import emptyBackground from "../../assets/images/empty-product.png"

export type ProductToCart = {
  qty: number
  count: number
  strength: number
}
const productToCart: ProductToCart = {
  qty: 0,
  count: 1,
  strength: 1,
}

const ProductScreen = () => {
  const { id } = useLocalSearchParams()
  const { token } = useTokenStore()
  const route = useRouter()
  const { wishlistId, cartId } = useIdsStore()
  //** [infor, setInfor]: Just for UI */
  const [infor, setInfor] = useState(productToCart)
  const handleChange = (key: keyof ProductToCart, value: number) => {
    if (key == "count" && value <= 0) return
    setInfor({
      ...infor,
      [key]: value,
    })
  }
  const { data, loading } = useQuery(GET_DETAIL_PRODUCT, {
    variables: {
      productSku: id,
    },
    fetchPolicy: "no-cache",
  })
  const product: Product | undefined = data?.products?.items[0]
    ? {
        id: data?.products?.items[0].sku,
        image: data?.products?.items[0].image.url,
        name: data?.products?.items[0].name,
        price:
          data?.products?.items[0].price_range.maximum_price.final_price.value,
        qty: 1,
      }
    : undefined

  const {
    quantityToCart,
    adjustQuantity,
    handleAddToCart,
    loading: addToCartLoading,
  } = useAddToCart()

  const [addToWishlist, { error }] = useMutation(ADD_PRODUCT_TO_WISHLIST)

  const handleAddToWishlist = () => {
    try {
      if (!token) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Notification",
          textBody: "Please login to add product to wishlist!!",
          onPress: () => route.push("/auth/login"),
        })
        return
      }

      addToWishlist({
        variables: {
          wishlistId,
          sku: product?.id.toString(),
          quantity: 1,
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Notification",
        textBody: "Added product to wishlist!!",
      })
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Notification",
        textBody: "Fetching error",
      })
      console.error(error)
    }
  }

  if (loading)
    return (
      <View className="flex-1 justify-center items-center">
        <ButtonSpinner size={"large"} />
      </View>
    )

  return (
    <ThemedView className="flex-1 ">
      {!product ? (
        <View className="flex-1 justify-center items-center">
          <Image alt="empty" source={emptyBackground} size="2xl" />
        </View>
      ) : (
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
                  <Text className="font-semibold mt-2 text-right">
                    250 Likes
                  </Text>
                  <Button
                    variant="link"
                    className="justify-end mt-4"
                    onPress={handleAddToWishlist}
                  >
                    <Icon
                      as={Bookmark}
                      size="xl"
                      className="text-yellow-400 fill-yellow-400"
                    />
                  </Button>
                </View>
              </HStack>

              <VStack className="gap-6 mt-16">
                <ProductQuantity qty={infor.qty} handleChange={handleChange} />

                <ProductCount
                  count={quantityToCart}
                  adjust={(value) => adjustQuantity(value)}
                />

                <ProductStrength
                  strength={infor.strength}
                  handleChange={handleChange}
                />

                <ProductTotal total={product.price * quantityToCart} />
              </VStack>
            </VStack>

            <AddToCartButton
              onPress={() => handleAddToCart(cartId, id.toString())}
              size="xl"
              loading={addToCartLoading}
            />
          </VStack>
        </VStack>
      )}
    </ThemedView>
  )
}

export default ProductScreen
