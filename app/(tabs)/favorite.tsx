import { useState } from "react"
import {
  GET_FAVOURITE_PRODUCTS,
  REMOVE_ITEM_FROM_WISHLIST,
} from "@/api/graphqlString/favourite"
import { useTokenStore } from "@/store/tokenStore"
import { useMutation, useQuery } from "@apollo/client"
import { useRouter } from "expo-router"
import { Platform, ScrollView, View } from "react-native"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"

import { Box } from "@/components/ui/box"
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button"
import { Grid, GridItem } from "@/components/ui/grid"
import { Heading } from "@/components/ui/heading"
import { Image } from "@/components/ui/image"
import Pagination from "@/components/common/Pagination"
import RemoveFavouriteDialog from "@/components/common/RemoveFavouriteDialog"
import TopHeader from "@/components/common/TopHeader"
import ProductFavouriteCard from "@/components/product/ProductFavouriteCard"

import emptyBackground from "../../assets/images/empty-favourite.png"

const FavoriteScreen = () => {
  const { token } = useTokenStore()
  const router = useRouter()
  const [removedItem, setRemovedItem] = useState("")
  const [showAlertDialog, setShowAlertDialog] = useState(false)

  const { data, loading, error, refetch } = useQuery(GET_FAVOURITE_PRODUCTS, {
    skip: !token,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    fetchPolicy: "no-cache",
    pollInterval: 5000
  })

  const [removeProductsFromWishlist] = useMutation(REMOVE_ITEM_FROM_WISHLIST, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    fetchPolicy: "no-cache",
  })

  const handleFavourite = () => {
    removeProductsFromWishlist({
      variables: {
        wishlistId: data.customer.wishlist.id,
        wishlistItemsIds: [removedItem],
      },
    })
    refetch()
  }

  const items: any[] = data?.customer.wishlist.items || []

  if (error) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      textBody: error.message,
      title: error.name,
    })
  }

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
    <View className={`flex-1 bg-background-0`}>
      <TopHeader>Favourite</TopHeader>

      {items.length === 0 ? (
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
            {items.map(({ id, product }) => (
              <GridItem
                key={id}
                _extra={{
                  className: "col-span-6 ",
                }}
              >
                <ProductFavouriteCard
                  product={{
                    id: product.sku,
                    image: product.image.url,
                    name: product.name,
                    price:
                      product.price_range.minimum_price.regular_price.value,
                    qty: 1,
                  }}
                  onPress={() => {
                    setRemovedItem(id)
                    setShowAlertDialog(true)
                  }}
                />
              </GridItem>
            ))}
          </Grid>
          <Pagination first={1} last={1} current={1} onChange={() => {}} />
          <Box className={Platform.OS === "ios" ? "h-28" : "h-4"}></Box>
        </ScrollView>
      )}

      <RemoveFavouriteDialog
        show={showAlertDialog}
        handleRemove={handleFavourite}
        handleClose={setShowAlertDialog.bind(this, false)}
      />
    </View>
  )
}

export default FavoriteScreen
