import React, { useEffect } from "react"
import { GET_PRODUCT_LIST } from "@/api/graphqlString/home"
import { useQuery } from "@apollo/client"
import { Feather } from "@expo/vector-icons"
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"

import Image from "../Image"
import LoadingModal from "../LoadingModal"
import { Product } from "./HorizontalProductList"

const VerticalProductList = () => {
  const containerWidth = Dimensions.get("window").width
  const productWidth = (containerWidth - 50) / 2
  const [productList, setProductList] = React.useState<Product[]>([])
  const { data, loading, error } = useQuery(GET_PRODUCT_LIST, {
    variables: {
      search: " ",
    },
  })

  useEffect(() => {
    if (!loading && data) {
      setProductList(data.products.items)
    }
  }, [data, loading])

  useEffect(() => {
    if (error) {
      console.error(error)
      Toast.show({
        title: "Error",
        textBody: "Failed to fetch products.",
        type: ALERT_TYPE.DANGER,
      })
    }
  }, [error])

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.productContainer}>
          {productList.map((product) => (
            <View
              key={product.id}
              style={[styles.productItem, { width: productWidth }]}
            >
              <View style={{ alignItems: "center" }}>
                <Image src={product.image.url} style={styles.productImage} />
              </View>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.productDetails}>
                <Feather name="dollar-sign" size={15} color="#000" />
                <Text style={styles.productDetailText}>
                  {product.price_range.minimum_price.final_price.value}
                </Text>
              </View>
              <View style={styles.productDetails}>
                <Feather name="shopping-bag" size={15} color="#000" />
                <Text style={styles.productDetailText}>1 Kg</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <LoadingModal visible={loading} />
    </>
  )
}

export default VerticalProductList

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  productItem: {
    borderWidth: 1,
    borderColor: "#cae7a8",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  productImage: {
    borderWidth: 1,
    borderColor: "#cae7a8",
    width: 120,
    height: 120,
    margin: 5,
    borderRadius: 60,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    textAlign: "center",
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
