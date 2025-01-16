import { Fragment, useLayoutEffect, useState } from "react"
import { GET_PRODUCTS_BY_CATEGORY } from "@/api/graphqlString/category"
import { useCategoryFilterStore } from "@/store/categoryFilter"
import { useQuery } from "@apollo/client"
import { LayoutGrid, Search } from "lucide-react-native"
import { Platform, ScrollView, View } from "react-native"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"

import useDebouce from "@/hooks/useDebounce"
import { Box } from "@/components/ui/box"
import { Button, ButtonIcon } from "@/components/ui/button"
import { Grid, GridItem } from "@/components/ui/grid"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import { Image } from "@/components/ui/image"
import { Input, InputField, InputIcon } from "@/components/ui/input"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import FilterModal from "@/components/category/FilterModal"
import SortPopover from "@/components/category/SortPopover"
import Pagination from "@/components/common/Pagination"
import ProductCard, { Product } from "@/components/product/ProductCard"

import emptyBackground from "../../assets/images/empty-product.png"

const CategoryScreen = () => {
  const { open, searchKey, setSearchKey, sortType, priceFrom, priceTo } =
    useCategoryFilterStore((state) => state)
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const { data, loading, error } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: {
      categoryId: 10,
      pageSize: 8,
      currentPage,
    },
    fetchPolicy: "no-cache",
  })

  if (error) {
    Toast.show({
      title: "Error",
      textBody: error.message,
      type: ALERT_TYPE.DANGER,
    })
  }

  const { items, page_info }: { items: any[]; page_info: any } = data?.category
    ?.products || { items: [], page_info: {} }

  const mappedProducts: Product[] = items?.map((item) => ({
    name: item.name,
    price: item.price_range.minimum_price.regular_price.value,
    id: item.uid,
    image: item.image.url,
    qty: 1,
  }))

  useLayoutEffect(() => {
    if (!data) return
    let filterProducts = [...mappedProducts]

    if (sortType)
      filterProducts.sort((p1, p2) => {
        return sortType === "asc" ? p1.price - p2.price : p2.price - p1.price
      })

    if (priceFrom != null && priceTo != null)
      filterProducts = filterProducts.filter(
        (p) => p.price >= priceFrom && p.price <= priceTo
      )

    setProducts(filterProducts)
  }, [data, sortType, priceFrom, priceTo])

  

  useDebouce(() => {
    setProducts(mappedProducts.filter((p) => p.name.includes(searchKey)))
  }, [searchKey])

  return (
    <Fragment>
      <VStack className="gap-6 pt-10 flex-1 bg-mainGreen">
        <View className="px-4">
          <Heading size="2xl" className="text-white mt-6">
            {data?.category?.name}
          </Heading>
          <Text size="sm" className="text-white">
            Find and order your fresh fruits and vegetables
          </Text>
        </View>

        <View className="flex-1 bg-background-100 rounded-tl-3xl rounded-tr-3xl">
          <HStack className="gap-2 items-center pt-6 pb-4 px-4">
            <Input
              variant="outline"
              size="lg"
              className="flex-1 pr-2 border border-mainGreen bg-white rounded-full"
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

          {products && products.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <Image alt="empty" source={emptyBackground} size="2xl" />
            </View>
          ) : (
            <ScrollView>
              <Grid
                className="gap-2 px-4 py-3"
                _extra={{
                  className: "col-span-12",
                }}
              >
                {loading && products.length === 0
                  ? Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <GridItem
                          key={i}
                          _extra={{
                            className: "col-span-6 ",
                          }}
                        >
                          <ProductCard />
                        </GridItem>
                      ))
                  : products?.map((product, i) => (
                      <GridItem
                        key={i}
                        _extra={{
                          className: "col-span-6",
                        }}
                      >
                        <ProductCard product={product} />
                      </GridItem>
                    ))}
              </Grid>
              <Pagination
                first={1}
                last={page_info?.total_pages || 1}
                current={currentPage}
                onChange={setCurrentPage}
              />
              <Box className={Platform.OS === "ios" ? "h-28" : "h-4"}></Box>
            </ScrollView>
          )}
        </View>
      </VStack>

      <FilterModal />
    </Fragment>
  )
}

export default CategoryScreen
