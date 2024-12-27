import React from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"

interface OfferSectionProps {
  products: any[]
}
const OfferSection: React.FC<OfferSectionProps> = ({ products }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.title}>Today's Offers</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((product) => (
          <View key={product.id} style={styles.offerContainer}>
            <Image
              source={{
                uri: product.image,
              }}
              style={styles.offerImage}
            />
            <Text style={styles.offerDetailText}>Banana Just $1.99</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default OfferSection

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  offerContainer: {
    marginTop: 10,
    width: 150,
    height: 200,
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
  },
  offerImage: {
    width: 130,
    height: 130,
    borderRadius: 35,
    borderWidth: 0.5,
    borderColor: "#B0B0B0",
  },
  offerDetailText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
  },
})
