import React from "react"

import { Button, ButtonText } from "../ui/button"
import { Text } from "../ui/text"

const ProductTotal = ({ total }: { total: number }) => {
  return (
    <Button className="rounded-full bg-lightGreen mt-8" disabled>
      <ButtonText className="text-typo-700">Total: </ButtonText>
      <Text className="text-green-700 font-bold">${total.toFixed(2)}</Text>
    </Button>
  )
}

export default ProductTotal
