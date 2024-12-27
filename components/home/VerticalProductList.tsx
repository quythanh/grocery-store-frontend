import React from "react"
import { Feather } from "@expo/vector-icons"
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"

interface ProductListProps {
  products: any[]
}

const VerticalProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.productContainer}>
        {products.map((product) => (
          <View key={product.id} style={styles.productItem}>
            <View style={{ alignItems: "center" }}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
            </View>
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

export default VerticalProductList

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "space-around",
    paddingBottom: 20,
  },
  productItem: {
    width: 170,
    height: 240,
    borderWidth: 1,
    borderColor: "#cae7a8",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  productImage: {
    borderWidth: 1,
    borderColor: "#cae7a8",
    width: 130,
    height: 130,
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
