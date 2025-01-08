import React, { ReactNode, useState } from "react"
import {
  CreditCard,
  LucideIcon,
  PackageCheck,
  Truck,
} from "lucide-react-native"
import { View } from "react-native"

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
  return (
    <View className="pt-8 flex-1 pb-2">
      <HStack className="bg-mainGreen px-6 py-3 gap-3 items-center mb-6">
        <BackButton />
        <Heading className="text-typography-0">Checkout</Heading>
      </HStack>

      <CheckoutProgress current={currentStep} />

      <View className="flex-1 px-8 mt-4">{steps[currentStep].content}</View>

      <Button
        className="bg-mainGreen active:!bg-green-700 mx-8 rounded-full"
        size="lg"
        onPress={() => {
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
                    <ToastDescription>
                      Place order successfully!!
                    </ToastDescription>
                  </Toast>
                </View>
              ),
            })
          }, 3000)
        }}
      >
        {loading && <ButtonSpinner color={"#ccc"} />}
        <ButtonText>{currentStep == 2 ? "Place Order" : "Next"}</ButtonText>
      </Button>
    </View>
  )
}

export default Checkout
