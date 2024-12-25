import { StyleSheet } from "react-native"

import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"

const CartScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Cart</ThemedText>
      <ThemedText style={styles.text}>You can view your cart here</ThemedText>
    </ThemedView>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
})
