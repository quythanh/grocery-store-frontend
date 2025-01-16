import React, { ReactNode } from "react"
import { Platform } from "react-native"

import { Heading } from "../ui/heading"
import { HStack } from "../ui/hstack"
import BackButton from "./BackButton"

const TopHeader = ({ children }: { children: ReactNode }) => {
  return (
    <HStack
      className={`bg-mainGreen px-6 py-3 gap-3 items-center ${Platform.OS === "ios" ? "pt-16" : "pt-12"}`}
    >
      <BackButton />
      <Heading className="text-typography-0">{children}</Heading>
    </HStack>
  )
}

export default TopHeader
