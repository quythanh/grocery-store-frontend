import React from "react"

import { Input, InputField, InputIcon } from "../ui/input"
import { useCategoryFilterStore } from "@/store/categoryFilter"
import { Search } from "lucide-react-native"

const SearchInput = () => {
  const { searchKey,setSearchKey } =
    useCategoryFilterStore((state) => state)
  return (
    <Input
      variant="outline"
      size="lg"
      className="flex-1 pr-2 border border-mainGreen bg-white rounded-full"
    >
      <InputField
        placeholder="Search anything..."
        className="py-2 "
        value={searchKey}
        onChangeText={(value) => setSearchKey(value)}
      />
      <InputIcon as={Search} />
    </Input>
  )
}

export default SearchInput
