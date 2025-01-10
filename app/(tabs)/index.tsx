import React, { useRef } from "react"
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native"

import CategoryList from "@/components/home/CategoryList"
import Header from "@/components/home/Header"
import HorizontalProductList from "@/components/home/HorizontalProductList"
import OfferSection from "@/components/home/OfferSection"
import SearchBar from "@/components/home/SearchBar"
import SeeAllButton from "@/components/home/SeeAllButton"
import VerticalProductList from "@/components/home/VerticalProductList"
import { products } from "@/components/ProductData"

const HomeScreen = () => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#74a671"
      />

      <Header headerValue={scrollOffsetY}>
        <Text style={[styles.headerText, styles.headerTitle]}>Welcome</Text>
        <Text style={[styles.headerText, styles.headerDescription]}>
          Find and order your fresh fruits and vegetables
        </Text>
      </Header>

      <View style={styles.body}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
        >
          <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
            <SearchBar />

            <CategoryList />

            <HorizontalProductList />

            <SeeAllButton />

            <OfferSection products={products} />

            <View
              style={{
                height: 2,
                backgroundColor: "#f2f2f2",
                marginVertical: 5,
              }}
            />
          </View>

          <VerticalProductList />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#74a671",
  },

  body: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 0,
  },
  bodyText: {
    fontSize: 16,
    marginVertical: 10,
  },

  headerText: {
    color: "white",
    flexWrap: "wrap",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "600",
  },
  headerDescription: {
    fontSize: 18,
    marginTop: 8,
  },
})
