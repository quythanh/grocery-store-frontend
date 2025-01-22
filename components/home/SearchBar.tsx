import React, { useState } from "react"
import { SEARCH_PRODUCT } from "@/api/graphqlString/product"
import { useLazyQuery } from "@apollo/client"
import { Feather } from "@expo/vector-icons"
import { Link } from "expo-router"
import { XIcon } from "lucide-react-native"
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native"

import useDebouce from "@/hooks/useDebounce"

import CustomImage from "../Image"
import { Button, ButtonIcon } from "../ui/button"
import { HStack } from "../ui/hstack"
import { Text } from "../ui/text"

type ResultItem = {
  id: number
  image: {
    label: string
    url: string
  }
  name: string
  sku: string
}

const SearchBar = () => {
  const [keyword, setKeyword] = useState("")
  
  const [search, { data }] = useLazyQuery(SEARCH_PRODUCT, {
    variables: {
      key: keyword,
    },
  })

  useDebouce(async () => {
    await search()
  }, [keyword])

  const results: ResultItem[] = data?.products.items
  return (
    <View className="relative">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.searchBox}>
          <Feather name="search" size={24} color="#B0B0B0" />
          <TextInput
            placeholder="Search fresh fruits and vegetables ..."
            placeholderTextColor="#B0B0B0"
            className="py-1"
            value={keyword}
            onChangeText={setKeyword}
            style={styles.searchInput}
          />
          {keyword && (
            <Button variant="link" className="px-2" onPress={() => setKeyword("")}>
              <ButtonIcon as={XIcon} />
            </Button>
          )}
        </View>
      </TouchableWithoutFeedback>

      {results && keyword && (
        <View className="absolute top-16 left-0 right-0 border border-typography-200 bg-white rounded-3xl z-10  overflow-hidden">
          <ScrollView className="max-h-[240px]" nestedScrollEnabled>
            <View>
              {results?.length === 0 && (
                <Text className="px-8 py-4">No products matched</Text>
              )}
              {results.map((result) => (
                <Link
                  href={{
                    pathname: "/product/[id]",
                    params: {
                      id: result.sku,
                    },
                  }}
                  key={result.id}
                  className="px-8 py-4 active:!bg-mainGreen "
                >
                  <HStack className="gap-3 items-center">
                    <CustomImage
                      src={result.image.url}
                      className="h-10 w-10 rounded-md"
                    />
                    <Text className="text-lg font-medium flex-1">
                      {result.name}
                    </Text>
                  </HStack>
                </Link>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
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
