import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "expo-router"
import { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native"
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import { GET_CUSTOMER_CART, REMOVE_ITEM_FROM_CART, UPDATE_CART_ITEM } from "@/api/graphqlString/cart";
import { Button, ButtonText } from "@/components/ui/button"
import CartItem from "@/components/CartItem"
import LoadingModal from "@/components/LoadingModal";
import ParallaxScrollView from "@/components/ParallaxScrollView"
import RequireLogin from "@/components/RequireLogin";
import { ThemedText } from "@/components/ThemedText"
import { useTokenStore } from "@/store/tokenStore"
import type { Cart } from "@/types/cart";
import { ThemedView } from "@/components/ThemedView";

const showError = (e: ApolloError | undefined) => {
  if (e === undefined) return
  console.error(`${e.cause?.name}\n${e.cause?.message}`);
}

const CartScreen = () => {
  const route = useRouter()
  const { token } = useTokenStore()

  const { data, error: getError, loading: getLoading } = useQuery<{ customerCart: Cart }>(GET_CUSTOMER_CART, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    fetchPolicy: "no-cache",
    pollInterval: 5000
  })

  const [updateCartItem, { error: updateError, loading: updateLoading }] = useMutation(UPDATE_CART_ITEM, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      }
    },
    refetchQueries: ["GetCustomerCart"],
  })

  const [removeCartItem, { error: removeError, loading: removeLoading }] = useMutation(REMOVE_ITEM_FROM_CART, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      }
    },
    refetchQueries: ["GetCustomerCart"],
  })

  const error = getError || updateError || removeError
  const loading = getLoading || updateLoading || removeLoading

  return (
    <Fragment>
      <ParallaxScrollView
        header={
          <View style={styles.headerContainer}>
            <ThemedText style={styles.headerText}>Shopping Cart</ThemedText>
            <ThemedText style={styles.headerSubText}>
              A total of {data?.customerCart.items.length || 0} pieces
            </ThemedText>
          </View>
        }
        headerBackgroundColor={{ light: "#64A86B", dark: "#1D3D47" }}
      >
        <View style={styles.wrapper}>
          <GestureHandlerRootView style={styles.listItems}>
            {data?.customerCart.items.map((item) => (
              <Swipeable
                key={item.uid}
                renderRightActions={() => (
                  <View style={styles.actionsContainer}>
                    <RectButton
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => {
                        removeCartItem({
                          variables: {
                            cartId: data.customerCart.id,
                            cartItemUid: item.uid,
                          }
                        })
                      }}
                    >
                      <Text style={styles.actionText}>Remove</Text>
                    </RectButton>
                  </View>
                )}
              >
                <CartItem
                  name={item.product.name}
                  imgUrl={item.product.image.url}
                  price={item.prices.price.value}
                  unit={item.configurable_options ? item.configurable_options[0]?.value_label : "1 Kg"}
                  quantity={item.quantity}
                  quantityAdjustFn={(number) => {
                    updateCartItem({
                      variables: {
                        cartId: data.customerCart.id,
                        cartItemUid: item.uid,
                        quantity: number
                      }
                    })
                  }}
                />
              </Swipeable>
            ))}
          </GestureHandlerRootView>
  
          {
            (data?.customerCart.items)
              ? (
                <Fragment>
                  <View style={styles.totalWrapper}>
                    <Text style={styles.totalText}>Total:</Text>
                    <Text style={styles.totalValue}>
                      ${data?.customerCart.prices.subtotal_excluding_tax.value}
                    </Text>
                  </View>
  
                  <Button
                    size="xl"
                    style={styles.continueWrapper}
                    onPress={() => route.push("/checkout")}
                  >
                    <ButtonText style={styles.continueText}>
                      Continue
                    </ButtonText>
                  </Button>
                </Fragment>
              )
              : (() => (
                <ThemedView>
                  <ThemedText className="w-full text-center font-bold">Cart is Empty.</ThemedText>
                  <Button
                    size="lg"
                    style={styles.continueWrapper}
                    onPress={() => route.push("/")}
                  >
                    <ButtonText style={styles.continueText}>
                      Shopping now
                    </ButtonText>
                  </Button>
                </ThemedView>
              ))()
          } 
        </View>
      </ParallaxScrollView>
      <LoadingModal visible={loading} />
    </Fragment>
  )
}

export default RequireLogin(CartScreen)

const styles = StyleSheet.create({
  headerContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    gap: 8,
    paddingHorizontal: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 500,
    width: "100%",
    color: "#FFFFFF",
  },
  headerSubText: {
    fontSize: 16,
    color: "#FFFFFF",
    width: "100%",
    textAlign: "right",
  },
  wrapper: {
    display: "flex",
  },
  listItems: {
    display: "flex",
    gap: 16,
    overflowY: "scroll",
  },
  totalWrapper: {
    backgroundColor: "#E9F6E3",
    borderRadius: 999,
    padding: 16,
    marginTop: 24,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  totalText: {
    fontWeight: 700,
    fontSize: 18,
  },
  totalValue: {
    color: "#34923D",
    fontWeight: 700,
    fontSize: 18,
  },
  continueWrapper: {
    backgroundColor: "#44994D",
    borderRadius: 999,
    marginTop: 24,
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  actionsContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    marginLeft: 5
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 18,
  },
  actionText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
})
