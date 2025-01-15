import React from "react"

import { Button, ButtonSpinner, ButtonText } from "../ui/button"

const AddToCartButton = ({
  text,
  loading,
  size,
  onPress,
}: {
  text?: string
  size?: "sm" | "md" | "lg" | "xl" | "xs" | undefined
  loading?: boolean
  onPress?: () => void
}) => {
  return (
    <Button
      size={size}
      className="mb-2 rounded-full bg-mainGreen active:!bg-green-700"
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ButtonSpinner />
      ) : (
        <ButtonText>{text || "Add to Cart"}</ButtonText>
      )}
    </Button>
  )
}

export default AddToCartButton
