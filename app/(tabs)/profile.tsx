import { Button, StyleSheet } from "react-native"

import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useRouter } from "expo-router"

const ProfileScreen = () => {
  const route = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Profile</ThemedText>
      <ThemedText style={styles.text}>
        You can view your profile here
      </ThemedText>
      <Button
        title="Go to Landing"
        onPress={() => route.navigate("/auth/landing")}
      />
    </ThemedView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
})
