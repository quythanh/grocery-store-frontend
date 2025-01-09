import { Fragment, useEffect, useState } from "react"
import { useCategoryFilterStore } from "@/store/categoryFilter"
import { LayoutGrid, Search } from "lucide-react-native"
import { Platform, ScrollView, View } from "react-native"

import useDebouce from "@/hooks/useDebounce"
import { Box } from "@/components/ui/box"
import { Button, ButtonIcon } from "@/components/ui/button"
import { Grid, GridItem } from "@/components/ui/grid"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import { Input, InputField, InputIcon } from "@/components/ui/input"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import groceryProducts from "@/components/category/data"
import FilterModal from "@/components/category/FilterModal"
import SortPopover from "@/components/category/SortPopover"
import Pagination from "@/components/common/Pagination"
import ProductCard from "@/components/product/ProductCard"

const ProfileScreen = () => {
  const { open, searchKey, setSearchKey } = useCategoryFilterStore(
    (state) => state
  )

  const [data, setData] = useState(groceryProducts)
  useDebouce(() => {
    setData(groceryProducts.filter((p) => p.name.includes(searchKey)))
  }, [searchKey])

  return (
    <Fragment>
      <VStack className="gap-6 pt-10 flex-1 bg-mainGreen">
        <View className="px-4">
          <Heading size="2xl" className="text-white mt-6">
            Fruits
          </Heading>
          <Text size="sm" className="text-white">
            Fruits Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Aliquid, ad?
          </Text>
        </View>

        <View className="flex-1 bg-background-100  rounded-tl-3xl rounded-tr-3xl">
          <HStack className="gap-2 items-center py-10 pb-4 px-4">
            <Input
              variant="outline"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              size="lg"
              className="flex-1 pr-2 border border-white bg-white rounded-full"
            >
              <InputField
                placeholder="Search anything..."
                className="py-2 "
                value={searchKey}
                onChangeText={(value) => setSearchKey(value)}
              />
              <InputIcon as={Search} />
            </Input>

            <SortPopover />

            <Button
              variant="outline"
              size="lg"
              className="bg-background-0 rounded-lg border-mainGreen active:!bg-background-200"
              onPress={open}
            >
              <ButtonIcon className="text-typography-500" as={LayoutGrid} />
            </Button>
          </HStack>
          <ScrollView>
            <Grid
              className="gap-2 px-4"
              _extra={{
                className: "col-span-12",
              }}
            >
              {data.map((product, i) => (
                <GridItem
                  key={i}
                  _extra={{
                    className: "col-span-6 ",
                  }}
                >
                  <ProductCard product={product} />
                </GridItem>
              ))}
            </Grid>
            <Pagination first={1} last={4} current={3} onChange={() => {}} />
            <Box className={Platform.OS === "ios" ? "h-28" : "h-4"}></Box>
          </ScrollView>
        </View>
      </VStack>

      <FilterModal />
    </Fragment>
  )
}

export default ProfileScreen
