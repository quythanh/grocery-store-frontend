import { P, S } from "@expo/html-elements"
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native"

interface HeaderProps {
  headerValue: Animated.Value
  children: React.ReactNode
}

const Header = ({ headerValue, children }: HeaderProps) => {
  const max_header_height = 150
  const min_header_height =
    Platform.OS === "ios" ? 0 : StatusBar.currentHeight || 0
  const scroll_distance = max_header_height - min_header_height

  const animatedHeaderHeight = headerValue.interpolate({
    inputRange: [0, scroll_distance],
    outputRange: [max_header_height, min_header_height],
    extrapolate: "clamp",
  })

  return (
    <Animated.View
      style={[
        {
          height: animatedHeaderHeight,
        },
      ]}
    >
      <View style={styles.header}>{children}</View>
    </Animated.View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight || 0,
    backgroundColor: "#74a671",
    height: 150,
    zIndex: 1,
  },
})
