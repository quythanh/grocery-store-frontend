import React from "react"
import { Box } from "../ui/box"
import { Image } from "../ui/image"
import { Product } from "../category/ProductCard"

const ProductImage = ({product}:{product:Product}) => {
  return (
    <Box className="shadow-lg rounded-full -mt-16 p-2 bg-background-0">
      <Image
        source={{
          uri: product.image,
        }}
        size="xl"
        className="rounded-full size-full"
        alt="product image"
      />
    </Box>
  )
}

export default ProductImage
