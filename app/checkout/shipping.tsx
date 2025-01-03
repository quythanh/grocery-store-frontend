import React, { useState } from "react"
import { Pencil } from "lucide-react-native"
import { ScrollView, View } from "react-native"

import { Button, ButtonIcon, ButtonText } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import { Input, InputField } from "@/components/ui/input"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"

type Address = {
  name: string
  street: string
  city: string
  state: string
  zip: number
  country: string
}

const savedAddress: Address = {
  name: "Nguyen Van Canh",
  street: "Nguyen Kiem",
  city: "Ho Chi Minh",
  country: "Viet Nam",
  state: "Ho Chi Minh",
  zip: 700000,
}

const fields: {
  name: keyof Address
  type: "text" | "number"
  label: string
}[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
  },
  {
    name: "street",
    type: "text",
    label: "Street",
  },
  {
    name: "city",
    type: "text",
    label: "City",
  },
  {
    name: "state",
    type: "text",
    label: "State",
  },
  {
    name: "country",
    type: "text",
    label: "Country",
  },
  {
    name: "zip",
    type: "number",
    label: "Zip code",
  },
]

const Shipping = () => {
  const [address, setAddress] = useState<Address>({
    name: "",
    city: "",
    country: "",
    state: "",
    street: "",
    zip: 0,
  })
  const handleChangeAddress = (name: keyof Address, value: any) => {
    setAddress({
      ...address,
      [name]: value,
    })
  }
  return (
    <View className="flex-1">
      <Heading size="md" className="text-typography-600">
        Saved address
      </Heading>
      <HStack className="border border-mainGreen p-4 rounded-xl mt-2 bg-background-0 gap-2">
        <VStack className="flex-1">
          <Heading size="sm">{savedAddress.name}</Heading>
          <Text className="text-typography-600">
            {savedAddress.zip} - {savedAddress.street}, {savedAddress.city},
            {savedAddress.state}, {savedAddress.country}
          </Text>
        </VStack>

        <Button variant="link">
          <ButtonIcon as={Pencil} size="sm" />
          <ButtonText>Edit</ButtonText>
        </Button>
      </HStack>

      <Heading size="md" className="mt-6 text-typography-600">
        New address
      </Heading>
      <ScrollView className="flex-1">
        <VStack className="gap-2 mt-2">
          {fields.map((field) => (
            <View key={field.name}>
              <Text>{field.label}</Text>
  
              <Input className=" bg-background-0 rounded-xl mt-1 !border-mainGreen ">
                <InputField
                  value={address[field.name].toString()}
                  onChangeText={(value) => handleChangeAddress(field.name, value)}
                  className="bg-background-0 py-1"
                />
              </Input>
            </View>
          ))}
        </VStack>
        <View className="h-10"></View>
      </ScrollView>
    </View>
  )
}

export default Shipping