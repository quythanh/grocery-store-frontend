import CategoryList from "@/components/home/CategoryList"
import Header from "@/components/home/Header"
import HorizontalProductList from "@/components/home/HorizontalProductList"
import OfferSection from "@/components/home/OfferSection"
import SearchBar from "@/components/home/SearchBar"
import SeeAllButton from "@/components/home/SeeAllButton"
import VerticalProductList from "@/components/home/VerticalProductList"
import { products } from "@/components/ProductData"
import React, { useRef, useState } from "react"
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native"

const HomeScreen = () => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current
  const [selectedCategory, setSelectedCategory] = useState(0)

  const handleCategorySelect = (index: number) => {
    setSelectedCategory(index)
  }

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
          <SearchBar />
          
          <CategoryList onCategorySelect={handleCategorySelect} />

          <HorizontalProductList products={products} />

          <SeeAllButton />

          <OfferSection products={products} />

          <VerticalProductList products={products} />
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
    padding: 20,
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
