import { useState } from "react"
import { ADD_PRODUCT_TO_CART } from "@/api/graphqlString/cart"
import { useTokenStore } from "@/store/tokenStore"
import { useMutation } from "@apollo/client"
import { useRouter } from "expo-router"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"

export const useAddToCart = () => {
  const [quantityToCart, setQuantityToCart] = useState(1)
  const route = useRouter()
  const { token } = useTokenStore()
  const [addToCart, { data, error, loading }] = useMutation(ADD_PRODUCT_TO_CART)
  const adjustQuantity = (quantity: number) => {
    if (quantityToCart + quantity < 1) return
    setQuantityToCart(quantityToCart + quantity)
  }
  const handleAddToCart = async (
    cartId: string,
    productId: string,
    option?: string
  ) => {
    try {
      if (!token) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Notification",
          textBody: "Please login to add product to cart!!",
          onPress: () => route.push("/auth/login"),
        })
        return
      }

      await addToCart({
        variables: {
          cartId: cartId,
          sku: productId,
          quantity: quantityToCart,
          options: option ? [option] : [],
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
        textBody: "Added product to cart!!",
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

  return {
    quantityToCart,
    adjustQuantity,
    handleAddToCart,
    error,
    loading,
    data,
  }
}
