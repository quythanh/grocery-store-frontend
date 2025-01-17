import React from "react"

import CustomImage from "../Image"
import { Box } from "../ui/box"
import { Image } from "../ui/image"
import { Skeleton } from "../ui/skeleton"
import { Product } from "./ProductCard"

const ProductImage = ({ product }: { product: Product }) => {
  return (
    <Box className="shadow-lg rounded-full -mt-16 p-2 bg-background-0">
      <CustomImage
        src={product.image}
        className="rounded-full size-[150px]"
        alt="product image"
      />
    </Box>
  )
}

export default ProductImage
