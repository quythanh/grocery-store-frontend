import React, { ReactNode, useState } from "react"
import {
  Banknote,
  CreditCard,
  Landmark,
  LucideIcon,
  Truck,
} from "lucide-react-native"
import { Pressable, View } from "react-native"

import { Grid, GridItem } from "@/components/ui/grid"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Image } from "@/components/ui/image"
import { Input, InputField } from "@/components/ui/input"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"

type PaymentMethod = {
  label: string
  icon: ReactNode
  value: string
}
type DeliveryMethod = {
  label: string
  icon: LucideIcon
  value: "standard" | "express"
  time: string
  cost: number
}
const paymentMethods: PaymentMethod[] = [
  {
    label: "Credit/Debit Card",
    icon: <Icon as={CreditCard} size="xl" />,
    value: "card",
  },
  {
    label: "PayPal",
    icon: (
      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_1280.png",
        }}
        size="xs"
        alt="paypal"
      />
    ),
    value: "payPal",
  },
  {
    label: "Cash on Delivery",
    icon: <Icon as={Banknote} size="xl" />,
    value: "cod",
  },
  {
    label: "Bank Transfer",
    icon: <Icon as={Landmark} size="xl" />,
    value: "bank",
  },
]
const shippingMethods: DeliveryMethod[] = [
  {
    icon: Truck,
    label: "Standard",
    value: "standard",
    time: "Jan 10th",
    cost: 10.5,
  },
  {
    icon: Truck,
    label: "Express",
    value: "express",
    time: "Jan 5th",
    cost: 12,
  },
]

const Payment = () => {
  const [method, setMethod] = useState<"standard" | "express">("standard")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    paymentMethods[0]
  )
  return (
    <View className="w-full">
      <Heading size="md" className="mt-2 text-typography-600">
        Shipping method
      </Heading>
      <HStack className="justify-between  gap-4 mt-2 items-center">
        {shippingMethods.map((med) => (
          <Pressable
            key={med.value}
            onPress={() => setMethod(med.value)}
            className="block flex-1"
          >
            <HStack
              className={`  items-center gap-4 p-2 rounded-lg bg-background-0 ${method === med.value ? "border border-mainGreen" : ""}`}
            >
              <Icon className="text-mainGreen" size="xl" as={med.icon} />
              <View className="flex-1 ">
                <Text className="font-semibold">{med.label}</Text>
                <Text>
                  <Text className="font-medium">${med.cost}</Text> -{" "}
                  <Text>{med.time}</Text>
                </Text>
              </View>
            </HStack>
          </Pressable>
        ))}
      </HStack>

      <Heading size="md" className="mt-6 text-typography-600">
        Shipping method
      </Heading>

      <Grid
        className="gap-4 mt-2"
        _extra={{
          className: "grid-cols-2",
        }}
      >
        {paymentMethods.map((method) => (
          <GridItem
            key={method.value}
            className={`bg-background-0 rounded-md  ${paymentMethod?.value == method.value ? "border border-mainGreen" : ""}`}
            _extra={{
              className: "col-span-1",
            }}
          >
            <Pressable onPress={() => setPaymentMethod(method)}>
              <HStack className="gap-2 items-center h-16 px-4">
                {method.icon}
                <Text>{method.label}</Text>
              </HStack>
            </Pressable>
          </GridItem>
        ))}
      </Grid>

      <VStack className="mt-6 gap-4">
        <View>
          <Text>Card number</Text>
          <Input className=" bg-background-0 rounded-xl mt-1 !border-mainGreen ">
            <InputField className="bg-background-0 py-1" />
          </Input>
        </View>

        <HStack className="gap-4">
          <View className="flex-1">
            <Text>Experation Date</Text>
            <Input className=" bg-background-0 rounded-xl mt-1 !border-mainGreen ">
              <InputField className="bg-background-0 py-1" />
            </Input>
          </View>
          <View className="flex-1">
            <Text>CVV</Text>
            <Input className=" bg-background-0 rounded-xl mt-1 !border-mainGreen ">
              <InputField className="bg-background-0 py-1" />
            </Input>
          </View>
        </HStack>
      </VStack>
    </View>
  )
}

export default Payment
