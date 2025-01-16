import { useCategoryFilterStore } from "@/store/categoryFilter"
import {
  ArrowDownFromLine,
  ArrowDownUp,
  ArrowUpFromLine,
} from "lucide-react-native"
import { Pressable } from "react-native"

import { Button, ButtonIcon } from "../ui/button"
import { HStack } from "../ui/hstack"
import { Icon } from "../ui/icon"
import {
  Popover,
  PopoverBackdrop,
  PopoverBody,
  PopoverContent,
} from "../ui/popover"
import { Text } from "../ui/text"
import { VStack } from "../ui/vstack"

const SortPopover = () => {
  const { setSortType, sortType, apply } = useCategoryFilterStore()

  return (
    <Popover
      placement="bottom right"
      size="md"
      trigger={(triggerProps) => (
        <Button
          size="lg"
          variant="outline"
          className="bg-background-0 rounded-lg border-mainGreen active:!bg-background-200"
          {...triggerProps}
        >
          <ButtonIcon className="text-typography-500" as={ArrowDownUp} />
        </Button>
      )}
    >
      <PopoverBackdrop />
      <PopoverContent className="p-3 mt-1">
        <PopoverBody>
          <VStack className="gap-1">
            <Pressable
              onPress={() => {
                setSortType("asc")
              }}
            >
              <HStack
                className={`items-center justify-between gap-2 px-4 py-2 rounded-sm ${sortType === "asc" ? "bg-gray-100" : ""}`}
              >
                <Icon as={ArrowUpFromLine} />
                <Text>Price</Text>
              </HStack>
            </Pressable>
            <Pressable
              onPress={() => {
                setSortType("desc")
              }}
            >
              <HStack
                className={`items-center justify-between gap-2 px-4 py-2 rounded-sm ${sortType === "desc" ? "bg-gray-100" : ""}`}
              >
                <Icon as={ArrowDownFromLine} />
                <Text>Price</Text>
              </HStack>
            </Pressable>

            <HStack className="items-center justify-between gap-2 px-4 py-2 rounded-sm">
              <Icon as={ArrowUpFromLine} />
              <Text>Newest</Text>
            </HStack>
            <HStack className="items-center justify-between gap-2 px-4 py-2 rounded-sm">
              <Icon as={ArrowUpFromLine} />
              <Text>Popularity</Text>
            </HStack>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default SortPopover
