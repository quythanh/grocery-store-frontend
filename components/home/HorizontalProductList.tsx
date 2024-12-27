import React from "react";
import { Feather } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";





interface ProductListProps {
  products: any[]
}
const HorizontalProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.productContainer}>
        {products.map((product) => (
          <View key={product.id} style={styles.productItem}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.productDetails}>
              <Feather name="dollar-sign" size={15} color="#000" />
              <Text style={styles.productDetailText}>{product.price}</Text>
            </View>
            <View style={styles.productDetails}>
              <Feather name="shopping-bag" size={15} color="#000" />
              <Text style={styles.productDetailText}>{product.weight}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default HorizontalProductList

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  productItem: {
    width: 150,
    height: 230,
    backgroundColor: "#cae7a8",
    borderRadius: 20,
    marginRight: 20,
    padding: 10,
  },
  productImage: {
    width: 120,
    height: 120,
    margin: 5,
    borderRadius: 65,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  productDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  productDetailText: {
    marginLeft: 5,
  },
})