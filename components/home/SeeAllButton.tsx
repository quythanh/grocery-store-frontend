import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const SeeAllButton = () => {
  return (
    <View style={styles.seeAllContainer}>
      <TouchableOpacity style={styles.seeAllButton}>
        <Text style={styles.seeAllText}>See All</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SeeAllButton

const styles = StyleSheet.create({
  seeAllContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  seeAllButton: {
    borderWidth: 1,
    borderColor: "#B0B0B0",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 100,
    alignContent: "center",
  },
  seeAllText: {
    color: "#000",
    fontSize: 18,
  },
})
