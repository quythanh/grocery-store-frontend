import { useQuery } from "@apollo/client"
import { Feather } from "@expo/vector-icons"
import { Link } from "expo-router"
import { Fragment } from "react"
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"

import Image from "../Image"
import LoadingModal from "../LoadingModal"
import { GET_PRODUCT_LIST } from "@/api/graphqlString/home"
import type { ProductDTO } from "@/types/product"

const VerticalProductList = () => {
  const containerWidth = Dimensions.get("window").width
  const productWidth = (containerWidth - 60) / 2
  const { data, loading, error } = useQuery<ProductDTO>(GET_PRODUCT_LIST, {
    variables: {
      search: " ",
    },
  })

  if (error) {
    console.error(error)
    Toast.show({
      title: "Error",
      textBody: "Failed to fetch products.",
      type: ALERT_TYPE.DANGER,
    })
  }

  return (
    <Fragment>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.productContainer}>
          {data?.products.items.map((product) => (
            <Link
              key={product.uid}
              style={[styles.productItem, { width: productWidth }]}
              href={{
                pathname: "/product/[id]",
                params: {
                  id: product.sku,
                },
              }}
            >
              <View style={{ width: productWidth }}>
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
            </Link>
          ))}
        </View>
      </ScrollView>
      <LoadingModal visible={loading} />
    </Fragment>
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
    marginHorizontal: 10,
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
