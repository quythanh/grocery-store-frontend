import { Link } from "expo-router"
import { Bookmark, Weight } from "lucide-react-native"

import CustomImage from "../Image"
import { Box } from "../ui/box"
import { Button, ButtonIcon } from "../ui/button"
import { Card } from "../ui/card"
import { Heading } from "../ui/heading"
import { HStack } from "../ui/hstack"
import { Icon } from "../ui/icon"
import { Text } from "../ui/text"
import { VStack } from "../ui/vstack"
import { Product } from "./ProductCard"

const ProductFavouriteCard = ({
  product,
  onPress,
  className,
}: {
  className?: string
  product: Product
  onPress: () => void
}) => {
  if (!product)
    return <Box className="bg-gray-200 animate-pulse rounded-xl h-52"></Box>

  return (
    <Link
      href={{
        pathname: "/product/[id]",
        params: {
          id: product.id,
        },
      }}
    >
      <Card className={`p-3 rounded-xl w-full h-full ${className || ""}`}>
        <CustomImage
          src={product.image}
          className="mb-2 w-full h-36 rounded-md"
          alt="image"
        />
        <Heading size="md" className="h-14 line-clamp-2 overflow-ellipsis">
          {product.name}
        </Heading>
        <HStack className="items-end justify-between flex-1">
          <VStack>
            <Text className="flex-1 font-bold text-lg">${product.price}</Text>
            <HStack className=" items-center gap-1">
              <Icon as={Weight} size={"sm"} />
              <Text>{product.qty}gram</Text>
            </HStack>
          </VStack>

          {/* heart */}
          <Button variant="link" size="lg" onPress={onPress}>
            <ButtonIcon
              as={Bookmark}
              className="fill-yellow-500 text-yellow-500"
            />
          </Button>
        </HStack>
      </Card>
    </Link>
  )
}

export default ProductFavouriteCard
