import React, { ReactNode, useState } from "react"
import {
  CreditCard,
  LucideIcon,
  PackageCheck,
  Truck,
} from "lucide-react-native"
import { Platform, SafeAreaView, StatusBar, View } from "react-native"

import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast"
import BackButton from "@/components/common/BackButton"
import CheckoutProgress from "@/components/common/CheckoutProgress"

import Confirm from "./confirm"
import Payment from "./payment"
import Shipping from "./shipping"

export type Step = {
  icon: LucideIcon
  label: string
  value: string
  content: ReactNode
}

export const steps: Step[] = [
  {
    icon: Truck,
    label: "Shipping",
    value: "shipping",
    content: <Shipping />,
  },
  {
    icon: CreditCard,
    label: "Payment",
    value: "payment",
    content: <Payment />,
  },
  {
    icon: PackageCheck,
    label: "Confirm",
    value: "confirm",
    content: <Confirm />,
  },
]
const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handlePrev = () => {
    if (currentStep <= 0) {
      return
    }
    setCurrentStep(currentStep - 1)
  }

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1 > 2 ? 0 : currentStep + 1)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.show({
        placement: "top right",
        render: () => (
          <View className="px-6 pt-10">
            <Toast
              action="success"
              variant="outline"
              className="w-full px-10 border border-mainGreen"
            >
              <ToastTitle>Notification</ToastTitle>
              <ToastDescription>Place order successfully!!</ToastDescription>
            </Toast>
          </View>
        ),
      })
    }, 3000)
  }

  return (
    <View className={`flex-1 ${Platform.OS === "ios" ? "pb-8" : "pb-4"}`}>
      <HStack
        className={`bg-mainGreen px-6 py-3 gap-3 items-center mb-6 ${Platform.OS === "ios" ? "pt-16" : "pt-12"}`}
      >
        <BackButton />
        <Heading className="text-typography-0">Checkout</Heading>
      </HStack>

      <CheckoutProgress current={currentStep} />

      <View className="flex-1 px-8 mt-4">{steps[currentStep].content}</View>
      {currentStep ? (
        <Button
          variant="outline"
          className="border-mainGreen active:!border-green-700 mx-8 rounded-full bg-background-0"
          size="lg"
          onPress={handlePrev}
        >
          <ButtonText className="text-mainGreen active:!text-green-700 ">
            Previous
          </ButtonText>
        </Button>
      ) : null}
      <Button
        className="bg-mainGreen active:!bg-green-700 mx-8 rounded-full mt-2"
        size="lg"
        onPress={handleNext}
      >
        {loading && <ButtonSpinner color={"#ccc"} />}
        <ButtonText>{currentStep == 2 ? "Place Order" : "Next"}</ButtonText>
      </Button>
    </View>
  )
}

export default Checkout
