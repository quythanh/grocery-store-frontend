import { useEffect, useState } from "react"
import { allBrands, useCategoryFilterStore } from "@/store/categoryFilter"
import {
  CheckIcon,
  ChevronDownIcon,
  RotateCcw,
} from "lucide-react-native"
import { View } from "react-native"

import Stars from "../common/Stars"
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
    setStar,
    toggleBrand,
    priceFrom,
    priceTo,
    setPriceFrom,
    isApplied,
    setPriceTo,
    apply,
    resetFilter,
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
                <Select onValueChange={(value) => setPriceFrom(+value)}>
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput
                      className="py-2"
                      value={priceFrom.toString()}
                      placeholder="Select option"
                    />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {[0, 2, 4, 6, 8, 10].map((i) => (
                        <SelectItem
                          label={i.toString()}
                          value={i.toString()}
                          key={i}
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>

                <Text>to</Text>

                <Select onValueChange={(value) => setPriceTo(+value)}>
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput
                      className="py-2"
                      placeholder="Select option"
                      value={priceTo.toString()}
                    />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {[0, 2, 4, 6, 8, 10].map((i) => (
                        <SelectItem
                          label={i.toString()}
                          value={i.toString()}
                          key={i}
                        />
                      ))}
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
                <Stars count={star} onPress={(index) => setStar(index + 1)} />
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
            variant="outline"
            action="secondary"
            onPress={() => {
              resetFilter()
            }}
          >
            <ButtonIcon as={RotateCcw} />
          </Button>
          <Button
            onPress={() => {
              apply()
              close()
            }}
            className="bg-mainGreen hover:bg-green-700"
          >
            <ButtonText>{isApplied ? "Remove filter" : "Apply"}</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FilterModal
