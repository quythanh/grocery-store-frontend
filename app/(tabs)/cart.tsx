import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"

import { Button, ButtonText } from "@/components/ui/button"
import CartItem, { type CartItemProps } from "@/components/CartItem"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"

const mockItems: Omit<CartItemProps, "quantityAdjustFn">[] = [
  {
    name: "Potato",
    imgUrl:
      "https://images.squarespace-cdn.com/content/v1/5b5b5824f2e6b10639fdaf09/a277eae9-bf1a-4e66-9daf-dd2e60209073/Produce+Storage+Tips+icons+%289%29.png",
    price: 15,
    unit: "2 Kgs",
    quantity: 2,
  },
  {
    name: "Onion",
    imgUrl:
      "https://produits.bienmanger.com/36700-0w470h470_Organic_Red_Onion_From_Italy.jpg",
    price: 15,
    unit: "2 Kgs",
    quantity: 1,
  },
]

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(mockItems)

  const handleAdjustQuantity = (pos: number) => {
    return (quantity: number) => {
      const newCartItems = [...cartItems]

      newCartItems[pos].quantity = quantity

      if (quantity === 0) {
        newCartItems.splice(pos, 1)
      }

      setCartItems(newCartItems)
    }
  }

  return (
    <ParallaxScrollView
      headerImage={
        <View style={styles.headerContainer}>
          <ThemedText style={styles.headerText}>Shopping Cart</ThemedText>
          <ThemedText style={styles.headerSubText}>
            A total of {cartItems.length} pieces
          </ThemedText>
        </View>
      }
      headerBackgroundColor={{ light: "#64A86B", dark: "#1D3D47" }}
    >
      <View style={styles.wrapper}>
        <View style={styles.listItems}>
          {cartItems.map((item, i) => (
            <CartItem
              key={item.name}
              name={item.name}
              imgUrl={item.imgUrl}
              price={item.price}
              unit={item.unit}
              quantity={item.quantity}
              quantityAdjustFn={handleAdjustQuantity(i)}
            />
          ))}
        </View>

        <View style={styles.totalWrapper}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalValue}>
            $
            {cartItems
              .reduce((prev, curr) => prev + curr.quantity * curr.price, 0)
              .toFixed(2)}
          </Text>
        </View>

        <Button size="lg" style={styles.continueWrapper}>
          <ButtonText style={styles.continueText} className="text-white">
            Continue
          </ButtonText>
        </Button>
      </View>
    </ParallaxScrollView>
  )
}

export default CartScreen

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
    fontSize: 18,
  },
})
