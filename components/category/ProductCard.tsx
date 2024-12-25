import React from "react"
import { ArrowRightIcon, Plus, ShoppingCart, Weight } from "lucide-react-native"

import { Button, ButtonIcon } from "../ui/button"
import { Card } from "../ui/card"
import { Heading } from "../ui/heading"
import { HStack } from "../ui/hstack"
import { Icon } from "../ui/icon"
import { Image } from "../ui/image"
import { Link, LinkText } from "../ui/link"
import { Text } from "../ui/text"
import { VStack } from "../ui/vstack"

const ProductCard = ({ className }: { className?: string }) => {
  return (
    <Card className={`p-3 rounded-xl w-full ${className || ""}`}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        className="mb-2 w-full h-36 rounded-md"
        alt="image"
      />
      <Heading size="md" className="mb-2">
        The Power of Positive Thinking
      </Heading>
      <HStack className="items-end justify-between mt-2">
        <VStack>
          <Text className="flex-1 font-bold text-lg ">10.000đ</Text>
          <HStack className="flex-1 items-center gap-1">
            <Icon as={Weight} size={"sm"} /> <Text>10gram</Text>
          </HStack>
        </VStack>
        <Button size="sm" className="bg-mainGreen">
          <ButtonIcon as={Plus} />
          <ButtonIcon as={ShoppingCart} />
        </Button>
      </HStack>
    </Card>
  )
}

export default ProductCard
