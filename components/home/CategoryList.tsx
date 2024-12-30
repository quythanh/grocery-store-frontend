// CategoryList.tsx
import React, { useEffect, useRef, useState } from "react"
import {
  Animated,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"

interface CategoryListProps {
  onCategorySelect: (index: number) => void
}
const CategoryList: React.FC<CategoryListProps> = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const categorySliderPosition = useRef(new Animated.Value(0)).current
  const categoryItemWidths = useRef<number[]>([]).current
  const categoryItemRefs = useRef<(View | null)[]>([])

  const measureCategoryItems = () => {
    categoryItemRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.measure((_fx, _fy, width) => {
          categoryItemWidths[index] = width
        })
      }
    })
  }

  useEffect(() => {
    measureCategoryItems()
    handleCategorySelect(0)
  }, [])

  const handleCategorySelect = (index: number) => {
    setSelectedCategory(index)
    onCategorySelect(index)
    let offset = 0
    for (let i = 0; i < index; i++) {
      offset += categoryItemWidths[i] || 0
    }

    const selectedItemWidth = categoryItemWidths[index] || 0
    const newPosition = offset + selectedItemWidth / 2 - 25

    Animated.spring(categorySliderPosition, {
      toValue: newPosition,
      useNativeDriver: false,
    }).start()
  }

  const handleLayoutCategory = (index: number, event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    categoryItemWidths[index] = width
  }

  const categories = ["Fruits", "Vegetables", "Breads", "Orders"]
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.categoryContainer}>
        {categories.map((category, index) => {
          categoryItemRefs.current[index] = null
          return (
            <View
              key={index}
              style={styles.categoryItem}
              ref={(ref) => (categoryItemRefs.current[index] = ref)}
              onLayout={(event) => handleLayoutCategory(index, event)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === index && styles.selectedCategoryText,
                ]}
                onPress={() => handleCategorySelect(index)}
              >
                {category}
              </Text>
            </View>
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
  categoryText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  selectedCategoryText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
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
