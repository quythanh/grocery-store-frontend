import React, { ReactNode, useState } from "react"
import { allBrands, useCategoryFilterStore } from "@/store/categoryFilter"
import { CheckIcon, ChevronDownIcon, StarIcon } from "lucide-react-native"
import { Pressable, View } from "react-native"

import { Box } from "../ui/box"
import { Button, ButtonIcon, ButtonText } from "../ui/button"
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "../ui/checkbox"
import { Heading } from "../ui/heading"
import { HStack } from "../ui/hstack"
import { CloseIcon, Icon } from "../ui/icon"
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../ui/modal"
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../ui/select"
import { Text } from "../ui/text"
import { VStack } from "../ui/vstack"

const FilterModal = () => {
  const {
    isOpen,
    close,
    star,
    brands,
    priceFrom,
    priceTo,
    available,
    setPriceFrom,
    setPriceTo,
    setStar,
    toggleAvailabel,
    toggleBrand,
  } = useCategoryFilterStore((state) => state)

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        close()
      }}
      size="lg"
    >
      <ModalBackdrop />
      <ModalContent className="rounded-lg">
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            Filter
          </Heading>
          <ModalCloseButton>
            <Icon
              as={CloseIcon}
              size="md"
              className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
            />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <VStack className="gap-4">
            <View>
              <Checkbox value={""}>
                <CheckboxLabel size="lg" className="font-semibold">
                  Available
                </CheckboxLabel>
                <CheckboxIndicator>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
              </Checkbox>
            </View>
            <View>
              <Heading size="sm">Price range</Heading>
              <HStack className="justify-between items-center mt-2">
                <Select>
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput className="py-2" placeholder="Select option" />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="5" value="5" />
                      <SelectItem label="10" value="10" />
                      <SelectItem label="15" value="15 " />
                      <SelectItem label="20" value="20" />
                      <SelectItem label="25" value="25" />
                    </SelectContent>
                  </SelectPortal>
                </Select>

                <Text>to</Text>

                <Select>
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput className="py-2" placeholder="Select option" />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="5" value="5" />
                      <SelectItem label="10" value="10" />
                      <SelectItem label="15" value="15 " />
                      <SelectItem label="20" value="20" />
                      <SelectItem label="25" value="25" />
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </HStack>
            </View>
            <View>
              <Heading size="sm">Brand</Heading>
              <HStack className="flex-wrap gap-2 mt-2">
                {allBrands.map((item, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    onPress={() => toggleBrand(item)}
                    className={`px-3 py-1 border rounded-md border-mainGreen  ${brands.includes(item) ? "bg-mainGreen border-mainGreen " : ""}`}
                  >
                    <Text
                      className={
                        brands.includes(item) ? "text-typography-0" : ""
                      }
                    >
                      {item}
                    </Text>
                  </Button>
                ))}
              </HStack>
            </View>
            <View>
              <Heading size="sm">Rating from</Heading>
              <HStack className="justify-around mt-3 px-10">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Button
                      size="xl"
                      key={i}
                      variant="link"
                      onPress={() => setStar(i + 1)}
                    >
                      <ButtonIcon
                        as={StarIcon}
                        className={
                          i + 1 <= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }
                      />
                      <Icon></Icon>
                    </Button>
                  ))}
              </HStack>
            </View>
          </VStack>
        </ModalBody>
        <ModalFooter className="mt-10">
          <Button
            variant="outline"
            action="secondary"
            onPress={() => {
              close()
            }}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            onPress={() => {
              close()
            }}
            className="bg-mainGreen hover:bg-green-700"
          >
            <ButtonText>Apply</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FilterModal
