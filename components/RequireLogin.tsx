import React, { useEffect } from "react"
import { Colors } from "@/constants/Colors"
import { useCustomerInformationStore } from "@/store/customerInformationStore"
import { deleteSecureStore, getSecureStore } from "@/store/secureStore"
import { useTokenStore } from "@/store/tokenStore"
import { validateToken } from "@/utils/validateToken"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import type { Customer } from "@/types/customer"
import { useIdsStore } from "@/store/idsStore"

const RequireLogin = (WrappedComponent: React.ComponentType) => {
  const HOC = (props: any) => {
    const route = useRouter()
    const { token, setToken } = useTokenStore()
    const { setInformationState } = useCustomerInformationStore()
    const { setCartId, setWishlistId } = useIdsStore()

    useEffect(() => {
      if (token) return

      const getStoredToken = async () => {
        const storedToken = await getSecureStore("token")
        if (!storedToken) return

        const { isValid, ...data } = await validateToken(storedToken)
        if (!isValid) {
          deleteSecureStore("token")
          return
        }

        setToken(storedToken)
        setInformationState(data.customer as Customer)
      }
      const getIds = async () => {
        const cartId = await getSecureStore("cartId")
        const wishlistId = await getSecureStore("wishlistId")
        if (cartId) setCartId(cartId)
        if (wishlistId) setWishlistId(wishlistId)
      }

      getIds()
      getStoredToken()
    }, [])

    if (!token) {
      return (
        <>
          <StatusBar style="dark" />
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              You need to log in to access this page.
            </Text>
            <TouchableOpacity
              style={styles.btnNavigate}
              onPress={() => route.navigate("/auth/landing")}
            >
              <Text style={styles.btnNavigateText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </>
      )
    }

    return <WrappedComponent {...props} />
  }

  return HOC
}

export default RequireLogin

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 20,
    marginBottom: 20,
  },
  btnNavigate: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: Colors.lightGreen,
    borderRadius: 100,
  },
  btnNavigateText: {
    color: Colors.green,
    fontSize: 18,
    fontWeight: "500",
  },
})
