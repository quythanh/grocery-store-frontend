import React, { useEffect } from "react"
import { GET_PRODUCT_LIST_BY_CATEGORY_ID } from "@/api/graphqlString/home"
import { useCategoryStore } from "@/store/home/categoryStore"
import { useQuery } from "@apollo/client"
import { Feather } from "@expo/vector-icons"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"

import Image from "../Image"
import LoadingModal from "../LoadingModal"
import type { Product } from "@/types/product"
import { Link } from "expo-router"

const HorizontalProductList = () => {
  const { selectedCategoryId } = useCategoryStore()
  const [productList, setProductList] = React.useState<Product[]>([])
  const { data, loading, error } = useQuery(GET_PRODUCT_LIST_BY_CATEGORY_ID, {
    variables: {
      categoryId: selectedCategoryId,
      pageSize: 5,
    },
    skip: !selectedCategoryId,
  })

  useEffect(() => {
    if (!loading && data) {
      setProductList(data.products.items)
    }
  }, [data, loading, selectedCategoryId])

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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.productContainer}>
          {productList.map((product) => (
            <Link
              key={product.uid}
              style={styles.productItem}
              href={{
                pathname: "/product/[id]",
                params: {
                  id: product.sku,
                },
              }}
            >
              <View>
                <Image src={product.image.url} style={styles.productImage} />
                <View style={styles.nameContainer}>
                  <Text
                    style={styles.productName}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {product.name}
                  </Text>
                </View>
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
    </>
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
  nameContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    lineHeight: 20,
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
