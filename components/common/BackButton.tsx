import React from "react"
import { Feather } from "@expo/vector-icons"

import { Button } from "../ui/button"
import { useNavigation } from "expo-router"

const BackButton = () => {
  const navigation = useNavigation()

  return (
    <Button variant="link" className="w-8 -ml-2" onPress={navigation.goBack}>
      <Feather size={26} name="chevron-left" color={"white"} />
    </Button>
  )
}

export default BackButton
