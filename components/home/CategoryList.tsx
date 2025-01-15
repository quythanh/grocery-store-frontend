import React, { useEffect, useRef, useState } from "react"
import { GET_CATEGORY_LIST } from "@/api/graphqlString/home"
import { useCategoryStore } from "@/store/home/categoryStore"
import { useQuery } from "@apollo/client"
import {
  Animated,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { ALERT_TYPE, Dialog } from "react-native-alert-notification"

import LoadingModal from "../LoadingModal"

const CategoryList = () => {
  const categorySliderPosition = useRef(new Animated.Value(0)).current
  const categoryItemWidths = useRef<number[]>([])
  const categoryItemRefs = useRef<(View | null)[]>([])
  const [isFirstRender, setIsFirstRender] = useState(true)

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const {
    categoryList,
    setCategoryList,
    setSelectedCategoryId: setStoredSelectedCategory,
  } = useCategoryStore()

  const { data, loading, error } = useQuery(GET_CATEGORY_LIST)

  useEffect(() => {
    if (!loading && data) {
      setCategoryList(data.categoryList[0]?.children || [])
    }

    if (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Failed to fetch categories.",
        button: "Okay",
      })
      return
    }
  }, [data, loading, setCategoryList])

  useEffect(() => {
    if (categoryList.length > 0) {
      categoryItemRefs.current = Array(categoryList.length).fill(null)
      categoryItemWidths.current = Array(categoryList.length).fill(0)
      setSelectedCategory(0)
      setStoredSelectedCategory(categoryList[0].id)
    }
  }, [categoryList])

  useEffect(() => {
    if (categoryList.length > 0 && !isFirstRender) {
      measureCategoryItems()
      handleCategorySelect(selectedCategory ?? 0)
    }
    if (isFirstRender && categoryList.length > 0) {
      setIsFirstRender(false)
    }
  }, [categoryList, isFirstRender, selectedCategory])

  const measureCategoryItems = () => {
    categoryItemRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.measure((_fx, _fy, width) => {
          categoryItemWidths.current[index] = width
        })
      }
    })
  }

  const handleCategorySelect = (index: number) => {
    if (!categoryList[index]) return
    setSelectedCategory(index)
    setStoredSelectedCategory(categoryList[index].id)

    let offset = 0
    for (let i = 0; i < index; i++) {
      offset += categoryItemWidths.current[i] || 0
    }

    const selectedItemWidth = categoryItemWidths.current[index] || 0
    const newPosition = offset + selectedItemWidth / 2 - 25 // Center the slider

    Animated.spring(categorySliderPosition, {
      toValue: newPosition,
      useNativeDriver: false,
    }).start()
  }

  const handleLayoutCategory = (index: number, event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    categoryItemWidths.current[index] = width
  }

  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.categoryContainer}>
          {categoryList.map((category, index) => {
            return (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryItem}
                onPress={() => handleCategorySelect(index)}
                ref={(ref) => (categoryItemRefs.current[index] = ref)}
                onLayout={(event) => handleLayoutCategory(index, event)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === index && styles.selectedCategoryText,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            )
          })}
          <Animated.View
            style={[
              styles.categorySlider,
              { transform: [{ translateX: categorySliderPosition }] },
            ]}
          />
        </View>
      </ScrollView>
      <LoadingModal visible={loading} />
    </>
  )
}

export default CategoryList

const styles = StyleSheet.create({
  categoryContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: 45,
    paddingBottom: 4,
    position: "relative",
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
    lineHeight: 22,
  },
  selectedCategoryText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#74a671",
  },
  categorySlider: {
    position: "absolute",
    bottom: 0,
    width: 50,
    height: 4,
    backgroundColor: "#74a671",
    borderRadius: 10,
    marginTop: 10,
  },
})
