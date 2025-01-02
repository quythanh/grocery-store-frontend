import React from "react"
import { StarIcon } from "lucide-react-native"

import { Button, ButtonIcon } from "../ui/button"

const Stars = ({
  count,
  onPress,
}: {
  count?: number
  onPress?: (index: number) => void
}) => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Button
            size="xl"
            key={i}
            variant="link"
            onPress={onPress ? () => onPress(i) : null}
          >
            <ButtonIcon
              as={StarIcon}
              className={
                i + 1 <= (count || 5)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }
            />
          </Button>
        ))}
    </>
  )
}

export default Stars
