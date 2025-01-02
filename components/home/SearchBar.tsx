import React from "react"
import { Feather } from "@expo/vector-icons"
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native"

const SearchBar = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.searchBox}>
        <Feather name="search" size={24} color="#B0B0B0" />
        <TextInput
          placeholder="Search fresh fruits and vegetables ..."
          placeholderTextColor="#B0B0B0"
          className="py-1"
          style={styles.searchInput}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    padding: 10,
    height: 50,
    borderRadius: 100,
    marginBottom: 20,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 17,
    color: "#5D5D5D",
  },
})
