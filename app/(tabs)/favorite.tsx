import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

const FavoriteScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Favorite</ThemedText>
      <ThemedText style={styles.text}>You can favorite items here</ThemedText>
    </ThemedView>
  );
}

export default FavoriteScreen;

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
});
