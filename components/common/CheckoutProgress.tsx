import React from "react"
import { Check } from "lucide-react-native"
import { View } from "react-native"

import { Step, steps } from "@/app/checkout"

import { HStack } from "../ui/hstack"
import { Icon } from "../ui/icon"
import { Text } from "../ui/text"

type State = "completed" | "doing" | "pending"

const CheckoutProgress = ({ current }: { current: number }) => {
  return (
    <View className="relative">
      <View className="relative px-10">
        <View className="h-1 absolute w-full bg-mainGreen left-10 top-1/2 transform -translate-y-1/2"></View>
        <HStack className="justify-between z-10">
          {steps.map((item, index) => (
            <ProgressItem
              key={item.value}
              item={item}
              state={
                current === index
                  ? "doing"
                  : current > index
                    ? "completed"
                    : "pending"
              }
            />
          ))}
        </HStack>
      </View>
      <HStack className="justify-between w-full px-10">
        {steps.map((item) => (
          <Text key={item.value}>{item.label}</Text>
        ))}
      </HStack>
    </View>
  )
}

const ProgressItem = ({ item, state }: { item: Step; state: State }) => {
  return (
    <View
      className={`size-12 rounded-full border-2 border-mainGreen flex items-center justify-center relative ${state === "doing" ? "bg-mainGreen" : "bg-background-0"}`}
    >
      <Text className="text-mainGreen font-semibold text-lg">
        <Icon
          as={state === "completed" ? Check : item.icon}
          className={`${state === "doing" ? "text-typography-0" : "text-mainGreen"}`}
        />
      </Text>
    </View>
  )
}

export default CheckoutProgress
