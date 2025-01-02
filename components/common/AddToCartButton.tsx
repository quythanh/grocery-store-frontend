import React from "react"

import { Button, ButtonText } from "../ui/button"

const AddToCartButton = ({
  text,
  onPress,
}: {
  text?: string
  onPress?: () => void
}) => {
  return (
    <Button
      size="xl"
      className="mb-2 rounded-full bg-mainGreen"
      onPress={onPress}
    >
      <ButtonText>{text || "Add to Cart"}</ButtonText>
    </Button>
  )
}

export default AddToCartButton
