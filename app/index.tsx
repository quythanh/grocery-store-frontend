import { useBearStore } from "@/store/counter"
import { Text, View } from "react-native"

import { Box } from "@/components/ui/box"
import { Button, ButtonText } from "@/components/ui/button"

export default function Index() {
  const { bears, increase } = useBearStore((store) => store)
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box className="p-0 mt-0 bg-white">
        <Text>{bears}</Text>
      </Box>
      <Box>
        <Button onPress={() => increase(1)}>
          <ButtonText>Increase</ButtonText>
        </Button>
      </Box>

      <Text className=" p-0 mt-0 bg-white">
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  )
}
